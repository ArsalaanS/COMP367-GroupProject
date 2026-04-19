import { useMutation, gql } from '@apollo/client';

const LOGOUT = gql`
  mutation {
    logout
  }
`;

function Logout({ onLogout }) {
  const [logout, { loading }] = useMutation(LOGOUT);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      onLogout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <button onClick={handleLogout} disabled={loading} style={{ padding: '8px 16px' }}>
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
}

export default Logout;