"use strict";
const express = require('express');
const PORT = 3000;
const app = express();
// set up the server to listen for http requests
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
