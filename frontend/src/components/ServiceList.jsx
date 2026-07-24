import React, { useEffect, useState } from 'react';
import api from '../api';

const ServiceList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        api.get('/services')
            .then(res => setServices(res.data))
            .catch(err => console.error("Errore nel caricamento servizi:", err));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 text-black">
            {services.map(service => (
                <div key={service.id} className="bg-white/90 backdrop-blur-md border border-zinc-200 p-5 rounded-2xl shadow-xl hover:border-amber-400 transition-all">
                    <h3 className="font-black text-lg uppercase text-black">{service.titolo}</h3>
                    <p className="text-zinc-600 text-xs mt-1">{service.descrizione}</p>
                    <div className="mt-4 flex justify-between items-center border-t border-zinc-100 pt-3">
                        <span className="font-black text-amber-600 text-base">€ {service.prezzo}</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{service.durataMinuti} min</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServiceList;