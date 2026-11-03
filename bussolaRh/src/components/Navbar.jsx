import React, { useState } from 'react';

export default function Navbar({ user, onNavigate, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '15px 50px', backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'sticky', top: 0, zIndex: 900
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} onClick={() => onNavigate('dashboard')}>
          <img src="/mini_logo.png" alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
          <h1 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--texto-principal)' }}>Bússola RH</h1>
        </div>
        
        <button 
          onClick={() => setSidebarOpen(true)}
          style={{ backgroundColor: 'var(--vermelho)', color: '#ffffff', border: 'none', padding: '10px 22px', cursor: 'pointer', fontWeight: 600, borderRadius: '6px', fontSize: '1rem' }}
        >
          ☰ Menu
        </button>
      </header>

      <aside style={{
        position: 'fixed', top: 0, right: sidebarOpen ? '0' : '-320px',
        width: '260px', height: '100vh', backgroundColor: 'var(--bg-card)',
        transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '-5px 0 25px rgba(0, 0, 0, 0.5)', padding: '25px', zIndex: 1000,
        borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <button 
          onClick={() => setSidebarOpen(false)}
          style={{ background: 'none', border: 'none', color: 'var(--texto-suave)', fontSize: '1.5rem', cursor: 'pointer', textAlign: 'right', width: '100%' }}
        >
          ✖
        </button>
        <ul style={{ listStyleType: 'none', padding: 0, marginTop: '30px' }}>
          
          <li style={{ margin: '20px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
            <a href="#dashboard" onClick={(e) => { e.preventDefault(); setSidebarOpen(false); onNavigate('dashboard'); }} style={{ color: 'var(--texto-principal)', textDecoration: 'none', fontSize: '1.1rem', display: 'block' }}>
              Início
            </a>
          </li>

          <li style={{ margin: '20px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
            <a href="#profile" onClick={(e) => { e.preventDefault(); setSidebarOpen(false); onNavigate(user ? 'profile' : 'login'); }} style={{ color: 'var(--texto-principal)', textDecoration: 'none', fontSize: '1.1rem', display: 'block' }}>
             {user ? 'Minha Conta' : 'Login / Cadastrar'}
            </a>
          </li>

          <li style={{ margin: '20px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
            <a href="#chat" onClick={(e) => { e.preventDefault(); setSidebarOpen(false); onNavigate(user ? 'chat' : 'login'); }} style={{ color: 'var(--texto-principal)', textDecoration: 'none', fontSize: '1.1rem', display: 'block' }}>
              Chat
            </a>
          </li>

          {user?.isAdmin && (
            <li style={{ margin: '20px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
              <a href="#admin" onClick={(e) => { e.preventDefault(); setSidebarOpen(false); onNavigate('admin'); }} style={{ color: 'var(--azul-claro)', textDecoration: 'none', fontSize: '1.1rem', display: 'block' }}>
                Painel de Administardor
              </a>
            </li>
          )}

          <li style={{ margin: '20px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
            <a href="#contatos" onClick={(e) => e.preventDefault()} style={{ color: 'var(--texto-principal)', textDecoration: 'none', fontSize: '1.1rem', display: 'block' }}>Contatos</a>
          </li>
          
          <li style={{ margin: '20px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
            <a href="#termos" onClick={(e) => e.preventDefault()} style={{ color: 'var(--texto-principal)', textDecoration: 'none', fontSize: '1.1rem', display: 'block' }}>Termos de Uso</a>
          </li>

          {user && (
            <li style={{ margin: '30px 0 20px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px' }}>
              <a href="#logout" onClick={(e) => { e.preventDefault(); setSidebarOpen(false); onLogout(); }} style={{ color: 'var(--vermelho)', textDecoration: 'none', fontSize: '1.1rem', display: 'block', fontWeight: 'bold' }}>
                Sair da Conta
              </a>
            </li>
          )}

        </ul>
      </aside>
    </>
  );
}