import React, { useState } from 'react';
import axios from 'axios';

function CreateNote() {
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!content.trim()) {
      setError('Note content cannot be empty. Please type something.');
      return;
    }

    setLoading(true);
    setLink('');
    try {
      const response = await axios.post('/api/notes', { content });
      const { id } = response.data;
      const newLink = `${window.location.origin}/note/${id}`;
      setLink(newLink);
      setContent('');
    } catch (apiError) {
      console.error('Error creating note:', apiError);
      setError('Failed to create note. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>//_CREATE_NEW_MESSAGE</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="50"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder=">>> Type message payload here..."
          required
        ></textarea>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'TRANSMITTING...' : 'INITIATE_TRANSMISSION'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {link && (
        <div className="result-box">
          <h3>//_TRANSMISSION_COMPLETE</h3>
          <p>Secure link generated. Message will self-destruct after single access.</p>
          <input type="text" value={link} readOnly />
        </div>
      )}
    </div>
  );
}

export default CreateNote;