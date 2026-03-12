import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users, Scissors, Calendar, Home } from 'lucide-react';
import api from './api';
import './App.css'; // Assicurati di importare il file CSS per gli stili

// Importa le immagini di sfondo
import sfondo from './assets/images/sfondo.jpg'; // Sostituisci con l'estensione corretta se diversa (.png, etc.)
import sfondo2 from './assets/images/sfondo2.jpg'; // Sostituisci con l'estensione corretta se diversa

// Componente per il Carosello
const Carousel = () => {
  const images = [sfondo, sfondo2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia immagine ogni 5 secondi

    return () => clearInterval(intervalId); // Pulisci l'intervallo allo smontaggio del componente
  }, [images.length]);

  return (
    <div className="carousel-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Sfondo ${index + 1}`}
          className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
        />
      ))}
      {/* Aggiungi controlli (frecce, punti) se desideri */}
    </div>
  );
};

const BarbersList = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    api.get('/barbers')
      .then(response => {
        setBarbers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Errore nel caricamento dei barbieri:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-10">Caricamento in corso...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
        <Scissors className="text-black" /> I Nostri Professionisti
      </h2>
      
      {barbers.length === 0 ? (
        <p className="text-center text-gray-500">Nessun barbiere trovato nel database.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {barbers.map(barber => (
            <div key={barber.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 border border-gray-200">
              <div className="bg-black h-32 flex items-center justify-center">
                <Users size={48} className="text-white opacity-20" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wider">{barber.name}</h3>
                <p className="text-gray-500 mb-4">Master Barber</p>
                <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
                  VEDI PROFILO
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// App Principale con Navigazione
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-black text-white p-4 flex gap-6 shadow-md">
          <Link to="/" className="flex items-center gap-2"><Home size={20}/> Home</Link>
          <Link to="/barbers" className="flex items-center gap-2"><Users size={20}/> Barbieri</Link>
          <Link to="/booking" className="flex items-center gap-2"><Calendar size={20}/> Prenota</Link>
        </nav>

        {/* Rotte */}
        <main className="container mx-auto mt-6">
          <Routes>
            <Route path="/" element={
              <div>
                <Carousel />
                <h1 className="text-3xl p-4 text-center mt-8">Benvenuto al New Hair Style!</h1>
                <p className="text-xl p-4 text-center">Il tuo stile, la nostra passione. Prenota il tuo appuntamento oggi stesso!</p>
              </div>
            } />
            <Route path="/barbers" element={<BarbersList />} />
            <Route path="/booking" element={<h1 className="text-3xl p-4">Pagina Prenotazioni (Work in Progress)</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;