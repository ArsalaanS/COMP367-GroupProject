import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_HELP_REQUESTS = gql`
  query {
    getHelpRequests {
      id
      author
      description
      location
      isResolved
      volunteers
      createdAt
    }
  }
`;

const CREATE_HELP_REQUEST = gql`
  mutation CreateHelpRequest($author: String!, $description: String!, $location: String) {
    createHelpRequest(author: $author, description: $description, location: $location) {
      id
      description
      location
      isResolved
    }
  }
`;

const VOLUNTEER = gql`
  mutation Volunteer($id: ID!, $userId: String!) {
    volunteerForHelpRequest(id: $id, userId: $userId) {
      id
      volunteers
    }
  }
`;

const UPDATE_HELP_REQUEST = gql`
  mutation UpdateHelpRequest($id: ID!, $isResolved: Boolean) {
    updateHelpRequest(id: $id, isResolved: $isResolved) {
      id
      isResolved
    }
  }
`;

function HelpRequests({ username }) {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [showForm, setShowForm] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_HELP_REQUESTS);
  const [createHelpRequest] = useMutation(CREATE_HELP_REQUEST);
  const [volunteer] = useMutation(VOLUNTEER);
  const [updateHelpRequest] = useMutation(UPDATE_HELP_REQUEST);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHelpRequest({
        variables: { author: username, description, location }
      });
      setDescription('');
      setLocation('');
      setShowForm(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleVolunteer = async (id) => {
    try {
      await volunteer({ variables: { id, userId: username } });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolve = async (id) => {
    try {
      await updateHelpRequest({ variables: { id, isResolved: true } });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading help requests...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Help Requests</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '8px 16px' }}>
          {showForm ? 'Cancel' : '+ New Request'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label>Description</label><br />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Location (optional)</label><br />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <button type="submit" style={{ padding: '8px 16px' }}>Submit Request</button>
        </form>
      )}

      {data?.getHelpRequests.length === 0 && <p>No help requests yet.</p>}

      {data?.getHelpRequests.map(request => (
        <div key={request.id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', opacity: request.isResolved ? 0.6 : 1 }}>
          <span style={{ fontSize: '12px', background: request.isResolved ? '#28a745' : '#dc3545', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>
            {request.isResolved ? 'Resolved' : 'Open'}
          </span>
          <p style={{ margin: '8px 0' }}>{request.description}</p>
          {request.location && <small>📍 {request.location}</small>}
          <p><small>By {request.author} • Volunteers: {request.volunteers?.length || 0}</small></p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {!request.isResolved && (
              <>
                <button onClick={() => handleVolunteer(request.id)} style={{ padding: '4px 12px' }}>
                  Volunteer
                </button>
                {request.author === username && (
                  <button onClick={() => handleResolve(request.id)} style={{ padding: '4px 12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Mark Resolved
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HelpRequests;