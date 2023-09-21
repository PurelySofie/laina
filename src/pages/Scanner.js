import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './Scanner.css';


function Scanner() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 300,
        height: 300,
      },
      fps: 5,
    });

    let isScanning = true;

    scanner.render(onScan);

    function onScan(qrCodeMessage) {
      if (isScanning) {
        scanner.clear();
        setScanResult(qrCodeMessage);
        isScanning = false;
        window.location.href = qrCodeMessage;
      }
    }


    return () => {
      isScanning = false;
      scanner.clear();
    };
  }, []);


  return (
    <div className="App">
      {scanResult ? (
        <div>
          <p>Success: <a href={scanResult}>{scanResult}</a></p>
        </div>
      ) : (
        <div>
          <div id="reader" className="center-scanner"></div>
          
        </div>
      )}
    </div>
  );
}

export default Scanner;