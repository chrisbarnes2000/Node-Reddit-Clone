//=================================INITIAL=================================\\
// Set db
require('./data/reddit-db');
require('dotenv').config();

const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

const exphbs = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    defaultLayout: 'main',
    extname: 'hbs'
});
const expressValidator = require('express-validator');

// const methodOverride = require('method-override');

const PORT = process.env.PORT;




//=================================MIDDLEWARE=================================\\

// Handlebars
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add after body parser initialization!
app.use(expressValidator());

// Method Override
// app.use(methodOverride('_method'));

app.use(express.static('public'));


//=================================CONTROLLERS=================================\\

//Posts App
require('./controllers/posts.js')(app);



//=================================LISTEN=================================\\
// Start Server
app.listen(PORT, () => {
    console.log(`Redit tutorial listening on port localhost:${PORT}!`);
});

//To run tests export our app variables that mocha needs in order to successfully run our tests.
module.exports = app;