import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import api from './api';

// Componenti
import Navbar from './components/Navbar'; 
import BarbersList from './components/BarbersList';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import ServiceList from './components/ServiceList';
import Recensioni from './components/Recensioni';
import Login from './components/Login';
import Register from './components/Register';
import BookingSidebar from './components/BookingSidebar';

// Asset 
import sfondo from './assets/images/sfondo.jpg';
import sfondo2 from './assets/images/sfondo2.jpg';

// Componente Sfondo Globale
const GlobalBackground = () => {
  const images = [sfondo, sfondo2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="fixed inset-0 z-0 w-full h-[60vh]"> 
      {images.map((img, i) => (
        <img 
          key={i} 
          src={img} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentImageIndex ? 'opacity-100' : 'opacity-0'}`} 
          alt={`background-${i}`} 
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
    </div>
  );
};

// Sezione Home Principale con Card dei Master (basate sulla tabella masters del DB)
const HomeView = ({ onOpenSidebar }) => {
  const [masters, setMasters] = useState([]);

  useEffect(() => {
    api.get('/admin/barbers')
      .then(res => setMasters(res.data))
      .catch(err => console.error("Errore caricamento master:", err));
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-20 pt-44 flex flex-col items-center text-center">
      
      {/* Titolo Principale */}
      <div className="mb-20 z-10 w-full flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-black uppercase italic drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] tracking-tight">
          New <span className="text-accent-gold">Hair</span> Style
        </h1>
        <p className="mt-3 text-zinc-200 uppercase tracking-[0.4em] text-[10px] font-bold drop-shadow-lg">Luxury Barbering Experience — Treviso</p>
        
        <button 
          onClick={onOpenSidebar}
          className="mt-8 bg-accent-gold text-black font-black uppercase tracking-widest text-xs px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform cursor-pointer"
        >
          💬 Apri Assistente / Prenota
        </button>
      </div>

      {/* SEZIONE MASTER (Prepresi direttamente dal database masters: Marco, Alice, Dany, Monica, Rebecca) */}
      <div className="w-full z-10 mb-28">
        <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-10 text-left border-b border-white/10 pb-4">
          I Nostri Maestri
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-2 md:px-0">
          {masters.length > 0 ? (
            masters.map((master) => (
              <div key={master.id} className="group bg-zinc-950/80 border border-white/10 rounded-2xl p-4 flex flex-col text-left shadow-xl hover:border-accent-gold/55 transition-all">
                
                {/* FOTO MASTER */}
                <div className="w-full aspect-square overflow-hidden rounded-xl bg-zinc-900 relative">
                  <img 
                    src={master.foto_url || `/images/barbers/${master.nome.toLowerCase()}.jpg`} 
                    alt={master.nome} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = '/images/barbers/marco.jpg'; }}
                  />
                </div>
                
                {/* DESCRIZIONE E DETTAGLI DAL DB */}
                <div className="mt-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h4 className="font-black uppercase text-accent-gold text-base tracking-wider">{master.nome}</h4>
                    <p className="text-[11px] text-zinc-400 mt-1.5 leading-snug font-medium line-clamp-3">
                      {master.biografia}
                    </p>
                  </div>
                  
                  <button 
                    onClick={onOpenSidebar}
                    className="mt-4 inline-flex items-center gap-1.5 text-white font-black text-[10px] uppercase tracking-widest group-hover:text-accent-gold transition-colors cursor-pointer pt-2 border-t border-white/5"
                  >
                    <span>Prenota ora</span> 
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="text-zinc-500 text-xs col-span-full text-center py-6">Caricamento maestri in corso...</div>
          )}
        </div>
      </div>

      {/* Box Chi Siamo & Info In Basso */}
      <div className="w-full max-w-5xl bg-zinc-950/90 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-black uppercase tracking-wider text-accent-gold mb-4">Il Nostro Salone</h3>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              Dal 2010, New Hair Style unisce la cura millimetrica del dettaglio e l'autentica arte del grooming maschile e femminile a Treviso. Nella nostra sede in <span className="text-white font-semibold">Via Roma</span> offriamo trattamenti sartoriali per capelli e barba all'interno di un'atmosfera ricercata e rilassante.
            </p>
            <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
              📍 Via Roma 10, 31100 Treviso (TV)
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full justify-end">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=New+Hair+Style+Via+Roma+Treviso" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-accent-gold text-black text-center py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors shadow-lg"
            >
              🗺️ Apri la Mappa
            </a>
            <a 
              href="tel:+39422123456" 
              className="w-full bg-white/5 border border-white/10 text-white text-center py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              📞 Telefona in Salone
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

// Componente Login Admin
const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLoginSuccess(true);
      navigate('/admin/dashboard');
    } else {
      setError('Credenziali non valide.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-black/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl text-black z-10 my-32">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black uppercase text-accent-gold">Area Admin</h2>
        <p className="text-zinc-400 text-[10px] uppercase tracking-widest mt-1">Accesso riservato</p>
      </div>
      {error && <div className="bg-rose-500/20 border border-rose-500 text-rose-300 p-3 rounded-xl text-xs font-bold mb-4 text-center">{error}</div>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4 text-white">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">Username</label>
          <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"/>
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"/>
        </div>
        <button type="submit" className="mt-2 w-full bg-accent-gold text-black font-black uppercase tracking-widest text-xs py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
          Accedi
        </button>
      </form>
    </div>
  );
};

// Componente App Principale
export default function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="relative min-h-screen flex flex-col font-sans text-white overflow-x-hidden bg-black">
        <GlobalBackground />
        
        <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="relative z-10 flex-grow flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={<HomeView onOpenSidebar={() => setIsSidebarOpen(true)} />} />
            <Route path="/services" element={
              <div className="w-full max-w-4xl mx-auto px-4 py-24 animate-in fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-black uppercase tracking-tight text-white">Listino Trattamenti</h2>
                  <div className="w-12 h-1 bg-accent-gold mx-auto mt-3 rounded-full"></div>
                </div>
                <ServiceList />
              </div>
            } />
            <Route path="/booking" element={
              <div className="w-full max-w-[1300px] mx-auto px-4 py-24 animate-in fade-in">
                <div className="flex flex-row items-center justify-center gap-8 md:gap-16">
                  <div className="hidden lg:block"><BarbersList position="left" /></div>
                  <div className="w-full max-w-xl bg-white text-black rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] p-10 z-20">
                    <div className="text-center mb-10">
                      <h2 className="text-2xl font-black uppercase tracking-tight text-black">Il Tuo Appuntamento</h2>
                      <div className="w-10 h-1 bg-accent-gold mx-auto mt-2 rounded-full"></div>
                    </div>
                    <BookingForm />
                  </div>
                  <div className="hidden lg:block"><BarbersList position="right" /></div>
                </div>
              </div>
            } />
            <Route path="/reviews" element={<Recensioni />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminLogin onLoginSuccess={setIsAdminAuthenticated} />} />
            <Route path="/admin/dashboard" element={isAdminAuthenticated ? <AdminDashboard /> : <AdminLogin onLoginSuccess={setIsAdminAuthenticated} />} />
          </Routes>
        </main>

        <BookingSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <footer className="relative z-10 py-6 text-[9px] text-center text-zinc-600 uppercase tracking-[0.5em] border-t border-white/5 mt-auto">
          Treviso — © 2026 New Hair Style
        </footer>
      </div>
    </Router>
  );
}