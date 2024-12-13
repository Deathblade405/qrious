// src/App.js
import React, { useState } from 'react';
import QriousScanner from './QriousScanner.js';
import './App.css';

const App = () => {
  const [qrData, setQrData] = useState('');

  return (
    <div className="App">
      <h1>QR Scanner & Generator</h1>
      <div className="qr-generator">
        <h2>Generate QR Code</h2>
        <input
          type="text"
          value={qrData}
          onChange={(e) => setQrData(e.target.value)}
          placeholder="Enter text to encode"
        />
        <QriousScanner qrData={qrData} />
      </div>
    </div>
  );
};

export default App;
