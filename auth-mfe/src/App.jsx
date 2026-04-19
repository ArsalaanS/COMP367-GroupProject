import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [showSignup, setShowSignup] = useState(false);

  return (
    <ApolloProvider client={client}>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1>Community Engagement - Auth</h1>
        {user ? (
          <div>
            <p>Welcome, <strong>{user.username}</strong>! ({user.role})</p>
            <Logout onLogout={() => setUser(null)} />
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '10px' }}>
              <button
                onClick={() => setShowSignup(false)}
                style={{ marginRight: '10px', padding: '8px 16px' }}
              >
                Login
              </button>
              <button
                onClick={() => setShowSignup(true)}
                style={{ padding: '8px 16px' }}
              >
                Sign Up
              </button>
            </div>
            {showSignup ? (
              <Signup onSignupSuccess={(u) => setUser(u)} />
            ) : (
              <Login onLoginSuccess={(u) => setUser(u)} />
            )}
          </div>
        )}
      </div>
    </ApolloProvider>
  );
}

export default App;