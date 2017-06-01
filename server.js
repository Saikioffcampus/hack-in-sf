
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // true?
app.use(bodyParser.json());


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./project/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.listen(process.env.PORT);
app.listen(port, ipaddress);
