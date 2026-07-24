from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
from mysql.connector import Error

app = FastAPI()

# Permette al tuo sito di comunicare con questo server locale
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

@app.post("/api/chat")
def chat_endpoint(data: ChatMessage):
    conn = get_db_connection()
    if not conn:
        return {"reply": "Errore di connessione al database."}
    
    cursor = conn.cursor(dictionary=True)
    msg = data.message.lower().strip()
    
    # Logica semplice di risposta basata su cosa scrive l'utente
    if "servizi" in msg:
        cursor.execute("SELECT titolo, prezzo FROM services")
        services = cursor.fetchall()
        services_list = ", ".join([f"{s['titolo']} ({s['prezzo']}€)" for s in services])
        reply = f"Ecco i nostri servizi: {services_list}"
    elif "master" in msg or "barbieri" in msg:
        cursor.execute("SELECT nome, biografia FROM masters")
        masters = cursor.fetchall()
        masters_list = ", ".join([f"{m['nome']} ({m['biografia']})" for m in masters])
        reply = f"I nostri Master: {masters_list}"
    else:
        reply = "Benvenuto da New Hair Style! Scrivi 'servizi' per vedere i nostri tagli o 'master' per i barbieri."
        
    conn.close()
    return {"reply": reply}