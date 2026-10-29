import React, { useState } from 'react';
import { api } from '../server/api';

export default function Login({ onLoginSuccess, onBackToDashboard }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState('');
  const [funcao, setFuncao] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        if (!email.includes('@')) {
          throw new Error('O e-mail precisa obrigatoriamente conter "@".');
        }
        const newUser = await api.register({ email, senha, empresa, descricao, nome, funcao });
        onLoginSuccess(newUser);
      } else {
        const loggedUser = await api.login(email, senha);
        onLoginSuccess(loggedUser);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ backgroundColor: 'var(--bg-card)', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '450px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <button onClick={onBackToDashboard} style={{ background: 'none', border: 'none', color: 'var(--azul-claro)', cursor: 'pointer', marginBottom: '20px' }}>
          ← Voltar para o Dashboard
        </button>

        <h2 style={{ color: 'var(--texto-principal)', marginTop: 0, marginBottom: '20px' }}>
          {isRegister ? 'Criar Conta de Usuário' : 'Fazer Login'}
        </h2>

        {error && <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: 'var(--vermelho)', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input type="text" placeholder="Nome do Usuário" value={nome} onChange={e => setNome(e.target.value)} required className="input-field" />
              <input type="text" placeholder="Nome da Empresa" value={empresa} onChange={e => setEmpresa(e.target.value)} required className="input-field" />
              <input type="text" placeholder="Descrição da Empresa" value={descricao} onChange={e => setDescricao(e.target.value)} required className="input-field" />
              <input type="text" placeholder="Sua Função na Empresa" value={funcao} onChange={e => setFuncao(e.target.value)} required className="input-field" />
            </>
          )}

          <input type="email" placeholder="E-mail (obrigatório @)" value={email} onChange={e => setEmail(e.target.value)} required className="input-field" />
          <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required className="input-field" />

          <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: 'var(--azul-claro)', color: '#0f172a', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginTop: '10px' }}>
            {isRegister ? 'Cadastrar e Entrar' : 'Entrar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--texto-suave)', fontSize: '0.95rem' }}>
          {isRegister ? 'Já tem uma conta?' : 'Ainda não tem conta?'}{' '}
          <span onClick={() => setIsRegister(!isRegister)} style={{ color: 'var(--azul-claro)', cursor: 'pointer', fontWeight: 'bold' }}>
            {isRegister ? 'Faça login' : 'Cadastre-se'}
          </span>
        </p>
      </div>
    </div>
  );
}