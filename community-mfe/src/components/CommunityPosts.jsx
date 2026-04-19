import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_POSTS = gql`
  query {
    getCommunityPosts {
      id
      author
      title
      content
      category
      createdAt
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($author: String!, $title: String!, $content: String!, $category: String!) {
    createCommunityPost(author: $author, title: $title, content: $content, category: $category) {
      id
      title
      content
      category
      author
    }
  }
`;

function CommunityPosts({ username }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('news');
  const [showForm, setShowForm] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_POSTS);
  const [createPost] = useMutation(CREATE_POST);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({
        variables: { author: username, title, content, category }
      });
      setTitle('');
      setContent('');
      setCategory('news');
      setShowForm(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Community Posts</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '8px 16px' }}>
          {showForm ? 'Cancel' : '+ New Post'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label>Title</label><br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Content</label><br />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Category</label><br />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="news">News</option>
              <option value="discussion">Discussion</option>
            </select>
          </div>
          <button type="submit" style={{ padding: '8px 16px' }}>Submit Post</button>
        </form>
      )}

      {data?.getCommunityPosts.length === 0 && <p>No posts yet. Be the first to post!</p>}

      {data?.getCommunityPosts.map(post => (
        <div key={post.id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <span style={{ fontSize: '12px', background: post.category === 'news' ? '#007bff' : '#28a745', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>
            {post.category}
          </span>
          <h3 style={{ margin: '8px 0' }}>{post.title}</h3>
          <p>{post.content}</p>
          <small>By {post.author} • {new Date(post.createdAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}

export default CommunityPosts;