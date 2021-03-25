const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')



mongoose.connect('mongodb://localhost:27017/konexio_auth', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.error(err);
    }
})

app.use(bodyParser.json())
app.use(cors());

app.use('/auth', authRoutes)
app.use('/admin', adminRoutes);


app.listen(4000, () => {
    console.log('On ecoute sur le port 4000')
})