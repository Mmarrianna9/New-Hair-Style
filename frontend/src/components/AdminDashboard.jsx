import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';
import { Trash2, Plus, UserPlus, Scissors, Calendar as CalIcon, X, Check, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [data, setData] = useState([]);
  const [masters, setMasters] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Stato iniziale per servizi o staff
  const initialState = { 
    name: '', 
    price: '', 
    durationMinutes: 30, 
    category: 'UOMO', 
    description: '' 
  };

  const [newItem, setNewItem] = useState(initialState);

  // Stato specifico per l'inserimento dei turni
  const [newSchedule, setNewSchedule] = useState({
    masterId: '',
    giornoSettimana: 'LUNEDI',
    oraInizio: '09:00',
    oraFine: '19:00'
  });

  // Caricamento dei master (necessario per il form dei turni e dei servizi se richiesto)
  const loadMasters = useCallback(() => {
    api.get('/admin/barbers')
      .then(res => setMasters(res.data))
      .catch(err => console.error("Errore caricamento master:", err));
  }, []);

  // 1. Caricamento dati in base alla tab attiva
  const loadData = useCallback(() => {
    if (activeTab === 'schedules') {
      api.get('/admin/schedules')
        .then(res => setData(res.data))
        .catch(err => console.error("Errore caricamento turni:", err));
    } else {
      api.get(`/admin/${activeTab}`)
        .then(res => setData(res.data))
        .catch(err => console.error("Errore nel caricamento:", err));
    }
  }, [activeTab]);

  useEffect(() => {
    loadMasters();
    loadData();
  }, [loadMasters, loadData]);

  // 2. Cancellazione
  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo elemento?")) {
      const endpoint = activeTab === 'schedules' ? `/admin/schedules/${id}` : `/admin/${activeTab}/${id}`;
      api.delete(endpoint)
        .then(() => {
          loadData();
          alert("Eliminato con successo");
        })
        .catch(err => {
          console.error("Errore eliminazione:", err);
          alert("Impossibile eliminare l'elemento.");
        });
    }
  };

  // 3. Salvataggio (Servizi, Staff o Turni)
  const handleSave = (e) => {
    e.preventDefault();
    
    if (activeTab === 'schedules') {
      api.post('/admin/schedules', newSchedule)
        .then(() => {
          setNewSchedule({ masterId: '', giornoSettimana: 'LUNEDI', oraInizio: '09:00', oraFine: '19:00' });
          setShowAddForm(false);
          loadData();
          alert("Turno aggiunto con successo!");
        })
        .catch(err => {
          console.error("Errore salvataggio turno:", err);
          alert("Errore durante il salvataggio del turno.");
        });
    } else {
      const payload = activeTab === 'services' ? {
        name: newItem.name,
        price: parseFloat(newItem.price),
        durationMinutes: parseInt(newItem.durationMinutes),
        category: newItem.category,
        description: newItem.description || "Nessuna descrizione"
      } : {
        name: newItem.name
      };

      api.post(`/admin/${activeTab}`, payload)
        .then(() => {
          setNewItem(initialState);
          setShowAddForm(false);
          loadData();
        })
        .catch(err => {
          console.error("Errore salvataggio:", err.response?.data || err);
          alert("Errore durante il salvataggio. Controlla che i dati siano corretti.");
        });
    }
  };

  return (
    <div className="w-full max-w-6xl px-4 py-8 mx-auto">
      {/* Tabs di navigazione */}
      <div className="flex flex-wrap gap-2 mb-6 bg-black/40 p-2 rounded-2xl backdrop-blur-md border border-white/10">
        {[
          { id: 'appointments', icon: <CalIcon size={14} />, label: 'Appuntamenti' },
          { id: 'services', icon: <Scissors size={14} />, label: 'Servizi' },
          { id: 'barbers', icon: <UserPlus size={14} />, label: 'Staff' },
          { id: 'schedules', icon: <Clock size={14} />, label: 'Turni' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setShowAddForm(false); }}
            className={`flex-1 min-w-[110px] py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === tab.id ? 'bg-accent-gold text-black shadow-lg' : 'text-zinc-400 hover:text-white'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white text-black rounded-[2rem] shadow-2xl overflow-hidden min-h-[500px] border border-gray-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-black uppercase tracking-tighter">Gestione {activeTab}</h2>
          
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className={`${showAddForm ? 'bg-red-500' : 'bg-black'} text-white p-2 rounded-lg hover:scale-105 transition-all shadow-md`}
          >
            {showAddForm ? <X size={20} /> : <Plus size={20} />}
          </button>
        </div>

        {/* Form di inserimento condizionale */}
        {showAddForm && (
          <div className="p-6 bg-accent-gold/5 border-b border-accent-gold/20">
            {activeTab === 'schedules' ? (
              // Form Turni
              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div>
                  <label className="block text-[9px] font-black uppercase mb-1 text-gray-400">Master</label>
                  <select 
                    required
                    className="w-full p-2.5 border rounded-xl text-sm bg-white font-bold"
                    value={newSchedule.masterId}
                    onChange={(e) => setNewSchedule({...newSchedule, masterId: e.target.value})}
                  >
                    <option value="">Seleziona Master</option>
                    {masters.map(m => (
                      <option key={m.id} value={m.id}>{m.nome}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase mb-1 text-gray-400">Giorno</label>
                  <select 
                    className="w-full p-2.5 border rounded-xl text-sm bg-white font-bold"
                    value={newSchedule.giornoSettimana}
                    onChange={(e) => setNewSchedule({...newSchedule, giornoSettimana: e.target.value})}
                  >
                    {['LUNEDI', 'MARTEDI', 'MERCOLEDI', 'GIOVEDI', 'VENERDI', 'SABATO', 'DOMENICA'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase mb-1 text-gray-400">Ora Inizio</label>
                  <input 
                    type="time" required
                    className="w-full p-2.5 border rounded-xl text-sm bg-white"
                    value={newSchedule.oraInizio}
                    onChange={(e) => setNewSchedule({...newSchedule, oraInizio: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase mb-1 text-gray-400">Ora Fine</label>
                  <input 
                    type="time" required
                    className="w-full p-2.5 border rounded-xl text-sm bg-white"
                    value={newSchedule.oraFine}
                    onChange={(e) => setNewSchedule({...newSchedule, oraFine: e.target.value})}
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="w-full bg-black text-white py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-accent-gold hover:text-black transition-all flex items-center justify-center gap-2">
                    <Check size={14}/> Salva Turno
                  </button>
                </div>
              </form>
            ) : (
              // Form Servizi / Staff
              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-[9px] font-black uppercase mb-1 text-gray-400">Nome {activeTab === 'barbers' ? 'Barbiere' : 'Servizio'}</label>
                  <input 
                    required
                    className="w-full p-2.5 border rounded-xl outline-none text-sm bg-white"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    placeholder={activeTab === 'barbers' ? "Nome Barbiere" : "Nome Servizio"}
                  />
                </div>

                {activeTab === 'services' && (
                  <>
                    <div>
                      <label className="block text-[9px] font-black uppercase mb-1 text-gray-400">Prezzo (€)</label>
                      <input 
                        type="number" step="0.50" required
                        className="w-full p-2.5 border rounded-xl text-sm bg-white"
                        value={newItem.price}
                        onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase mb-1 text-gray-400">Durata (Min)</label>
                      <input 
                        type="number" required
                        className="w-full p-2.5 border rounded-xl text-sm bg-white"
                        value={newItem.durationMinutes}
                        onChange={(e) => setNewItem({...newItem, durationMinutes: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[9px] font-black uppercase mb-1 text-gray-400">Categoria</label>
                      <select 
                        className="w-full p-2.5 border rounded-xl text-sm font-bold bg-white"
                        value={newItem.category}
                        onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      >
                        <option value="UOMO">UOMO</option>
                        <option value="DONNA">DONNA</option>
                        <option value="BAMBINO">BAMBINO</option>
                        <option value="TRATTAMENTO">TRATTAMENTO</option>
                        <option value="COLORE">COLORE</option>
                      </select>
                    </div>
                  </>
                )}
                
                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" className="bg-black text-white px-8 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-accent-gold hover:text-black transition-all flex items-center gap-2">
                    <Check size={14}/> Salva
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tabella Dati */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] uppercase text-zinc-400 border-b">
              <tr>
                <th className="p-4 font-black">Informazioni</th>
                {activeTab === 'services' && <th className="p-4 font-black">Categoria</th>}
                {activeTab === 'appointments' && <th className="p-4 font-black">Data e Ora</th>}
                {activeTab === 'schedules' && <th className="p-4 font-black">Orario Lavorativo</th>}
                <th className="p-4 font-black text-center">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">
                        {activeTab === 'schedules' ? `Master ID: ${item.masterId}` : (item.name || item.customerName || item.nome)}
                      </span>
                      {item.price !== undefined && (
                        <span className="text-accent-gold font-black text-xs">
                          {item.price}€ — {item.durationMinutes} min
                        </span>
                      )}
                      {activeTab === 'schedules' && (
                        <span className="text-accent-gold font-black text-xs uppercase">
                          {item.giornoSettimana}
                        </span>
                      )}
                    </div>
                  </td>
                  
                  {activeTab === 'services' && (
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-100 rounded text-[9px] font-bold uppercase">{item.category}</span>
                    </td>
                  )}
                  
                  {activeTab === 'appointments' && (
                    <td className="p-4 text-[11px] font-medium text-gray-500">
                      {item.startTime ? new Date(item.startTime).toLocaleString('it-IT') : 'Data non disponibile'}
                    </td>
                  )}

                  {activeTab === 'schedules' && (
                    <td className="p-4 text-[11px] font-bold text-gray-600">
                      {item.oraInizio} - {item.oraFine}
                    </td>
                  )}

                  <td className="p-4 text-center">
                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 p-2 transition-transform hover:scale-110">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <div className="text-center py-24 text-gray-300 uppercase text-[10px] font-black tracking-[0.3em]">
              Nessun record trovato
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;