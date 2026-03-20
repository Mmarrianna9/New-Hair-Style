import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Componenti
import BarbersList from './components/BarbersList';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';

// Asset
import sfondo from './assets/images/sfondo.jpg';
import sfondo2 from './assets/images/sfondo2.jpg';

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
    <div className="fixed inset-0 z-0 w-full h-full">
      {images.map((img, i) => (
        <img 
          key={i} 
          src={img} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentImageIndex ? 'opacity-100' : 'opacity-0'}`} 
          alt="background" 
        />
      ))}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen flex flex-col font-sans text-white overflow-x-hidden">
        <GlobalBackground />
        
        {/* NAVBAR RIPRISTINATA E COMPLETA */}
        <nav className="fixed top-0 left-0 right-0 h-14 z-50 bg-black/60 backdrop-blur-md border-b border-white/5 flex items-center px-6 justify-between">
          <Link to="/" className="text-lg font-black uppercase tracking-tighter text-accent-gold hover:scale-105 transition-transform">
            NEW HAIR STYLE
          </Link>
          
          <div className="flex gap-6 items-center">
            {/* Tasto Home riaggiunto */}
            <Link to="/" className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            
            <Link to="/booking" className="bg-accent-gold text-black px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
              Prenota
            </Link>
            
            <Link to="/admin" className="text-zinc-400 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors">
              Admin
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10 flex-grow pt-14 flex items-center justify-center">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={
              <div className="text-center animate-in fade-in zoom-in duration-1000">
                <h1 className="text-6xl md:text-8xl font-black uppercase italic drop-shadow-2xl">
                  New <span className="text-accent-gold">Hair</span> Style
                </h1>
                <p className="mt-4 text-zinc-400 uppercase tracking-[0.5em] text-[10px] font-bold">Luxury Barbering Experience</p>
              </div>
            } />
            
            {/* Booking Page con Ali Laterali (3 a sinistra, 2 a destra) */}
            <Route path="/booking" element={
              <div className="w-full max-w-[1300px] mx-auto px-4 py-10 animate-in fade-in duration-700">
                <div className="flex flex-row items-center justify-center gap-8 md:gap-16">
                  
                  {/* Ala Sinistra (3 Barbieri) */}
                  <div className="hidden lg:block">
                    <BarbersList position="left" />
                  </div>

                  {/* Centro: Dashboard */}
                  <div className="w-full max-w-xl bg-white text-black rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden border-t-[8px] border-accent-gold p-8 md:p-10 z-20">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-black uppercase tracking-tight text-black">Il Tuo Appuntamento</h2>
                      <div className="w-10 h-1 bg-accent-gold mx-auto mt-2 rounded-full"></div>
                    </div>
                    <BookingForm />
                  </div>

                  {/* Ala Destra (2 Barbieri) */}
                  <div className="hidden lg:block">
                    <BarbersList position="right" />
                  </div>

                </div>
              </div>
            } />

            {/* Area Admin */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <footer className="relative z-10 py-4 text-[9px] text-center text-zinc-500 uppercase tracking-[0.5em]">
          Treviso — © 2026 New Hair Style
        </footer>
      </div>
    </Router>
  );
}