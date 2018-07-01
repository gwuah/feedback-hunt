const cookieParser = require('cookie-parser');
const routes = require("./routes/routes");
const bodyParser = require('body-parser');
const express = require("express");
const path = require('path');
const cors = require('cors');


// initialize application
const app = express();


// configure express
app.engine('pug', require('pug').__express)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); 


app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// configure routes
app.use("/", routes);
app.use("/static", express.static(path.join(__dirname, "public")));


module.exports = app;