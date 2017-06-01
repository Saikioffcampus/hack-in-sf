const fs = require('fs');
const Guid = require('guid');
const express = require('express');
const bodyParser = require("body-parser");
const Mustache  = require('mustache');
const Request  = require('request');
const Querystring  = require('querystring');
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // true?
app.use(bodyParser.json());

var csrf_guid = Guid.raw();
const account_kit_api_version = 'v1.1';
const app_id = '439074956450051';
const app_secret = '69b44d95e214aa9356e1cfd41c4726fa';
const me_endpoint_base_url = 'https://graph.accountkit.com/v1.1/me';
const token_exchange_base_url = 'https://graph.accountkit.com/v1.1/access_token';



// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./project/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.listen(process.env.PORT);
app.listen(port, ipaddress);
