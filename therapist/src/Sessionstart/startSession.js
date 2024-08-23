import React, { useState, useEffect } from 'react';
import './Sessionstyle.css';

const StartSession = () => {
    const [videoUrl, setVideoUrl] = useState(''); // State for video URL
    const [notes, setNotes] = useState(''); // State for notes
    const [selectedScene, setSelectedScene] = useState(null); // State for selected scene
    const [scenes, setScenes] = useState([]); // State for scenes list
    const [selectedColor, setSelectedColor] = useState(null); // State for selected color

    // Function to handle changes in the video URL
    const handleVideoUrlChange = (event) => {
        setVideoUrl(event.target.value);
    };

    // Function to handle changes in the notes
    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    // Function to start streaming the video
    const handlePlay = () => {
        // Logic to start streaming the video
    };

    // Function to pause the video streaming
    const handlePause = () => {
        // Logic to pause the video streaming
    };

    // Function to stop the video streaming
    const handleStop = () => {
        // Logic to stop the video streaming
    };

    // Function to send JSON data to control Unity scene
    const handleUnityControl = async (sceneName) => {
        setSelectedScene(sceneName);
        const json = { scene: sceneName, videoUrl, notes, color: selectedColor };
        const blob = new Blob([JSON.stringify(json, null, 2)], {
            type: "application/json",
        });
        const timestamp = Date.now();
        const fileName = `scene_${timestamp}.json`;
        downloadFile(blob, fileName);
    };

    // Function to handle color button click
    const handleButtonClick = (color) => {
        setSelectedColor(color);
        const json = { color };
        const blob = new Blob([JSON.stringify(json, null, 2)], {
            type: "application/json",
        });
        const timestamp = Date.now();
        const fileName = `color_${timestamp}.json`;
        downloadFile(blob, fileName);
    };

    // Function to download JSON file
    const downloadFile = (blob, fileName) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    // Function to fetch scenes from the server
    const fetchScenes = async () => {
        try {
            const response = await fetch('/scene_list.json');
            if (!response.ok) {
                throw new Error('Failed to fetch scenes');
            }
            const data = await response.json();
            setScenes(data.scenes); // assuming the response is { scenes: [...] }
        } catch (error) {
            console.error("Error fetching scenes:", error);
        }
    };

    useEffect(() => {
        fetchScenes();
    }, []);

    return (
        <div>
            <div className="video-container">
                {/* Video Player with Unique UI */}
                <video controls>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="controls">
                {/* Buttons for controlling video playback */}
                <button onClick={handlePlay}>Play</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleStop}>Stop</button>
                {/* Buttons for controlling color */}
                <button onClick={() => handleButtonClick("red")}>Red</button>
                <button onClick={() => handleButtonClick("green")}>Green</button>
                <button onClick={() => handleButtonClick("blue")}>Blue</button>
                {selectedColor && <p>Selected Color: {selectedColor}</p>}
                {/* Button to discover scenes */}
                <button onClick={fetchScenes}>Discover Scenes</button>
            </div>
            <div className='Notes'>
                <textarea
                    value={notes}
                    onChange={handleNotesChange}
                    placeholder="Take notes..."
                />
            </div>
            
        </div>
    );
};

export default StartSession;
