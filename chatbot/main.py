import streamlit as st
import mysql.connector
from mysql.connector import Error
import datetime


# --- CONFIGURAZIONE CONNESSIONE ---
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='barbershop_db',
            user='root',  # Inserisci il tuo utente
            password=''  # Inserisci la tua password
        )
        return connection
    except Error as e:
        st.error(f"Errore di connessione a MySQL: {e}")
        return None


# --- FUNZIONI PER RECUPERARE DATI ---

def get_services():
    conn = get_db_connection()
    services = {}
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, name, price FROM services")
        for row in cursor.fetchall():
            # Salviamo il prezzo e l'ID per usarli dopo
            services[row['name']] = {'id': row['id'], 'price': row['price']}
        conn.close()
    return services


def get_barbers():
    conn = get_db_connection()
    barbers = {}
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, name FROM barbers")
        for row in cursor.fetchall():
            barbers[row['name']] = row['id']
        conn.close()
    return barbers


def save_appointment(customer_name, barber_id, service_id, date_scelta, ora_scelta):
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()

            # 1. Uniamo data e ora per creare il formato DATETIME di MySQL
            # MySQL vuole: 'AAAA-MM-GG HH:MM:SS'
            start_time = datetime.datetime.combine(date_scelta, ora_scelta)

            # 2. Calcoliamo un'ora di fine stimata (es. +30 minuti o +1 ora)
            # Questo è necessario perché la tua colonna end_time non accetta NULL
            end_time = start_time + datetime.timedelta(minutes=60)

            # 3. Query con i nomi ESATTI delle tue colonne
            query = """INSERT INTO appointments 
                       (customer_name, start_time, end_time, barber_id, service_id) 
                       VALUES (%s, %s, %s, %s, %s)"""

            # Passiamo i dati nell'ordine corretto
            cursor.execute(query, (customer_name, start_time, end_time, barber_id, service_id))

            conn.commit()
            return True
        except Error as e:
            st.error(f"Errore SQL: {e}")
            return False
        finally:
            conn.close()
    return False



# --- INTERFACCIA CHATBOT STREAMLIT ---

def main():
    st.set_page_config(page_title="BarberShop Chatbot", page_icon="💈")
    st.title("💈 New Hair Style - Prenotazioni")

    # Carichiamo i dati dal DB
    servizi_db = get_services()
    barbieri_db = get_barbers()

    if not servizi_db or not barbieri_db:
        st.error("Impossibile caricare i dati dal database.")
        return

    # Inizio interazione
    nome_cliente = st.text_input("Ciao! Inserisci il tuo nome per iniziare:")

    if nome_cliente:
        st.write(f"### Ciao {nome_cliente}! Prenota il tuo stile.")

        col1, col2 = st.columns(2)

        with col1:
            servizio_scelto = st.selectbox("Quale servizio desideri?", list(servizi_db.keys()))
            prezzo = servizi_db[servizio_scelto]['price']
            st.metric(label="Prezzo", value=f"{prezzo} €")

        with col2:
            barbiere_scelto = st.selectbox("Scegli il tuo barbiere:", list(barbieri_db.keys()))

        st.divider()

        col3, col4 = st.columns(2)
        with col3:
            data = st.date_input("Scegli la data:", min_value=datetime.date.today())
        with col4:
            ora = st.time_input("Scegli l'orario:")

        if st.button("Conferma Prenotazione"):
            # Recuperiamo gli ID corretti dalle selezioni
            s_id = servizi_db[servizio_scelto]['id']
            b_id = barbieri_db[barbiere_scelto]

            successo = save_appointment(nome_cliente, b_id, s_id, data, ora)

            if successo:
                st.success(
                    f"Grazie {nome_cliente}! Appuntamento registrato con {barbiere_scelto} per il servizio {servizio_scelto}.")
                st.balloons()


if __name__ == "__main__":
    main()