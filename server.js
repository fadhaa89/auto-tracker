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

app.use(session({
    key: 'user_id',
    secret: 'MyRandKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
pp.use((req, res, next) => {
    if (req.cookies.user_id && !req.session.user) {
        res.clearCookie('user_id');        
    }
    next();
});

app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

const db = require("./app/models");//include models
db.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
});

//Include route
require("./app/routes/vehicle.routes")(app);
require("./app/routes/user.routes")(app);

//welcome route
app.get("/", (req, res) => {
    res.redirect('/vehicle');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

