const express = require('express');
const cors = require('cors')
const path = require("path");
const mime = require('mime');

const app = express();
const router = require('./routes')

require('dotenv').config()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(cors())


app.use(express.json());
app.use("/api", router)


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});