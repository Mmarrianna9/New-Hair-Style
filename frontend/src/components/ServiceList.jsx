import React, { useEffect, useState } from 'react';

const ServiceList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error("Errore nel caricamento:", err));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {services.map(service => (
                <div key={service.id} className="border p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-xl">{service.name}</h3>
                    <p className="text-gray-600">{service.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                        <span className="font-semibold text-lg">{service.price}€</span>
                        <span className="text-sm italic text-gray-400">{service.durationMinutes} min</span>
                    </div>
                </div>
            ))}
        </div>
    );
};