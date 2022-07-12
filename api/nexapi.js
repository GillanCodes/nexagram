/**
 * Api for nexagram client
 * Developped by Gillancodes
 * 
 */

let app = require("express")();
let server = require("http").createServer(app);

require('dotenv').config({path: './config/.env'});
require('./config/database');

// Body parser Import
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: "50mb" }))

//Cookie parser Import
var cookieParser = require('cookie-parser');
app.use(cookieParser())

//cors
let cors = require('cors');
let whiteList = [process.env.CLIENT_URL, process.env.DASHBOARD_URL, undefined, "127.0.0.1"];
const corsOptions = {
    origin: function (origin, callback) {
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    'credentials': true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));

const { requireAuth, checkUser } = require("./middlewares/auth.middlewares");
app.use(checkUser)
//JWT
app.get('/jwtid', requireAuth, (req ,res) => {
  res.status(200).send(res.locals.user._id);
})

let authRoutes = require('./src/routes/auth.routes.js');
app.use('/api/auth', authRoutes)


//Port Listen Init
server.listen(process.env.PORT, () => {
    console.log('Listening on : ' + process.env.PORT);
});