import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import CommunityPosts from './components/CommunityPosts';
import HelpRequests from './components/HelpRequests';

function App({ username = 'guest' }) {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <ApolloProvider client={client}>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1>Community Engagement</h1>
        <div style={{ marginBottom: '20px', borderBottom: '2px solid #ddd' }}>
          <button
            onClick={() => setActiveTab('posts')}
            style={{
              padding: '10px 20px',
              marginRight: '5px',
              border: 'none',
              borderBottom: activeTab === 'posts' ? '2px solid #007bff' : 'none',
              background: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'posts' ? 'bold' : 'normal',
              color: activeTab === 'posts' ? '#007bff' : 'black'
            }}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('help')}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderBottom: activeTab === 'help' ? '2px solid #007bff' : 'none',
              background: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'help' ? 'bold' : 'normal',
              color: activeTab === 'help' ? '#007bff' : 'black'
            }}
          >
            Help Requests
          </button>
        </div>

        {activeTab === 'posts' ? (
          <CommunityPosts username={username} />
        ) : (
          <HelpRequests username={username} />
        )}
      </div>
    </ApolloProvider>
  );
}

export default App;