import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Scissors, 
  Home, 
  Phone, 
  MapPin, 
  Globe, 
  FileText, 
  Calendar, 
  Star, 
  ShieldCheck, 
  ArrowLeft,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Funzione di supporto per controllare se il path è attivo
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center px-6 justify-between">
      
      {/* Sezione Sinistra: Back to Home & Logo */}
      <div className="flex items-center gap-4">
        {location.pathname !== '/' && (
          <button 
            onClick={() => navigate(-1)} 
            className="text-zinc-400 hover:text-accent-gold transition-colors p-1 flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest"
            title="Torna Indietro"
          >
            <ArrowLeft size={16} />
          </button>
        )}

        <Link to="/" className="text-lg font-black uppercase tracking-tighter text-accent-gold hover:scale-105 transition-transform flex items-center gap-2">
          <Scissors size={20} />
          NEW HAIR STYLE
        </Link>
      </div>

      {/* Link di Navigazione ed Azioni */}
      <div className="flex gap-5 items-center">
        
        {/* Pulsante Home */}
        <Link 
          to="/" 
          className={`flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest transition-colors ${isActive('/') ? 'text-accent-gold' : 'text-zinc-300 hover:text-accent-gold'}`}
        >
          <Home size={14} />
          Home
        </Link>

        {/* Chiama */}
        <a 
          href="tel:+39422123456" 
          className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-zinc-300 hover:text-accent-gold transition-colors"
        >
          <Phone size={14} />
          Chiama
        </a>

        {/* Indicazioni Maps */}
        <a 
          href="https://www.google.com/maps/search/?api=1&query=New+Hair+Style+Treviso" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-zinc-300 hover:text-accent-gold transition-colors"
        >
          <MapPin size={14} />
          Indicazioni
        </a>

        {/* Sito Web Esterno */}
        <a
          href="/sitoweb/sito.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-zinc-300 hover:text-accent-gold transition-colors"
        >
          <Globe size={14} />
          Sito Web
        </a>

        {/* Listino Servizi */}
        <Link 
          to="/services" 
          className={`flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest transition-colors ${isActive('/services') ? 'text-accent-gold' : 'text-zinc-300 hover:text-accent-gold'}`}
        >
          <FileText size={14} />
          Listino
        </Link>

        {/* Prenota */}
        <Link 
          to="/booking" 
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-lg ${isActive('/booking') ? 'bg-amber-400 text-black scale-105' : 'bg-accent-gold text-black hover:scale-105'}`}
        >
          <Calendar size={14} />
          Prenota
        </Link>

        {/* Recensioni */}
        <Link 
          to="/reviews" 
          className={`flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest transition-colors ${isActive('/reviews') ? 'text-accent-gold' : 'text-zinc-300 hover:text-accent-gold'}`}
        >
          <Star size={14} />
          Recensioni
        </Link>

        {/* Sezione Autenticazione Clienti (Accedi / Registrati) */}
        <div className="flex items-center gap-3 border-l border-white/20 pl-4">
          <Link 
            to="/login" 
            className={`flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest transition-colors ${isActive('/login') ? 'text-accent-gold' : 'text-zinc-300 hover:text-accent-gold'}`}
          >
            <LogIn size={14} />
            Accedi
          </Link>

          <Link 
            to="/register" 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-widest transition-all ${isActive('/register') ? 'bg-white text-black' : 'bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800'}`}
          >
            <UserPlus size={14} />
            Registrati
          </Link>
        </div>

        {/* Admin */}
        <Link 
          to="/admin" 
          className={`flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest transition-colors border-l border-white/20 pl-4 ${isActive('/admin') ? 'text-accent-gold' : 'text-zinc-400 hover:text-white'}`}
        >
          <ShieldCheck size={14} />
          Admin
        </Link>

      </div>
    </nav>
  );
}