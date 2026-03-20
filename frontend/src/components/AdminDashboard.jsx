import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';
import { Trash2, Plus, UserPlus, Scissors, Calendar as CalIcon, X, Check } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [data, setData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Stato iniziale allineato agli Enum Java: UOMO, DONNA, BAMBINO, TRATTAMENTO, COLORE
  const initialState = { 
    name: '', 
    price: '', 
    durationMinutes: 30, 
    category: 'UOMO', 
    description: '' 
  };

  const [newItem, setNewItem] = useState(initialState);

  // 1. Caricamento dati
  const loadData = useCallback(() => {
    api.get(`/admin/${activeTab}`)
      .then(res => setData(res.data))
      .catch(err => console.error("Errore nel caricamento:", err));
  }, [activeTab]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 2. Cancellazione
  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo elemento?")) {
      api.delete(`/admin/${activeTab}/${id}`)
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

  // 3. Salvataggio
  const handleSave = (e) => {
    e.preventDefault();
    
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
  };

  return (
    <div className="w-full max-w-6xl px-4 py-8 mx-auto">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 bg-black/40 p-2 rounded-2xl backdrop-blur-md border border-white/10">
        {[
          { id: 'appointments', icon: <CalIcon size={14} />, label: 'Appuntamenti' },
          { id: 'services', icon: <Scissors size={14} />, label: 'Servizi' },
          { id: 'barbers', icon: <UserPlus size={14} />, label: 'Staff' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setShowAddForm(false); }}
            className={`flex-1 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === tab.id ? 'bg-accent-gold text-black shadow-lg' : 'text-zinc-400 hover:text-white'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white text-black rounded-[2rem] shadow-2xl overflow-hidden min-h-[500px] border border-gray-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-black uppercase tracking-tighter">Gestione {activeTab}</h2>
          
          {activeTab !== 'appointments' && (
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className={`${showAddForm ? 'bg-red-500' : 'bg-black'} text-white p-2 rounded-lg hover:scale-105 transition-all shadow-md`}
            >
              {showAddForm ? <X size={20} /> : <Plus size={20} />}
            </button>
          )}
        </div>

        {showAddForm && (
          <form onSubmit={handleSave} className="p-6 bg-accent-gold/5 border-b border-accent-gold/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
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
            </div>
          </form>
        )}

        {/* Tabella Dati */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] uppercase text-zinc-400 border-b">
              <tr>
                <th className="p-4 font-black">Informazioni</th>
                {activeTab === 'services' && <th className="p-4 font-black">Categoria</th>}
                {activeTab === 'appointments' && <th className="p-4 font-black">Data e Ora</th>}
                <th className="p-4 font-black text-center">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">{item.name || item.customerName}</span>
                      {item.price !== undefined && (
                        <span className="text-accent-gold font-black text-xs">
                          {item.price}€ — {item.durationMinutes} min
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