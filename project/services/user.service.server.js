
module.exports = function (app, model) {

    const account_kit_api_version = 'v1.1';
    const app_id = '439074956450051';
    const app_secret = '7c1cb6aa55ef2a2de7bb26b62dafe9b1';
    const me_endpoint_base_url = 'https://graph.accountkit.com/v1.1/me';
    const token_exchange_base_url = 'https://graph.accountkit.com/v1.1/access_token';

    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    const fs = require('fs');
    const Guid = require('guid');
    const bodyParser = require("body-parser");
    const Mustache  = require('mustache');
    const Request  = require('request');
    const Querystring  = require('querystring');
    var csrf_guid = Guid.raw();

// TODO: validate token in request
    app.use(session({
        secret: 'hello world',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());

// In server.js, define the logic to serve your login page
    app.post('/login', function(request, response){
      var view = {
        appId: app_id,
        csrf: csrf_guid,
        version: account_kit_api_version,
      };

      response.send(view);
    });

    app.post('/login_success', function(request, response){
      // CSRF check
      if (request.body.csrf === csrf_guid) {
        var app_access_token = ['AA', app_id, app_secret].join('|');
        var params = {
          grant_type: 'authorization_code',
          code: request.body.code,
          access_token: app_access_token
        };

        // exchange tokens
        var token_exchange_url = token_exchange_base_url + '?' + Querystring.stringify(params);
        Request.get({url: token_exchange_url, json: true}, function(err, resp, respBody) {
          var view = {
            user_access_token: respBody.access_token,
            expires_at: respBody.expires_at,
            user_id: respBody.id,
          };

          // get account details at /me endpoint
          var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token;
          Request.get({url: me_endpoint_url, json:true }, function(err, resp, respBody) {
            // send login_success.html
            if (respBody.phone) {
              view.phone_num = respBody.phone.number;
            } else if (respBody.email) {
              view.email_addr = respBody.email.address;
            }
            response.send(view);
          });
        });
      }
      else {
        // login failed
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end("Something went wrong. :( ");
      }
    });


// Bad way. TODO: apiRoute or route middleware to protect it
    app.post("/gen_user", createOrUpdateUser);

    function createOrUpdateUser(request, response) {
        user = request.body.user;
        model.UserModel.createUser(user).then(
            function (user) {
                response.send(user);
            },
            function(err) {
                res.send(err).sendStatus(400);
            }
        )
    }


};