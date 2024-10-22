const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

require('./routes')(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`);
})
