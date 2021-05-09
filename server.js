let express         = require('express'),
    session         = require('express-session'),

    exphbs          = require('express-handlebars'),
    bodyParser      = require('body-parser'),
    path            = require('path'),
    app = express();
//Configure Server: Set Port
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

var port = 4000;
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

//welcome route
app.get("/", (req, res) => {
    res.render('vehicle',{title:'My Vehicle'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

