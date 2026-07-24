-- Disattiva i controlli delle chiavi esterne per evitare blocchi
SET FOREIGN_KEY_CHECKS = 0;
-- Riattiva i controlli delle chiavi esterne
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Tabella Utenti (Clienti registrati e Amministratori)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telefono VARCHAR(30),
    ruolo ENUM('CLIENTE', 'ADMIN') DEFAULT 'CLIENTE',
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabella Master (I professionisti del salone)
CREATE TABLE masters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    biografia TEXT,
    foto_url VARCHAR(255)
);

-- 3. Tabella Servizi (Listino prezzi e durata)
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR(150) NOT NULL,
    descrizione TEXT,
    prezzo DECIMAL(6,2) NOT NULL,
    durata_minuti INT NOT NULL
);

-- Tabella Utenti (per il login dell'Admin e dei clienti)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telefono VARCHAR(30),
    ruolo ENUM('CLIENTE', 'ADMIN') DEFAULT 'CLIENTE',
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inseriamo un utente amministratore predefinito (Password in chiaro o hash, a seconda di come la gestisci in Spring Boot)
INSERT INTO users (nome, email, telefono, ruolo, password_hash) 
VALUES ('Amministratore', 'admin@newhairstyle.it', '3330000000', 'ADMIN', 'admin123');

-- 4.Tabella Turnistica (orari lavorativi dei master)
CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    master_id INT NOT NULL,
    giorno_settimana ENUM('LUNEDI', 'MARTEDI', 'MERCOLEDI', 'GIOVEDI', 'VENERDI', 'SABATO', 'DOMENICA') NOT NULL,
    ora_inizio TIME NOT NULL,
    ora_fine TIME NOT NULL
) ENGINE=InnoDB;

-- 5. Tabella Prenotazioni (Appointments) con recapito obbligatorio
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL, 
    master_id INT NOT NULL,
    service_id INT NOT NULL,
    data_ora_appuntamento DATETIME NOT NULL,
    recapito_contatto VARCHAR(100) NOT NULL, 
    stato ENUM('CONFERMATO', 'CANCELLATO', 'COMPLETATO') DEFAULT 'CONFERMATO',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (master_id) REFERENCES masters(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
-- Inserimento dei Master (i 5 professionisti)
INSERT INTO masters (id, nome, biografia, foto_url) VALUES
(1, 'Marco', 'Master Barber con oltre 15 anni di esperienza nelle sfumature classiche e moderne.', '/images/barbers/marco.jpg'),
(2, 'Alice', 'Specializzata in tagli moderni, styling creativo e cura della barba.', '/images/barbers/alice.jpg'),
(3, 'Dany', 'Esperto di tagli tradizionali, rasatura a lama libera con panno caldo.', '/images/barbers/dany.jpg'),
(4, 'Monica', 'Maestra dello stile contemporaneo, trattamenti benessere e cura del capello.', '/images/barbers/monica.jpg'),
(5, 'Rebecca', 'Specialista in look di tendenza, sfumature geometriche e styling avanzato.', '/images/barbers/rebecca.jpg');

-- Inserimento di 20 Servizi per il salone
INSERT INTO services (id, titolo, descrizione, prezzo, durata_minuti) VALUES
(1, 'Taglio Classico Uomo', 'Taglio tradizionale con lavaggio, massaggio cute e styling finale.', 25.00, 30),
(2, 'Taglio Sfumato Moderno', 'Sfumatura a macchinetta o a mano ad alta precisione con finitura a lama.', 28.00, 40),
(3, 'Rasatura Tradizionale Barba', 'Trattamento completo barba con panno caldo, oli essenziali e rasoio a mano libera.', 20.00, 25),
(4, 'Regolatura Barba Express', 'Rifinitura e modellatura della barba con tagliacapelli e forbici.', 15.00, 20),
(5, 'Combo Taglio & Barba', 'Pacchetto completo: taglio capelli su misura e cura della barba con panno caldo.', 40.00, 60),
(6, 'Taglio Bambino (fino a 10 anni)', 'Taglio dedicato ai più piccoli con prodotti delicati.', 18.00, 25),
(7, 'Taglio Capelli Lunghi Uomo', 'Taglio e scalatura per capelli lunghi con trattamenti idratanti.', 32.00, 45),
(8, 'Colore Capelli Uomo (Copertura Grigio)', 'Servizio colore rapido ed effetto naturale per mimetizzare i capelli bianchi.', 25.00, 30),
(9, 'Decolorazione & Sbiancamento', 'Schiaritura totale o colpi di sole avanzati.', 50.00, 60),
(10, 'Trattamento Anticedimento / Cute', 'Massaggio cute profondo con fiale rivitalizzanti anticaduta.', 22.00, 20),
(11, 'Maschera Nera Purificante Viso', 'Trattamento esfoliante e purificante per punti neri e pulizia del viso.', 15.00, 15),
(12, 'Lavaggio Relax & Styling', 'Shampoo specifico con massaggio rilassante e asciugatura con prodotti professionali.', 12.00, 15),
(13, 'Depilazione Contorno Orecchie/Naso (Ceretta)', 'Rifinitura pulita con cera professionale per un look impeccabile.', 8.00, 10),
(14, 'Trattamento Lisciante alla Cheratina', 'Trattamento anticrespo a lunga durata per capelli ribelli.', 60.00, 60),
(15, 'Taglio e Trattamento Spa Barba', 'Servizio barba di lusso con scrub esfoliante e maschera nutriente.', 30.00, 35),
(16, 'Permanente Capelli Uomo', 'Trattamento per dare movimento, volume o ricci definiti.', 55.00, 75),
(17, 'Ritocco Contorni (Senza Taglio)', 'Rifinitura gratuita o rapida dei contorni tra un taglio e altro.', 10.00, 15),
(18, 'Trattamento Ristrutturante Post-Color', 'Maschera intensiva ricostituente per capelli trattati chimicamente.', 20.00, 20),
(19, 'Styling Sposa / Evento Speciale', 'Pettinatura ed acconciatura curata nei minimi dettagli per cerimonie.', 45.00, 45),
(20, 'Consulenza Immagine & Taglio', 'Analisi approfondita del viso e del capello per trovare il look perfetto.', 15.00, 30);