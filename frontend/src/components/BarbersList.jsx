import React, { useState, useEffect } from 'react';
import api from '../api';

export default function BarbersList({ position }) {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    api.get('/admin/barbers')
      .then(res => setBarbers(res.data))
      .catch(err => console.error("Errore caricamento master:", err));
  }, []);

  // Dividiamo i 5 barbieri in due gruppi per le ali laterali
  // Sinistra: primi 3 (es. Marco, Alice, Dany) | Destra: ultimi 2 (Monica, Rebecca)
  const splitIndex = Math.ceil(barbers.length / 2);
  const displayedBarbers = position === 'left' ? barbers.slice(0, splitIndex) : barbers.slice(splitIndex);

  return (
    <div className="flex flex-col gap-6 w-72">
      {displayedBarbers.map((barber) => (
        <div key={barber.id} className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-xl hover:border-amber-400/50 transition-all">
          <img 
            src={`/images/barbers/${barber.nome.toLowerCase()}.jpg`} 
            alt={barber.nome} 
            className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-md"
            onError={(e) => { e.target.src = '/images/barbers/marco.jpg'; }} // Fallback di sicurezza
          />
          <div>
            <h3 className="font-black uppercase text-amber-400 text-sm tracking-wider">{barber.nome}</h3>
            <p className="text-[11px] text-zinc-300 line-clamp-2 mt-0.5">{barber.biografia || "Master Barber Professionale"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}