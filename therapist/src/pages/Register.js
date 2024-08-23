import React, { useState, useEffect } from "react";

const ControlPage = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [scenes, setScenes] = useState([]);

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

  const fetchScenes = async () => {
    const downloadsFolderPath = "C:/Users/YourUsername/Downloads"; // Adjust this path as necessary
    const fileName = `${downloadsFolderPath}/Scenes.json`;

    try {
      const response = await fetch(fileName);
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
      <button onClick={() => handleButtonClick("red")}>Red</button>
      <button onClick={() => handleButtonClick("green")}>Green</button>
      <button onClick={() => handleButtonClick("blue")}>Blue</button>
      {selectedColor && <p>Selected Color: {selectedColor}</p>}
      <button onClick={fetchScenes}>Discover Scenes</button>
      <h2>Scenes List</h2>
      <ul>
        {scenes.map((scene, index) => (
          <li key={index}>{scene}</li>
        ))}
      </ul>
    </div>
  );
};

export default ControlPage;
