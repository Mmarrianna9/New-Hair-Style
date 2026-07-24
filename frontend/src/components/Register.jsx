import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Phone, Lock, User, CheckCircle2 } from 'lucide-react';
import api from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validazione: almeno uno tra email e telefono deve essere obbligatorio
    if (!formData.email && !formData.telefono) {
      setError('Inserisci almeno un indirizzo email o un numero di telefono.');
      return;
    }

    // Prepariamo il payload unendo nome e cognome se il backend si spetta un unico campo "nome" o tenendoli separati a seconda del tuo DB
    const payload = {
      nome: `${formData.nome} ${formData.cognome}`.trim(),
      email: formData.email || null,
      telefono: formData.telefono || null,
      passwordHash: formData.password // Adattato alla proprietà del backend
    };

    api.post('/auth/register', payload)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch(err => {
        console.error("Errore di registrazione:", err);
        setError('Errore durante la registrazione. Riprova.');
      });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-zinc-950 text-white">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight text-accent-gold">Registrazione Cliente</h2>
          <p className="text-zinc-400 text-xs mt-2 uppercase tracking-widest">Crea il tuo account per prenotare</p>
          <div className="w-12 h-1 bg-accent-gold mx-auto mt-3 rounded-full"></div>
        </div>

        {success ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl text-center flex flex-col items-center gap-2">
            <CheckCircle2 size={32} />
            <span className="font-bold text-sm uppercase tracking-wide">Registrazione completata! Reindirizzamento...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl text-xs font-bold text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Nome *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-zinc-500" size={16} />
                  <input 
                    type="text" 
                    name="nome" 
                    required 
                    value={formData.nome} 
                    onChange={handleChange}
                    placeholder="Mario" 
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Cognome *</label>
                <input 
                  type="text" 
                  name="cognome" 
                  required 
                  value={formData.cognome} 
                  onChange={handleChange}
                  placeholder="Rossi" 
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Email (Opzionale se c'è il telefono)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-zinc-500" size={16} />
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder="mario.rossi@email.it" 
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Telefono (Opzionale se c'è l'email)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-zinc-500" size={16} />
                <input 
                  type="tel" 
                  name="telefono" 
                  value={formData.telefono} 
                  onChange={handleChange}
                  placeholder="3331234567" 
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-zinc-500" size={16} />
                <input 
                  type="password" 
                  name="password" 
                  required 
                  value={formData.password} 
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-accent-gold text-black font-black uppercase text-xs tracking-widest py-3.5 rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <UserPlus size={16} /> Registrati
            </button>

            <div className="text-center mt-6">
              <p className="text-xs text-zinc-400">
                Hai già un account?{' '}
                <Link to="/login" className="text-accent-gold font-bold hover:underline">
                  Accedi qui
                </Link>
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}