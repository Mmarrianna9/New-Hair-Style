import React, { useState, useEffect } from 'react';
import api from '../api';
import { User } from 'lucide-react';

const BarbersList = () => {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    api.get('/barbers')
      .then(res => setBarbers(res.data))
      .catch(err => console.error("Errore caricamento barbieri:", err));
  }, []);

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">I Nostri Professionisti</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {barbers.map((barber) => (
            <div key={barber.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <img 
  // Trasformiamo il nome (es. "Monica") in minuscolo ("monica") + ".jpg"
  src={`/images/barbers/${barber.name.toLowerCase()}.jpg`} 
  alt={barber.name}
  className="w-full h-80 object-cover group-hover:opacity-75 transition-opacity"
  onError={(e) => {
    // Se il file .jpg non esiste o il nome è diverso, mette un segnaposto
    e.target.src = "https://placehold.co/400x500?text=Foto+Mancante";
  }}
/>
              <div className="p-4 text-center">
                <h3 className="font-bold text-xl text-gray-800">{barber.name}</h3>
                <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider">Expert Barber</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  {barber.services && barber.services.slice(0, 2).map(s => (
                    <span key={s.id} className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbersList;