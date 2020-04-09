const express = require('express');
const connectDb = require('./config/db');

const app = express();

app.use(express.json());

connectDb();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, _ => console.log('Listening on', PORT));