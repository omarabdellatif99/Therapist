import React, { useState } from 'react';
import './headset.css';

const Headset = ({ setSelectedHeadset }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const scanForDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/scan');
      if (!response.ok) {
        throw new Error('Failed to fetch devices');
      }
      const data = await response.json();
      setDevices(data);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeviceClick = (device) => {
    setSelectedHeadset(device.friendlyName || device.ip);
    setSelectedDevice(device.ip);
  };

  return (
    <div>
      <button
        className="NetworkScanner"
        onClick={scanForDevices}
        aria-label="Scan for available headsets"
      >
        Scan for devices
      </button>
      {loading && <p aria-live="polite">Scanning...</p>}
      {error && <p style={{ color: 'red' }} role="alert">{error}</p>}
      <ul>
        {devices.length === 0 && !loading && <p>No devices found. Try scanning again.</p>}
        {devices.map((device) => (
          <li
            className={`detected ${selectedDevice === device.ip ? 'selected' : ''}`}
            key={device.ip}
            onClick={() => handleDeviceClick(device)}
            role="button"
            tabIndex="0"
            aria-label={`Select ${device.friendlyName || device.ip}`}
          >
            <span>{device.friendlyName || device.ip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Headset;
