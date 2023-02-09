require('dotenv').config();
const app = require('express')();
const path = require('path')
const PORT = process.env.PORT || 5000

const mongo = require(__dirname + '/api/connexion');

var auth = require(__dirname + '/api/routes/router.route');

app.use('/api/', auth);

app.listen(PORT, function() {
    console.log(`Listening on ${ PORT }`);
});
