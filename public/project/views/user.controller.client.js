(function () {
    angular.module("AK")
        .controller("LoginController", LoginController)


    function LoginController($window, LoginService, $location) {
        var vm = this;
        vm.smsLogin = smsLogin;
        vm.emailLogin = emailLogin;

      LoginService.login_init().success(function(response) {
         // initialize Account Kit with CSRF protection
          AccountKit_OnInteractive = function(){
                  AccountKit.init(
                    {
                      appId: response.appId,
                      state: response.csrf,
                      version: response.version,
                      fbAppEventsEnabled:true,
                      debug: true
                    }
                  );
                };
      })

      // login callback
      function loginCallback(response) {
        if (response.status === "PARTIALLY_AUTHENTICATED") {
          LoginService.login_success(response.code, response.state).success(function(response){
            console.log("success!");
            $location.url("/login_success");
          })
        } else if (response.status === "NOT_AUTHENTICATED") {
          console.log("not auth");
        } else if (response.status === "BAD_PARAMS") {
          console.log("bad");
        } else {
          console.log("else");
          console.log(response.status);
        }
      }

      // phone form submission handler
      function smsLogin() {
        var countryCode = document.getElementById("country_code").value;
        var phoneNumber = document.getElementById("phone_number").value;
        AccountKit.login(
          'PHONE',
          {countryCode: countryCode, phoneNumber: phoneNumber}, // will use default values if not specified
          loginCallback
        );
      }


      // email form submission handler
      function emailLogin() {
        var emailAddress = document.getElementById("email").value;
        AccountKit.login(
          'EMAIL',
          {emailAddress: emailAddress},
          loginCallback
        );
      }

    }

})();