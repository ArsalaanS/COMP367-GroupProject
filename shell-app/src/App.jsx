import { useState, useEffect } from 'react';
import AuthApp from './components/AuthApp';
import CommunityApp from './components/CommunityApp';

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'LOGIN_SUCCESS') {
        setUser(event.data.user);
        localStorage.setItem('user', JSON.stringify(event.data.user));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: '#f5f5f5' }}>
      <nav style={{ background: '#007bff', color: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>🏘️ Community Engagement Platform</h1>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span>Welcome, <strong>{user.username}</strong> ({user.role})</span>
            <button
              onClick={handleLogout}
              style={{ padding: '6px 14px', background: 'white', color: '#007bff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      <div style={{ padding: '30px' }}>
        {!user ? (
          <div style={{ maxWidth: '500px', margin: '0 auto', background: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <AuthApp />
          </div>
        ) : (
          <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CommunityApp />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;