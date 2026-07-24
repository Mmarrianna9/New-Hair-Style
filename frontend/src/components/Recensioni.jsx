export default function Recensioni() {
  return (
    <section id="recensioni" className="relative w-full min-h-screen bg-zinc-900 text-white flex flex-col justify-between">
      
      {/* Metà pagina superiore con immagine/sfondo */}
      <div className="w-full h-[50vh] relative overflow-hidden flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/sitoweb/images/moderno1.jpg')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl font-bold uppercase tracking-wider mb-2">Cosa dicono di noi</h2>
          <p className="text-zinc-300 text-sm tracking-widest">La fiducia dei nostri clienti a Treviso</p>
        </div>
      </div>

      {/* Sezione inferiore con le recensioni */}
      <div className="w-full py-12 px-6 bg-zinc-950 flex-1">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 shadow-lg">
            <div className="text-amber-500 mb-2">★★★★★</div>
            <p className="text-zinc-300 text-sm italic mb-4">"Professionalità e competenza straordinarie. Frequento il salone da anni e non deludono mai. Taglio perfetto e curato nei minimi dettagli."</p>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">- Marco B.</span>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 shadow-lg">
            <div className="text-amber-500 mb-2">★★★★★</div>
            <p className="text-zinc-300 text-sm italic mb-4">"Ambiente accogliente e pulito. Oltre vent'anni di esperienza si vedono tutti nella precisione del servizio e nella consulenza d'immagine."</p>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">- Luca R.</span>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 shadow-lg">
            <div className="text-amber-500 mb-2">★★★★★</div>
            <p className="text-zinc-300 text-sm italic mb-4">"Servizio impeccabile per la barba e capelli. Staff gentile e sempre aggiornato sulle ultime tendenze. Consigliatissimo a Treviso!"</p>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">- Andrea P.</span>
          </div>

        </div>
      </div>

    </section>
  );
}