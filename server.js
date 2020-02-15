//=================================INITIAL=================================\\
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Set db
require('./data/reddit-db');

const app = express();
const PORT = process.env.PORT;

const exphbs = require('express-handlebars').create({extname: 'hbs'});
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.use(cookieParser());



//=================================MIDDLEWARE=================================\\

// Handlebars
app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add after body parser initialization!
app.use(expressValidator());

const checkAuth = (req, res, next) => {
    // console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        const token = req.cookies.nToken;
        const decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }

    next();
};
app.use(checkAuth);


//=================================CONTROLLERS=================================\\

//Authentication App
require('./controllers/auth.js')(app);

//Posts App
require('./controllers/posts.js')(app);

//Comments App
require('./controllers/comments.js')(app);



//=================================LISTEN=================================\\
//To run tests export our app variables that mocha needs in order to successfully run our tests.
module.exports = app;

// Start Server
app.listen(PORT, () => {
    console.log(`Redit tutorial listening on port localhost:${PORT}!`);
});
