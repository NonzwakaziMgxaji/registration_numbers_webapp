// 'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const regFF = require('./regFactory');
// const routes = require('./routes/registrationRoutes');
const pg = require("pg");
const Pool = pg.Pool;

const app = express();

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// database connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://nzwakie:Bokang2851!@localhost:5432/registration_numbers';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    }
});

const regiez = regFF(pool)
// const regRoutes = routes(regiez)


app.get('/', function(req, res){
    res.render('index')
});

app.get('/reg_numbers', function(req, res){

});

app.post('/reg_numbers', function(req, res){
    
});

const PORT = process.env.PORT || 3014

app.listen(PORT, () => {
    console.log("App is running at port " + PORT)
})