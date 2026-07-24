import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, User, Lock } from 'lucide-react';
import api from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    identifier: '', // Può contenere email, telefono o nome e cognome
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Mapping per adattarsi al backend (se il backend cerca per email o telefono)
    const payload = {
      email: credentials.identifier, // Se l'utente digita un'email o telefono
      passwordHash: credentials.password
    };

    api.post('/auth/login', payload)
      .then(res => {
        // Salviamo i dati utente nel localStorage se necessario
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/');
      })
      .catch(err => {
        console.error("Errore di login:", err);
        setError('Credenziali non valide. Controlla i dati inseriti.');
      });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-zinc-950 text-white">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight text-accent-gold">Accedi</h2>
          <p className="text-zinc-400 text-xs mt-2 uppercase tracking-widest">Bentornato da New Hair Style</p>
          <div className="w-12 h-1 bg-accent-gold mx-auto mt-3 rounded-full"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl text-xs font-bold text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Email, Telefono o Nome</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-zinc-500" size={16} />
              <input 
                type="text" 
                name="identifier" 
                required 
                value={credentials.identifier} 
                onChange={handleChange}
                placeholder="Email, telefono o nome..." 
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-zinc-500" size={16} />
              <input 
                type="password" 
                name="password" 
                required 
                value={credentials.password} 
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
            <LogIn size={16} /> Accedi
          </button>

          <div className="text-center mt-6">
            <p className="text-xs text-zinc-400">
              Non hai ancora un account?{' '}
              <Link to="/register" className="text-accent-gold font-bold hover:underline">
                Registrati qui
              </Link>
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}