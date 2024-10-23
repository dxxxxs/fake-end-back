const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./routes');

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`);
})