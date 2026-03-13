import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Users, Calendar } from 'lucide-react';
import './App.css';


import BarbersList from './components/BarbersList';
import BookingForm from './components/BookingForm';


import sfondo from './assets/images/sfondo.jpg';
import sfondo2 from './assets/images/sfondo2.jpg';

// --- COMPONENTE CAROSELLO ---
const Carousel = () => {
  const images = [sfondo, sfondo2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="carousel-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

// --- COMPONENTE PRINCIPALE ---
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black">
        
        {/* Navbar */}
        <nav className="bg-white/80 backdrop-blur-md p-5 sticky top-0 z-50 border-b border-gray-100">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-black uppercase italic tracking-tighter">
              New Hair Style
            </Link>
            <div className="flex gap-8 items-center font-bold text-sm uppercase">
              <Link to="/" className="hover:opacity-50 transition-opacity flex items-center gap-1">
                <Home size={16}/> Home
              </Link>
              <Link to="/barbers" className="hover:opacity-50 transition-opacity flex items-center gap-1">
                <Users size={16}/> Barbieri
              </Link>
              <Link to="/booking" className="bg-black text-white px-6 py-2 rounded-full hover:bg-zinc-800 transition-all flex items-center gap-1">
                <Calendar size={16}/> Prenota
              </Link>
            </div>
          </div>
        </nav>

        {/* Gestione delle Rotte */}
        <main>
          <Routes>
            {/* 1. Home Page */}
            <Route path="/" element={
              <div className="relative">
                <Carousel />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/50 px-4">
                  <h1 className="text-6xl md:text-9xl font-black uppercase mb-4 tracking-tighter">
                    New Hair Style
                  </h1>
                  <p className="text-xl md:text-3xl font-light mb-10 max-w-2xl">
                    L'eccellenza del taglio a Treviso.
                  </p>
                  <Link to="/booking" className="bg-white text-black px-12 py-5 font-black rounded-full hover:scale-110 transition-transform shadow-2xl uppercase">
                    Fissa un appuntamento
                  </Link>
                </div>
              </div>
            } />

            {/* 2. Pagina Barbieri - */}
            <Route path="/barbers" element={<BarbersList />} />

            {/* 3. Pagina Prenotazione ---- */}
            <Route path="/booking" element={<BookingForm />} />
          </Routes>
        </main>

        <footer className="bg-black text-white py-10 text-center mt-auto">
          <p className="text-gray-500 text-sm">© 2026 New Hair Style. Tutti i diritti riservati.</p>
        </footer>
      </div>
    </Router>
  );
}