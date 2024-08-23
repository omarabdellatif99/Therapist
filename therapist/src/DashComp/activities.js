import React, { useState, useEffect } from 'react';
import './activitystyle.css';

const Activity = ({ setSelectedActivity }) => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [selectedScene, setSelectedScene] = useState(null);

  useEffect(() => {
    const handleLoadActivities = async () => {
      try {
        const response = await fetch('/scene_list.json');
        if (!response.ok) {
          throw new Error('Failed to load scene list');
        }
        
        const data = await response.json();
        console.log('Loaded activities:', data); // Debugging line
        setActivities(data.scenes); // assuming the JSON structure is { scenes: [...] }
      } catch (error) {
        console.error('Error loading activities:', error); // Debugging line
        setError(error.message);
      }
    };

    handleLoadActivities();
  }, []);

  const handleSceneClick = (scene) => {
    setSelectedActivity(scene);
    setSelectedScene(scene);
  };

  return (
    <div className="activity-container">
      <div className="activity-details">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="scene-buttons">
          {activities.map((scene, index) => (
            <button
              key={index}
              onClick={() => handleSceneClick(scene)}
              className={`scene-button detected ${selectedScene === scene ? 'selected' : ''}`}
            >
              {scene}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
