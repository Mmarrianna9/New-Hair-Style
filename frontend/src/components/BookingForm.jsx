import React, { useState, useEffect } from 'react';
import api from '../api';

export default function BookingForm() {
  const [masters, setMasters] = useState([]);
  const [services, setServices] = useState([]);
  
  const [selectedMaster, setSelectedMaster] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [dataOra, setDataOra] = useState('');
  const [recapito, setRecapito] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Carica i master e i servizi dal backend
    api.get('/admin/barbers').then(res => setMasters(res.data)).catch(err => console.error(err));
    api.get('/admin/services').then(res => setServices(res.data)).catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const newAppointment = {
      master: { id: selectedMaster },
      service: { id: selectedService },
      dataOraAppuntamento: dataOra,
      recapitoContatto: recapito,
      stato: 'CONFERMATO'
    };

    api.post('/appointments', newAppointment)
      .then(() => {
        setSuccessMsg('Prenotazione effettuata con successo! Ti aspettiamo in salone.');
        setSelectedMaster('');
        setSelectedService('');
        setDataOra('');
        setRecapito('');
      })
      .catch(err => {
        console.error(err);
        setErrorMsg(err.response?.data?.message || "Orario già occupato o dati non validi.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      {successMsg && <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-800 p-3 rounded-xl text-xs font-bold">{successMsg}</div>}
      {errorMsg && <div className="bg-rose-500/20 border border-rose-500 text-rose-800 p-3 rounded-xl text-xs font-bold">{errorMsg}</div>}

      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">Seleziona Master</label>
        <select 
          value={selectedMaster} 
          onChange={(e) => setSelectedMaster(e.target.value)} 
          required
          className="w-full bg-zinc-100 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-amber-500"
        >
          <option value="">-- Scegli un professionista --</option>
          {masters.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">Seleziona Servizio</label>
        <select 
          value={selectedService} 
          onChange={(e) => setSelectedService(e.target.value)} 
          required
          className="w-full bg-zinc-100 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-amber-500"
        >
          <option value="">-- Scegli il trattamento --</option>
          {services.map(s => <option key={s.id} value={s.id}>{s.titolo} (€ {s.prezzo})</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">Data e Ora Appuntamento</label>
        <input 
          type="datetime-local" 
          value={dataOra} 
          onChange={(e) => setDataOra(e.target.value)} 
          required
          className="w-full bg-zinc-100 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-amber-500"
        />
      </div>

      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-zinc-700 mb-1">Recapito (Telefono o Email)</label>
        <input 
          type="text" 
          placeholder="es. 3331234567 o email" 
          value={recapito} 
          onChange={(e) => setRecapito(e.target.value)} 
          required
          className="w-full bg-zinc-100 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-amber-500"
        />
      </div>

      <button 
        type="submit" 
        className="mt-4 w-full bg-amber-400 hover:bg-amber-500 text-black font-black uppercase tracking-widest text-xs py-3.5 rounded-xl shadow-lg transition-transform active:scale-95"
      >
        Conferma Prenotazione
      </button>
    </form>
  );
}