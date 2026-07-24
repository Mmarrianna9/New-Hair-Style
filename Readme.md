# 💈 New Hair Style — Full Stack Barbershop Web Application

Applicazione web full-stack sviluppata per la gestione completa di un salone di acconciatura con sede a Treviso. Il sistema unisce una sezione di presentazione istituzionale a un motore di prenotazione intelligente basato su turnistica e disponibilità dei singoli professionisti ("maestri").

---

## 📁 Struttura del Progetto

```text
New-Hair-Style/
├── backend/              # API Spring Boot (Java) o FastAPI (Python)
├── frontend/             # Interfaccia React & Vite (Tailwind CSS)
├── chatbot/              # Modulo per la gestione interattiva del bot di prenotazione
├── database/             # 🗄️ Script SQL per la creazione e gestione pulita del DB
└── start-all.bat         # 🚀 Script unico per avviare l'intero stack dal terminale

🚀 Panoramica delle Funzionalità
1. Area Pubblica / Vetrina & Layout

    Hero Section Dinamica: Immagine di sfondo iniziale con durata limitata (effetto dissoluzione o riduzione dopo 30 secondi per ottimizzare l'esperienza visiva).

    Vetrina dei Master: Spazio dedicato tra la navbar e l'immagine principale che mostra le foto e le descrizioni dei master prelevate direttamente dal database (masters).

    Chi Siamo & Contatti: Presentazione della storia del salone (Treviso) con collegamenti rapidi alle indicazioni stradali.

2. Barra di Navigazione (Navbar) Personalizzata

La navbar include i seguenti pulsanti e sezioni di accesso rapido:

    Chiama

    Indicazioni Stradali

    Sito Web

    Listino

    Prenota (pulsante principale evidenziato)

    Recensioni

    Admin (accesso riservato)

3. Sistema di Prenotazione Intelligente (Booking Bot / Wizard)

    Scelta Flessibile: L'utente può scegliere se partire dal professionista preferito o dall'orario desiderato.

    Controllo Turni: Verifica in tempo reale dei turni lavorativi associati ai singoli master.

    Conferma Protetta: Obbligo di inserire un recapito (telefono o email) per finalizzare e confermare l'appuntamento.

4. Area Amministrativa (Riservata)

    Accesso Protetto: Form di login dedicato esclusivamente agli amministratori del sistema.

    Gestione completa del listino prezzi, dei servizi, dei profili dei master, della turnistica e monitoraggio delle prenotazioni.

🛠️ Stack Tecnologico

    Frontend: React, Vite, Tailwind CSS.

    Backend: Spring Boot (Java) / FastAPI (Python).

    Database: MySQL (gestione relazionale di utenti, master, servizi, turni e appuntamenti).

    Deployment: Vercel (Frontend) e Railway (Backend & Database).

🗄️ Schema del Database (Tabelle Principali)

    users: id (PK), nome, email, telefono, ruolo (CLIENTE, ADMIN), password_hash.

    masters: id (PK), nome, biografia, foto_url.

    services: id (PK), titolo, descrizione, prezzo, durata_minuti.

    schedules (Turnistica): id (PK), master_id (FK), giorno_settimana, ora_inizio, ora_fine.

    appointments (Prenotazioni): id (PK), user_id (FK), master_id (FK), service_id (FK), data_ora_appuntamento, stato, recapito_contatto.