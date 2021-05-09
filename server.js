let express         = require('express'),
    session         = require('express-session'),
    cookieParser    = require('cookie-parser'),
    exphbs          = require('express-handlebars'),
    bodyParser      = require('body-parser'),
    path            = require('path'),
    env             = require('dotenv').config(),
    app = express();
//Configure Server: Set Port
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
