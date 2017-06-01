(function () {
    angular.module("AK")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/login.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/login_success", {
                templateUrl: "views/login_success.html",
                controller: "LoginSuccessController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: '/login'
            });

//        function checkLogin($q, ReaderService, $location) {
//            var deferred = $q.defer();
//            ReaderService
//                .checkLogin()
//                .success(
//                    function (user) {
//                        if(user != '0') {
//                            console.log("resolved!")
//                            deferred.resolve();
//                        } else {
//                            console.log("not resolved!")
//                            deferred.reject();
//                            $location.url("/login");
//                        }
//                    }
//                );
//            return deferred.promise;
//        }

    }

})();