from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
from mysql.connector import Error
import uvicorn
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    try:
        return mysql.connector.connect(
            host='localhost',
            database='barbershop_db',
            user='root',
            password=''
        )
    except Error:
        return None

class ChatMessage(BaseModel):
    message: str
    username: str | None = None

@app.post("/api/chat")
def chat_endpoint(data: ChatMessage):
    conn = get_db_connection()
    if not conn:
        return {"reply": "Errore di connessione al database.", "show_picker": False}
    
    cursor = conn.cursor(dictionary=True)
    msg = data.message.lower().strip()
    
    # Verifica utente registrato nel DB
    utente_registrato = False
    if data.username and data.username.strip():
        cursor.execute("SELECT * FROM users WHERE username = %s OR email = %s", (data.username.strip(), data.username.strip()))
        user_db = cursor.fetchone()
        if user_db:
            utente_registrato = True

    if utente_registrato:
        saluto_base = f"Bentornato/a {data.username}! Sono l'assistente virtuale di New Hair Style."
    else:
        saluto_base = "Buongiorno! Sono l'assistente virtuale di New Hair Style."

    show_picker = False
    reply = ""

    # Controllo se l'utente ha inserito una data/ora
    is_datetime = any(char.isdigit() for char in msg) and ("-" in msg or "/" in msg or ":" in msg)

    if is_datetime:
        giorno_settimana_italiano = None
        try:
            for fmt in ("%Y-%m-%d %H:%M", "%Y-%m-%d%H:%M", "%d-%m-%Y %H:%M"):
                try:
                    dt = datetime.strptime(data.message.strip(), fmt)
                    days_map = {
                        0: "LUNEDI", 1: "MARTEDI", 2: "MERCOLEDI", 
                        3: "GIOVEDI", 4: "VENERDI", 5: "SABATO", 6: "DOMENICA"
                    }
                    giorno_settimana_italiano = days_map[dt.weekday()]
                    break
                except ValueError:
                    continue
        except Exception:
            pass

        cursor.execute("""
            SELECT m.id, m.nome, s.ora_inizio, s.ora_fine 
            FROM schedules s 
            JOIN masters m ON s.master_id = m.id 
            WHERE s.giorno_settimana = %s
        """, (giorno_settimana_italiano,))
        turni_giorno = cursor.fetchall()

        if turni_giorno:
            nomi_master = ", ".join(set([t['nome'] for t in turni_giorno]))
            if utente_registrato:
                reply = f"Per la data {data.message}, il master in turno ed è libero è: **{nomi_master}**. Ora, quale servizio desideri prenotare? (Scegli dall'elenco o scrivilo qui sotto)."
            else:
                reply = f"Per la data {data.message}, il master in turno ed è libero è: **{nomi_master}**. Per procedere, ti chiedo di fornirci il tuo **Nome e un numero di telefono** (es. Mario Rossi 3331234567)."
            show_picker = False
        else:
            reply = f"Ho registrato la data ({data.message}), ma purtroppo non risultano master in servizio in quel giorno. Scegli un altro orario."
            show_picker = True

    # Riconosce se l'utente ha inserito Nome e Telefono (es. contiene almeno una parola e dei numeri)
    elif any(c.isdigit() for c in msg) and len(msg.split()) >= 2 and not utente_registrato:
        # Recupera i servizi disponibili dal database per mostrarli
        cursor.execute("SELECT id, nome, prezzo FROM services")
        servizi = cursor.fetchall()
        if servizi:
            servizi_str = ", ".join([f"**{s['nome']}** ({s['prezzo']}€)" for s in servizi])
            reply = f"Perfetto, ho registrato i tuoi dati! Ora, cosa desideri fare? Ecco l'elenco dei servizi disponibili:\n{servizi_str}\nScrivi il nome del servizio che preferisci."
        else:
            reply = f"Perfetto, ho registrato i tuoi dati! Quale trattamento o servizio desideri prenotare?"
        show_picker = False

    # Saluto iniziale
    elif any(keyword in msg for keyword in ["ciao", "buongiorno", "salve", "inizia", "partiamo"]) and len(msg) < 15:
        reply = f"{saluto_base} Desideri un master specifico oppure preferisci selezionare una data e un'ora?"
        show_picker = True

    else:
        # Verifica se l'utente ha nominato un master
        cursor.execute("SELECT id, nome FROM masters")
        masters = cursor.fetchall()
        
        master_trovato = None
        for m in masters:
            if m['nome'].lower() in msg:
                master_trovato = m
                break

        if master_trovato:
            cursor.execute("SELECT giorno_settimana, ora_inizio, ora_fine FROM schedules WHERE master_id = %s", (master_trovato['id'],))
            turni = cursor.fetchall()
            if turni:
                turni_str = ", ".join([f"{t['giorno_settimana']} ({str(t['ora_inizio'])[:5]} - {str(t['ora_fine'])[:5]})" for t in turni])
                reply = f"Ecco la disponibilità per {master_trovato['nome']}: {turni_str}. Seleziona la data e l'ora dal menu sottostante:"
                show_picker = True
            else:
                reply = f"Al momento non ci sono turni registrati per {master_trovato['nome']}."
        else:
            reply = f"{saluto_base} Desideri un master specifico oppure preferisci selezionare direttamente una data e un'ora?"
            show_picker = True

    conn.close()
    return {"reply": reply, "show_picker": show_picker}

@app.get("/api/admin/barbers")
def get_admin_barbers():
    conn = get_db_connection()
    if not conn:
        return {"error": "Errore di connessione al database."}
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, nome, biografia FROM masters")
    barbers = cursor.fetchall()
    conn.close()
    return barbers

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)