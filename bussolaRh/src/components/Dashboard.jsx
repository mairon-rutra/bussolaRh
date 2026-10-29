import React from 'react';
import Navbar from './Navbar';

export default function Dashboard({ user, onNavigate, onLogout }) {
  return (
    <div>
      <Navbar user={user} onNavigate={onNavigate} onLogout={onLogout} />

      <main style={{ padding: '60px 50px', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '50px', flexWrap: 'wrap',
          backgroundColor: 'var(--bg-card)', padding: '40px', borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontSize: '2.4rem', marginTop: 0, color: 'var(--texto-principal)', lineHeight: 1.2 }}>Transformando sua gestão empresarial</h2>
            <p style={{ lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--texto-suave)' }}>
              Este é um texto de exemplo. Aqui vai entrar a descrição da sua empresa. Você pode explicar os benefícios dos seus serviços e os motivos que fazem vocês serem a melhor escolha para o cliente.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '35px' }}>
              <button 
                onClick={() => onNavigate(user ? 'chat' : 'login')}
                style={{ padding: '16px 24px', textAlign: 'center', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', border: 'none', fontSize: '1rem', backgroundColor: 'var(--azul-claro)', color: '#0f172a' }}
              >
                Entrar em contato para consulta
              </button>
              <button 
                onClick={() => alert('Buscando soluções...')}
                style={{ padding: '16px 24px', textAlign: 'center', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', border: 'none', fontSize: '1rem', backgroundColor: 'var(--vermelho)', color: '#ffffff' }}
              >
                Buscar soluções
              </button>
              <button 
                onClick={() => onNavigate(user ? 'chat' : 'login')}
                style={{ padding: '16px 24px', textAlign: 'center', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', background: 'transparent', color: 'var(--azul-claro)', border: '2px solid var(--azul-claro)' }}
              >
                ✨ Utilizar a Inteligência Artificial
              </button>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
            <img src="/logo.jpeg" alt="Foto do Arrocha" style={{ maxWidth: '100%', borderRadius: '12px' }} />
          </div>
        </section>

        <section style={{ marginTop: '80px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '40px', color: 'var(--texto-principal)' }}>Nossos Planos de Contrato</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '35px 25px', width: '270px' }}>
              <h3 style={{ color: 'var(--vermelho)', fontSize: '1.6rem', marginTop: 0 }}>Plano Inicial</h3>
              <p style={{ color: 'var(--texto-suave)', lineHeight: 1.5 }}>Ideal para empresas que estão começando e precisam do básico para alavancar.</p>
              <div style={{ color: 'var(--azul-claro)', fontSize: '1.8rem', fontWeight: 'bold', marginTop: '20px' }}>R$ 99<span style={{ fontSize: '1rem' }}>/mês</span></div>
            </div>
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '35px 25px', width: '270px' }}>
              <h3 style={{ color: 'var(--vermelho)', fontSize: '1.6rem', marginTop: 0 }}>Plano Master</h3>
              <p style={{ color: 'var(--texto-suave)', lineHeight: 1.5 }}>O pacote completo com direito a suporte total, uso livre da IA e muito mais encanto.</p>
              <div style={{ color: 'var(--azul-claro)', fontSize: '1.8rem', fontWeight: 'bold', marginTop: '20px' }}>R$ 299<span style={{ fontSize: '1rem' }}>/mês</span></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}