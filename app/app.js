const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set static folder
app.use(express.static(`${ __dirname }/public`));

// Routes
app.get('/', (req, res, next) => {
    res.render('home');    
});

module.exports = app;