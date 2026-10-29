import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { api } from '../server/api';

export default function Chat({ user, onNavigate, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [texto, setTexto] = useState('');

  const loadMessages = async () => {
    const allMsgs = await api.getMessages();
    const userMsgs = allMsgs.filter(m => m.remetenteEmail === user.email || m.destinatarioEmail === user.email);
    setMessages(userMsgs);
  };

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, [user]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    await api.sendMessage(user.email, 'admin@bussolarh.com', texto);
    setTexto('');
    loadMessages();
  };

  return (
    <div>
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} />

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', height: '550px', padding: '20px' }}>
          <h2 style={{ color: 'var(--texto-principal)', marginTop: 0, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
            Chat de Suporte com o Administrador ({user.nome})
          </h2>

          <div style={{ flex: 1, overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.length === 0 ? (
              <p style={{ color: 'var(--texto-suave)', textAlign: 'center', marginTop: '100px' }}>Nenhuma mensagem ainda. Envie uma mensagem para iniciar o atendimento!</p>
            ) : (
              messages.map((m) => {
                const isMe = m.remetenteEmail === user.email;
                return (
                  <div key={m.id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', backgroundColor: isMe ? 'var(--azul-claro)' : 'var(--bg-fundo)', color: isMe ? '#0f172a' : 'var(--texto-principal)', padding: '10px 15px', borderRadius: '8px', maxWidth: '70%' }}>
                    <p style={{ margin: 0, fontSize: '0.95rem' }}>{m.texto}</p>
                  </div>
                );
              })
            )}
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <input type="text" placeholder="Digite sua mensagem..." value={texto} onChange={e => setTexto(e.target.value)} className="input-field" style={{ margin: 0 }} />
            <button type="submit" style={{ padding: '0 20px', backgroundColor: 'var(--vermelho)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}