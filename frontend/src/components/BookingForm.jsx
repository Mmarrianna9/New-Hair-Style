import React, { useState, useEffect } from 'react';
import api from '../api';
import { Calendar, CheckCircle, Mail, Phone, Clock, Scissors, User, UserCheck } from 'lucide-react';

const BookingForm = () => {
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]); 
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    appointmentTime: '',
    barberId: '',
    serviceId: '' 
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    api.get('/barbers').then(res => setBarbers(res.data)).catch(err => console.error(err));
    api.get('/services').then(res => setServices(res.data)).catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = new Date(formData.appointmentTime);
    const end = new Date(start.getTime() + 30 * 60000); 

    const appointment = {
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      startTime: formData.appointmentTime,
      endTime: end.toISOString(),
      barber: { id: parseInt(formData.barberId) },
      service: { id: parseInt(formData.serviceId) }
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
      <div className="text-center p-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-black uppercase mb-2">Prenotato!</h2>
        <p className="text-gray-500 mb-6 text-sm">Ti aspettiamo in salone.</p>
        <button onClick={() => setSubmitted(false)} className="bg-black text-white px-8 py-3 rounded-xl font-bold text-xs uppercase">Chiudi</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative md:col-span-2">
        <User className="absolute left-3 top-3 text-accent-gold" size={18} />
        <input 
          placeholder="Nome Completo" type="text" required
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black"
          onChange={(e) => setFormData({...formData, customerName: e.target.value})}
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-3 text-accent-gold" size={18} />
        <input 
          placeholder="Email" type="email" required
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black"
          onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-3 text-accent-gold" size={18} />
        <input 
          placeholder="Telefono" type="tel" required
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black"
          onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
        />
      </div>

      <div className="relative">
        <UserCheck className="absolute left-3 top-3 text-accent-gold" size={18} />
        <select 
          required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black appearance-none"
          onChange={(e) => setFormData({...formData, barberId: e.target.value})}
        >
          <option value="">Scegli Barbiere</option>
          {barbers.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>

      <div className="relative">
        <Scissors className="absolute left-3 top-3 text-accent-gold" size={18} />
        <select 
          required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black appearance-none"
          onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
        >
          <option value="">Scegli Servizio</option>
          {services.map(s => <option key={s.id} value={s.id}>{s.name} ({s.price}€)</option>)}
        </select>
      </div>

      <div className="relative md:col-span-2">
        <Clock className="absolute left-3 top-3 text-accent-gold" size={18} />
        <input 
          type="datetime-local" required
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-black"
          onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
        />
      </div>

      <button type="submit" className="md:col-span-2 bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-accent-gold hover:text-black transition-all shadow-lg mt-2">
        Conferma Appuntamento
      </button>
    </form>
  );
};

export default BookingForm;