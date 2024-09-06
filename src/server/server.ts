import dotenv from 'dotenv';
const express = require('express');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.user(express.json());
// set up the server to listen for http requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
