// Install the required library
// npm install html5-qrcode

import React, { useRef, useState } from 'react';
import QRious from 'qrious';
import { Html5Qrcode } from 'html5-qrcode';
import './App.css';

const App = () => {
  const [qrData, setQrData] = useState('');
  const [decodedData, setDecodedData] = useState('');
  const canvasRef = useRef(null);

  // Generate QR Code
  const generateQRCode = () => {
    new QRious({
      element: canvasRef.current,
      value: qrData,
      size: 200,
    });
    console.log('QR Code Generated:', qrData);
  };

  // Start Webcam and Scan QR Code
  const startWebcamScan = () => {
    const html5QrcodeScanner = new Html5Qrcode("reader");

    html5QrcodeScanner
      .start(
        { facingMode: "environment" }, // Rear camera
        {
          fps: 10, // Frame-per-second for scanning
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          setDecodedData(decodedText);
          console.log("Decoded Text:", decodedText);
          html5QrcodeScanner.stop(); // Stop scanning once a QR code is found
        },
        (errorMessage) => {
          console.error("QR Scan Error:", errorMessage);
        }
      )
      .catch((err) => {
        console.error("Unable to start scanning:", err);
      });
  };

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
        <button onClick={generateQRCode}>Generate</button>
        <canvas ref={canvasRef} />
      </div>

      <div className="qr-decoder">
        <h2>Scan QR Code with Webcam</h2>
        <button onClick={startWebcamScan}>Start Webcam</button>
        <div id="reader" style={{ width: "300px", margin: "20px auto" }}></div>
        {decodedData && <p>Decoded Data: {decodedData}</p>}
      </div>
    </div>
  );
};

export default App;
