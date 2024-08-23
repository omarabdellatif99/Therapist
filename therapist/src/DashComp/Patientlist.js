import React, { useState, useEffect } from 'react';

const PatientList = ({ setSelectedPatient }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localSelectedPatient, setLocalSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/patients');
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        const data = await response.json();
        console.log('Fetched patients:', data);
        setPatients(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Fetch error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatients();
  }, []);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setLocalSelectedPatient(patient);
  };

  return (
    <div className="patient-container">
      {loading && <p>Loading patients...</p>}
      {error && <p style={{ color: 'red' }}>{`Error: ${error}`}</p>}
      <ul>
        {patients.length > 0 ? (
          patients.map((patient) => (
            <li
              className={`patient ${localSelectedPatient && localSelectedPatient.id === patient.id ? 'selected' : ''}`}
              key={patient.id}
              onClick={() => handlePatientClick(patient)}
            >
              {patient.name}
            </li>
          ))
        ) : (
          <p>No patients available</p>
        )}
      </ul>
    </div>
  );
};

export default PatientList;
