import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Components/home/home';
import AddStudent from './Components/addemp';
import Download from './Components/download/download';
import Upload from './Components/Upload/Upload'

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/addemp">
            <button>Add Users</button>
          </Link>
          <Link to='/upload'>
            <button>Upload Employee</button>
          </Link>
          <Link to='/download'>
            <button>Download</button>
          </Link>
        </nav>

        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/addemp" element={<AddStudent />} />
          <Route path="/download" element={<Download />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
