const express = require("express");

const app = express();

app.get('/ping', (req, res) => {
    res.send("Ping test metod card library");
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});