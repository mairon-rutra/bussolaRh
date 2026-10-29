import React, { useState, useEffect } from 'react';
import { api } from './server/api';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Chat from './components/Chat';
import AdminPanel from './components/AdminPanel';
import Profile from './components/Profile';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.getLoggedUser().then(loggedUser => {
      if (loggedUser) setUser(loggedUser);
    });
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setCurrentView(loggedInUser.isAdmin ? 'admin' : 'chat');
  };

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
    setCurrentView('dashboard');
  };

  return (
    <div>
      {currentView === 'dashboard' && (
        <Dashboard user={user} onNavigate={setCurrentView} onLogout={handleLogout} />
      )}

      {currentView === 'login' && (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          onBackToDashboard={() => setCurrentView('dashboard')} 
        />
      )}

      {currentView === 'chat' && (
        user ? (
          <Chat user={user} onNavigate={setCurrentView} onLogout={handleLogout} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} onBackToDashboard={() => setCurrentView('dashboard')} />
        )
      )}

      {currentView === 'admin' && (
        user?.isAdmin ? (
          <AdminPanel user={user} onNavigate={setCurrentView} onLogout={handleLogout} />
        ) : (
          <Dashboard user={user} onNavigate={setCurrentView} onLogout={handleLogout} />
        )
      )}

      {currentView === 'profile' && (
        user ? (
          <Profile user={user} onNavigate={setCurrentView} onLogout={handleLogout} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} onBackToDashboard={() => setCurrentView('dashboard')} />
        )
      )}
    </div>
  );
}