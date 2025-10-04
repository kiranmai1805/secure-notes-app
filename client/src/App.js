import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateNote from './CreateNote';
import ViewNote from './ViewNote';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>//_SECURE_COMMS</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<CreateNote />} />
            <Route path="/note/:id" element={<ViewNote />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;