import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:3000/api/posts', {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setPosts(res.data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post(
      'http://localhost:3000/api/posts',
      { content },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    setContent('');
    fetchPosts();
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:3000/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchPosts();
  };

  const handleEdit = async (id, updatedContent) => {
    await axios.put(
      `http://localhost:3000/api/posts/${id}`,
      { content: updatedContent },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write a announcement..."
          ></textarea>
        </div>
        <button className="btn btn-primary">Post</button>
      </form>

      <hr />

      {posts.map(post => (
        <div className="card my-3" key={post._id}>
          <div className="card-body">
            <p className="card-text">{post.content}</p>
            <small className="text-muted">Posted by {post.author?.username}</small>
            {post.author?.username === user.username && (
              <div className="mt-2">
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => {
                    const newContent = prompt('Edit your post:', post.content);
                    if (newContent) handleEdit(post._id, newContent);
                  }}
                >
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(post._id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
