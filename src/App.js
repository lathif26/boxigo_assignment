
import React from 'react';
import ItemsList from './Components/ItemsList';
import Navbar from './Components/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content" style={{ marginLeft: '200px', padding: '20px' }}>
        <ItemsList />
      </div>
    </div>
  );
}

export default App;
