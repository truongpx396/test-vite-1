// server/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the cors package

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const dbFilePath = path.join(__dirname, 'db.json');

// Helper function to read and write to the db.json file
const readData = () => {
  if (!fs.existsSync(dbFilePath)) {
    return { items: [] };
  }
  const data = fs.readFileSync(dbFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = (data) => fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));

// Get all items
app.get('/items', (req, res) => {
  const data = readData();
  res.json(data.items);
});

// Add a new item
app.post('/items', (req, res) => {
  const data = readData();
  const newItem = { id: Date.now(), title: req.body.title };
  data.items.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

// Update an item
app.put('/items/:id', (req, res) => {
  const data = readData();
  const itemIndex = data.items.findIndex((item) => item.id === parseInt(req.params.id));
  if (itemIndex > -1) {
    data.items[itemIndex] = { ...data.items[itemIndex], title: req.body.title };
    writeData(data);
    res.json(data.items[itemIndex]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete an item
app.delete('/items/:id', (req, res) => {
  const data = readData();
  data.items = data.items.filter((item) => item.id !== parseInt(req.params.id));
  writeData(data);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
