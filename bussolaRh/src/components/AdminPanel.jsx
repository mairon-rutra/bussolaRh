import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { api } from '../server/api';

export default function AdminPanel({ user, onNavigate, onLogout }) {
  const [usersList, setUsersList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [texto, setTexto] = useState('');

  const loadData = async () => {
    const users = await api.getUsersWithoutPassword();
    setUsersList(users.filter(u => u.email !== user.email));
    const allMsgs = await api.getMessages();
    setMessages(allMsgs);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!texto.trim() || !selectedUserEmail) return;
    await api.sendMessage(user.email, selectedUserEmail, texto);
    setTexto('');
    loadData();
  };

  const activeMessages = selectedUserEmail 
    ? messages.filter(m => m.remetenteEmail === selectedUserEmail || m.destinatarioEmail === selectedUserEmail)
    : [];

  return (
    <div>
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} />

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
        <h2 style={{ color: 'var(--texto-principal)' }}>Painel do Administrador</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', height: '600px' }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)', overflowY: 'auto' }}>
            <h3 style={{ color: 'var(--azul-claro)', marginTop: 0 }}>Lista de Usuários Cadastrados</h3>
            {usersList.length === 0 ? (
              <p style={{ color: 'var(--texto-suave)' }}>Nenhum usuário cadastrado.</p>
            ) : (
              usersList.map(u => (
                <div 
                  key={u.id} 
                  onClick={() => setSelectedUserEmail(u.email)}
                  style={{ 
                    padding: '12px', marginBottom: '10px', borderRadius: '8px', cursor: 'pointer',
                    backgroundColor: selectedUserEmail === u.email ? 'var(--bg-fundo)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{u.nome} ({u.funcao})</p>
                  <p style={{ margin: '0 0 3px 0', fontSize: '0.85rem', color: 'var(--azul-claro)' }}>Empresa: {u.empresa}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--texto-suave)' }}>{u.email}</p>
                </div>
              ))
            )}
          </div>

          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: 'var(--azul-claro)', marginTop: 0, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
              {selectedUserEmail ? `Conversando com: ${selectedUserEmail}` : 'Selecione um usuário ao lado'}
            </h3>

            <div style={{ flex: 1, overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {!selectedUserEmail ? (
                <p style={{ color: 'var(--texto-suave)', textAlign: 'center', marginTop: '100px' }}>Clique em um usuário na lista à esquerda.</p>
              ) : activeMessages.length === 0 ? (
                <p style={{ color: 'var(--texto-suave)', textAlign: 'center', marginTop: '100px' }}>Nenhuma mensagem trocada ainda.</p>
              ) : (
                activeMessages.map(m => {
                  const isMe = m.remetenteEmail === user.email;
                  return (
                    <div key={m.id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', backgroundColor: isMe ? 'var(--azul-claro)' : 'var(--bg-fundo)', color: isMe ? '#0f172a' : 'var(--texto-principal)', padding: '10px 15px', borderRadius: '8px', maxWidth: '70%' }}>
                      <p style={{ margin: 0, fontSize: '0.95rem' }}>{m.texto}</p>
                    </div>
                  );
                })
              )}
            </div>

            {selectedUserEmail && (
              <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <input type="text" placeholder="Responder como ADM..." value={texto} onChange={e => setTexto(e.target.value)} className="input-field" style={{ margin: 0 }} />
                <button type="submit" style={{ padding: '0 20px', backgroundColor: 'var(--vermelho)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Enviar</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}