import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainCompstyle.css';
import Headset from './headset';
import Activity from './activities';
import PatientList from './Patientlist';

const Main = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionId, setSessionId] = useState(null);
  const [selectedHeadset, setSelectedHeadset] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');

  const navigate = useNavigate();

  const handleNextStep = async () => {
    try {
      if (currentStep === 1 && selectedHeadset) {
        console.log('Creating session with headset:', selectedHeadset); // Logging for debugging
        const response = await fetch('http://localhost:5000/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ headset: selectedHeadset, activity: '', patient: '' }),
        });
        if (!response.ok) throw new Error('Failed to create session');
        const data = await response.json();
        setSessionId(data.id);
      } else if (currentStep === 2 && selectedActivity && sessionId) {
        console.log('Updating session with activity:', selectedActivity); // Logging for debugging
        const response = await fetch(`http://localhost:5000/session/${sessionId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ column: 'activity', value: selectedActivity }),
        });
        if (!response.ok) throw new Error('Failed to update activity');
      } else if (currentStep === 3 && selectedPatient && sessionId) {
        console.log('Updating session with patient:', selectedPatient); // Logging for debugging
        const response = await fetch(`http://localhost:5000/session/${sessionId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ column: 'patient', value: selectedPatient }),
        });
        if (!response.ok) throw new Error('Failed to update patient');
      }

      setCurrentStep(prevStep => (prevStep >= 3 ? 1 : prevStep + 1));
    } catch (error) {
      console.error('Error in step:', currentStep, error);
    }
  };

  const isButtonDisabled = (currentStep === 1 && !selectedHeadset) ||
                            (currentStep === 2 && !selectedActivity) ||
                            (currentStep === 3 && !selectedPatient);

  const buttonStyle = {
    backgroundColor: isButtonDisabled ? 'grey' : '#14A6BF',
    pointerEvents: isButtonDisabled ? 'none' : 'auto',
  };

  const handleButtonClick = () => {
    if (currentStep === 3) {
      navigate('/Session');
    } else {
      handleNextStep();
    }
  };

  return (
    <div className='container'>
      <div className='Proceed_stps'>
        <ul className='proceed'>
          <li style={{ color: currentStep === 1 ? '#14A6BF' : 'Grey', opacity: currentStep === 1 ? '100%' : '35%' }}>
            <sup>1 </sup>Choose available Headset
          </li>
          <li style={{ color: currentStep === 2 ? '#14A6BF' : 'Grey', opacity: currentStep === 2 ? '100%' : '35%' }}>
            <sup>2 </sup>Choose activity
          </li>
          <li style={{ color: currentStep === 3 ? '#14A6BF' : 'Grey', opacity: currentStep === 3 ? '100%' : '35%' }}>
            <sup>3 </sup>Choose patient
          </li>
        </ul>
        {currentStep === 1 && (
          <div className='comps'>
            <Headset setSelectedHeadset={setSelectedHeadset} />
          </div>
        )}
        {currentStep === 2 && (
          <div className='comps'>
            <Activity setSelectedActivity={setSelectedActivity} />
          </div>
        )}
        {currentStep === 3 && (
          <div className='comps'>
            <PatientList setSelectedPatient={setSelectedPatient} />
          </div>
        )}
        <button
          className='nxt'
          onClick={handleButtonClick}
          style={buttonStyle}
          disabled={isButtonDisabled}
        >
          {currentStep === 3 ? 'Start Session' : 'Next step'}
        </button>
      </div>
    </div>
  );
};

export default Main;
