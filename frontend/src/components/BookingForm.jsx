import React, { useState, useEffect } from 'react';
import api from '../api';
import { Calendar, CheckCircle } from 'lucide-react';

const BookingForm = () => {
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]); // Aggiunti i servizi
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    appointmentTime: '',
    barberId: '',
    serviceId: '' // Aggiunto servizio scelto
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Carichiamo barbieri e servizi in parallelo
    api.get('/barbers').then(res => setBarbers(res.data)).catch(err => console.error(err));
    api.get('/services').then(res => setServices(res.data)).catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointment = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      appointmentTime: formData.appointmentTime,
      barber: { id: formData.barberId },
      service: { id: formData.serviceId } // Inviamo anche il servizio
    };

    api.post('/appointments', appointment)
      .then(() => setSubmitted(true))
      .catch(err => {
        console.error(err);
        alert("Errore durante la prenotazione");
      });
  };

  if (submitted) {
    return (
      <div className="text-center p-10 bg-green-50 rounded-lg border border-green-200 max-w-md mx-auto">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-green-800">Prenotazione Confermata!</h2>
        <p className="text-green-600">Ti aspettiamo in salone.</p>
        <button onClick={() => setSubmitted(false)} className="mt-4 text-blue-600 underline">Fai un'altra prenotazione</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <Calendar /> Prenota il tuo stile
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          placeholder="Nome Completo" type="text" required
          className="w-full p-2 border rounded-md"
          onChange={(e) => setFormData({...formData, customerName: e.target.value})}
        />

        <input 
          placeholder="Email" type="email" required
          className="w-full p-2 border rounded-md"
          onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
        />

        <select 
          required className="w-full p-2 border rounded-md"
          onChange={(e) => setFormData({...formData, barberId: e.target.value})}
        >
          <option value="">Scegli il Barbiere...</option>
          {barbers.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        <select 
          required className="w-full p-2 border rounded-md"
          onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
        >
          <option value="">Scegli il Servizio...</option>
          {services.map(s => (
            <option key={s.id} value={s.id}>{s.name} - {s.price}€</option>
          ))}
        </select>

        <input 
          type="datetime-local" required
          className="w-full p-2 border rounded-md"
          onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
        />

        <button type="submit" className="w-full bg-black text-white py-3 rounded-md font-bold hover:bg-gray-800 transition-all">
          CONFERMA PRENOTAZIONE
        </button>
      </form>
    </div>
  );
};

export default BookingForm;