// 'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');;

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


app.get('/', function(req, res){
    res.render('index')
});

const PORT = process.env.PORT || 3014

app.listen(PORT, () => {
    console.log("App is running at port " + PORT)
})