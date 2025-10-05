require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;


const corsOptions = {
  origin: 'https://secure-notes-app-olive.vercel.app',
  optionsSuccessStatus: 200
};
console.log('SERVER CORS OPTIONS:', corsOptions);
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI; 
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema for a Note
const noteSchema = new mongoose.Schema({
  content: { type: String, required: true }
});
const Note = mongoose.model('Note', noteSchema);

// API Route to CREATE a new note
app.post('/api/notes', async (req, res) => {
  try {
    const { content } = req.body;
    const newNote = new Note({ content });
    await newNote.save();
    res.status(201).json({ id: newNote._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating note.' });
  }
});

// API Route to VIEW and DESTROY a note
app.get('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (note) {
      res.status(200).json({ content: note.content });
    } else {
      res.status(404).json({ message: 'Note not found or has been destroyed.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});