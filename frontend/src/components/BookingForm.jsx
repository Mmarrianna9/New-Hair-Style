import React, { useState, useEffect } from 'react';
import api from '../api';
import { Calendar, User, Clock, CheckCircle } from 'lucide-react';

const BookingForm = () => {
  const [barbers, setBarbers] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    appointmentTime: '',
    barberId: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Carichiamo i barbieri dal database per il menu a tendina
  useEffect(() => {
    api.get('/barbers')
      .then(res => setBarbers(res.data))
      .catch(err => console.error("Errore barbieri:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepariamo l'oggetto per il backend
    const appointment = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      appointmentTime: formData.appointmentTime,
      barber: { id: formData.barberId } // Inviamo l'oggetto Barber con l'ID scelto
    };

    api.post('/appointments', appointment)
      .then(() => setSubmitted(true))
      .catch(err =>{
        console.error("Errore salvataggio appuntamento:", err);
         alert("Errore durante la prenotazione")});
  };

  if (submitted) {
    return (
      <div className="text-center p-10 bg-green-50 rounded-lg border border-green-200">
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
        <Calendar /> Prenota il tuo taglio
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input 
            type="text" required
            className="w-full p-2 border rounded-md"
            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" required
            className="w-full p-2 border rounded-md"
            onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Scegli il Barbiere</label>
          <select 
            required 
            className="w-full p-2 border rounded-md"
            onChange={(e) => setFormData({...formData, barberId: e.target.value})}
          >
            <option value="">Seleziona...</option>
            {barbers.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Data e Ora</label>
          <input 
            type="datetime-local" required
            className="w-full p-2 border rounded-md"
            onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
          />
        </div>

        <button type="submit" className="w-full bg-black text-white py-3 rounded-md font-bold hover:bg-gray-800 transition-colors">
          CONFERMA APPUNTAMENTO
        </button>
      </form>
    </div>
  );
};

export default BookingForm;