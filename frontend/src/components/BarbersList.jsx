import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom'; // Risolve l'errore su <Link>
import { Scissors, Users } from 'lucide-react'; // Risolve l'errore sulle icone
import api from '../api';

const BarbersList = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chiamata al backend Spring Boot
    api.get('/barbers')
      .then(res => {
        setBarbers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore nel caricamento dei barbieri:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black mb-12 text-center flex items-center justify-center gap-3 uppercase tracking-tighter">
          <Scissors size={40} /> I Nostri Professionisti
        </h2>

        {barbers.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">
            Nessun barbiere trovato nel database. Assicurati che il Backend sia connesso.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {barbers.map(barber => (
              <div
                key={barber.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 group"
              >
                {/* Contenitore Immagine - Cerca in public/images/barbers/ */}
                <div className="h-80 overflow-hidden bg-gray-200 relative">
                  <img
                    src={`/images/barbers/${barber?.name?.toLowerCase() || 'default'}.jpg`}
                    alt={barber?.name || 'Barbiere'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x500?text=Barber+Style";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>

                {/* Dettagli della Card */}
                <div className="p-8 text-center">
                  <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-1">
                    {barber.name}
                  </h3>
                  <p className="text-amber-600 font-bold text-sm uppercase tracking-widest mb-6">
                    Master Barber
                  </p>

                  <div className="flex justify-center gap-4 mb-6 text-gray-400">
                    {/* Un tocco di stile con icone extra */}
                    <Scissors size={18} />
                    <Users size={18} />
                  </div>

                  <Link to="/booking">
                    <button className="w-full bg-black text-white py-4 rounded-xl font-black hover:bg-zinc-800 transition-all transform active:scale-95 uppercase shadow-lg">
                      Prenota con {barber.name}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default BarbersList;