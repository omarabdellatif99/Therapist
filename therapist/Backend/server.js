const express = require('express');
const localDevices = require('local-devices');
const cors = require('cors');
const { insertSession, updateSession, fetchPatients } = require('./database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const deviceNameMapping = {
  '7a:dd:7d:27:be:15': 'iPhone 11 Omar',
  '18:4a:53:0d:da:f6': 'Meta Quest 2'
};

app.get('/scan', async (req, res) => {
  try {
    const devices = await localDevices();
    const enhancedDevices = devices.map(device => ({
      ...device,
      friendlyName: deviceNameMapping[device.mac] || device.name || device.type || 'Unknown device'
    }));
    res.json(enhancedDevices);
  } catch (error) {
    console.error('Error scanning devices:', error);
    res.status(500).send('Error scanning devices');
  }
});

app.post('/session', (req, res) => {
  const { headset, activity, patient } = req.body;
  insertSession(headset, activity, patient, (err, result) => {
    if (err) {
      console.error('Error inserting session:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.put('/session/:id', (req, res) => {
  const { id } = req.params;
  const { column, value } = req.body;
  updateSession(id, column, value, (err, result) => {
    if (err) {
      console.error('Error updating session:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.get('/patients', (req, res) => {
  fetchPatients((err, rows) => {
    if (err) {
      console.error('Error fetching patients:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Fetched patients:', rows); // Debugging line
    res.json(rows);
  });
});



app.get('/test', (req, res) => {
  db.all('SELECT * FROM patients', [], (err, rows) => {
    if (err) {
      console.error('Error fetching from test route:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
