
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

    $scope.init = function() {
        TodoService.getTodos().then(function(data) {
            $scope.todos = data;
            
        });
    };

    $scope.giveMeSomeMoney = function() {
        //console.log("giveMeSomeMoney");
        self.takeOutWallet();
    };

    this.takeOutWallet = function() {
        //console.log("takeOutWallet");
    };

    $scope.getTodos = function() {

    };

    $scope.init();

});



