import React from 'react';
import Navbar from './Navbar';

export default function Profile({ user, onNavigate, onLogout }) {
  if (!user) return null;

  return (
    <div>
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} />

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '16px', padding: '40px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 style={{ color: 'var(--texto-principal)', marginTop: 0, marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '15px' }}>
            👤 Detalhes da Minha Conta
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', color: 'var(--texto-suave)' }}>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: 'var(--azul-claro)' }}>NOME DO USUÁRIO</p>
              <p style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: 'var(--texto-principal)', fontWeight: 'bold' }}>{user.nome}</p>

              <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: 'var(--azul-claro)' }}>E-MAIL</p>
              <p style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: 'var(--texto-principal)', fontWeight: 'bold' }}>{user.email}</p>

              <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: 'var(--azul-claro)' }}>FUNÇÃO</p>
              <p style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: 'var(--texto-principal)', fontWeight: 'bold' }}>{user.funcao}</p>
            </div>

            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: 'var(--azul-claro)' }}>EMPRESA</p>
              <p style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: 'var(--texto-principal)', fontWeight: 'bold' }}>{user.empresa}</p>

              <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: 'var(--azul-claro)' }}>DESCRIÇÃO DA EMPRESA</p>
              <p style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: 'var(--texto-principal)', fontWeight: 'bold' }}>{user.descricao}</p>

              <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: 'var(--azul-claro)' }}>TIPO DE CONTA</p>
              <p style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: user.isAdmin ? 'var(--vermelho)' : 'var(--azul-claro)', fontWeight: 'bold' }}>
                {user.isAdmin ? 'Administrador' : 'Usuário Comum'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}