import React, { useState } from "react";
import axios from "axios";

const chatApi = axios.create({
  baseURL: "http://localhost:8000/api"
});

export default function BookingSidebar({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Ciao! Sono il tuo assistente virtuale di New Hair Style. Come posso aiutarti oggi?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const sendMessageToBackend = async (textToSend) => {
    if (!textToSend || !textToSend.trim() || loading) return;

    setMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    setInput("");
    setLoading(true);
    setShowPicker(false);

    const loggedUser = localStorage.getItem("username") || null;

    try {
      const response = await chatApi.post("/chat", { 
        message: textToSend,
        username: loggedUser 
      });
      const botReply = response.data.reply || "Ho ricevuto la tua richiesta.";
      const serverShowPicker = response.data.show_picker || false;

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      setShowPicker(serverShowPicker);
    } catch (err) {
      console.error("Errore chat:", err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Mi dispiace, si è verificato un errore di connessione con il server." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessageToBackend(input);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 animate-in fade-in">
      <div className="w-full max-w-md h-full bg-zinc-950 border-l border-white/10 shadow-2xl flex flex-col justify-between text-white p-6 relative">
        
        {/* Intestazione Sidebar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div>
            <h3 className="font-black uppercase tracking-wider text-accent-gold text-base">Assistente Virtuale</h3>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">New Hair Style — Treviso</p>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>

        {/* Corpo Chat */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 mb-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                msg.sender === "user" 
                  ? "ml-auto bg-accent-gold text-black font-medium rounded-br-none" 
                  : "mr-auto bg-zinc-900 border border-white/10 text-zinc-200 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="mr-auto bg-zinc-900 border border-white/10 text-zinc-400 p-3 rounded-2xl text-xs rounded-bl-none animate-pulse">
              Sto scrivendo...
            </div>
          )}
        </div>

        {/* Selettore Calendario / Ora a comparsa */}
        {showPicker && (
          <div className="mb-3 p-3 bg-zinc-900 border border-amber-400/50 rounded-xl flex flex-col gap-2">
            <label className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">Seleziona Data e Ora:</label>
            <input 
              type="datetime-local" 
              onChange={(e) => {
                if (e.target.value) {
                  const formatted = e.target.value.replace("T", " ");
                  sendMessageToBackend(formatted);
                }
              }}
              className="bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
            />
          </div>
        )}

        {/* Input Invio Messaggio */}
        <form onSubmit={handleFormSubmit} className="flex gap-2 pt-2 border-t border-white/10 bg-zinc-950">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrivi un messaggio..." 
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-accent-gold text-black px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider hover:scale-105 transition-transform cursor-pointer disabled:opacity-50"
          >
            Invia
          </button>
        </form>

      </div>
    </div>
  );
}