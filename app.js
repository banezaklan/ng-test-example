
var app = angular.module("myApp", ['ngResource']);
//var app = angular.module("myApp", ['ngResource', 'ServerMock']);

app.service('UserService', ['$resource', '$q', function($resource, $q) {
        var loginResource = $resource('/User/Login');
        var userModel = {};

        return {
            data: function() {
                return userModel;
            },
            login: function(username, password) {
                var deferred = $q.defer();
                var userRequest = loginResource.save({'username': username, 'password': password});
                $q
                        .when(userRequest.$promise)
                        .then(function(response) {
                            //response.data.xyz='123'; //uncomment to make the service test fail
                            userModel = response.data;
                            deferred.resolve(response);
                        });

                return deferred.promise;
            }
        };
    }]);


app.service('TodoService', ['$http', function(http) {

        return{
            getTodos: function() {
                return http.post("/GetTodos").then(function(result) {
                    
                    return result.data.data;
                });
            }
        };
    }]);




app.controller('MainCtrl', function($scope, $http, UserService, TodoService) {

    var self = this;
    this.message = "Hello";
    $scope.theMoney = 0;
    $scope.todos = [];
    $scope.user = {};

    $scope.init = function() {
        
        TodoService.getTodos().then( function(response) {
            $scope.todos = response.data;
        });
        
        $scope.user = UserService.data();
        
    };

    $scope.giveMeSomeMoney = function() {
        //console.log("giveMeSomeMoney");
        self.takeOutWallet();
    };

    this.takeOutWallet = function() {
        //console.log("takeOutWallet");
    };

    $scope.login = function(username,password){
        UserService.login(username,password);
        $scope.user = UserService.data();
    };

    $scope.init();

});



