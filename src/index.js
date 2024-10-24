const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./routes');
const mongoose = require('mongoose');

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;

mongoose
    .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Successfully connect to MongoDB');
    })
    .catch(err => {
        console.log('Connection error:', err);
        process.exit();
    });

app.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`);
})
