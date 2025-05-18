const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/number', (req, res) => {
    fs.readFile(path.join(__dirname, 'storage.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const json = JSON.parse(data);
        res.json({ myNum: json.myNum });
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));