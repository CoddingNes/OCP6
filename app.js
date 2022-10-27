const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://user1:user1@coddingnes.kkmgzbd.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

/*app.use((req, res, next) => {
    res.json ({message: 'Application utilisable'});
    next();
})
*/


module.exports = app;