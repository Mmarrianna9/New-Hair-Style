import React, { useState, useEffect } from 'react';
import api from '../api';

const BarbersList = ({ position }) => {
  const [barbers, setBarbers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    api.get('/barbers')
      .then(res => setBarbers(res.data))
      .catch(err => console.error("Errore caricamento barbieri:", err));
  }, []);

  // LOGICA DI SMISTAMENTO (Chirurgica)
  // Se la prop position è "left", prendiamo i primi 3.
  // Se è "right", prendiamo dal quarto (indice 3) in poi.
  const displayBarbers = position === 'left' 
    ? barbers.slice(0, 3) 
    : barbers.slice(3, 5);

  return (
    <div className="flex flex-col gap-5">
      {displayBarbers.map((barber) => (
        <div 
          key={barber.id} 
          onClick={() => setSelectedId(barber.id)}
          className={`
            relative w-28 h-40 md:w-32 md:h-44 overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer border-2
            ${selectedId === barber.id 
              ? 'border-accent-gold scale-110 shadow-[0_0_25px_rgba(212,175,55,0.4)] z-30 opacity-100' 
              : 'border-white/10 opacity-50 hover:opacity-100 hover:scale-105'}
          `}
        >
          {/* Foto Barbiere */}
          <img 
            src={`/images/barbers/${barber.name.toLowerCase()}.jpg`} 
            alt={barber.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://placehold.co/300x400?text=" + barber.name;
            }}
          />
          
          {/* Nome Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-3">
            <h3 className="text-[10px] font-black uppercase tracking-tighter text-white text-center">
              {barber.name}
            </h3>
            {selectedId === barber.id && (
               <div className="w-full h-1 bg-accent-gold mt-1 rounded-full animate-pulse shadow-[0_0_10px_#d4af37]"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarbersList;