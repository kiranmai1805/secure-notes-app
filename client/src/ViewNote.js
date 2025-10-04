import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewNote() {
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const API_URL = process.env.REACT_APP_API_URL;
      axios.get(`${API_URL}/api/notes/${id}`)
        .then(response => {
          setNote(response.data.content);
          setLoading(false);
        })
        .catch(err => {
          setError(err.response.data.message || 'Error fetching note.');
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div>
      {loading ? (
        <p className="loading-message">//_DECRYPTING_MESSAGE...</p>
      ) : (
        <>
          {note && (
            <div className="note-view">
              <h2>//_SECURE_MESSAGE_RETRIEVED</h2>
              <pre>{note}</pre>
              <p className="destroyed-message">//_MESSAGE_DESTROYED_ON_READ_PROTOCOL_ENGAGED</p>
            </div>
          )}
          {error && (
            <div className="error-box">
              <h2>//_ACCESS_DENIED_OR_DESTRUCTED</h2>
              <p className="error">{error}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ViewNote;