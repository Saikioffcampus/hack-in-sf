(function () {

    angular
        .module("AK")
        .factory("LoginService", LoginService);

    function LoginService($http) {

        var api = {

            login_init: login_init,
            login_success: login_success
        };

        return api;

        function login_init() {
            return $http.post('/login');
        }

        function login_success(code, csrf) {
            var secret = {
                "code": code,
                "csrf": csrf
            }
            return $http.post('/login_success', secret);
        }



    }

})();
