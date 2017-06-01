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
            .when("/feedback", {
                templateUrl: "views/forum.html",
            })
            .otherwise({
                redirectTo: '/login'
            });


    }

})();