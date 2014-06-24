
describe("myApp Tests", function() {
    var $scope;
    var mainCtrl;
    var $httpBackend;

    var TodoServiceMock;
    var UserServiceMock;

    beforeEach(module("myApp"));


    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $injector, $http) {

        TodoServiceMock = {
            getTodos: function() {
                return {data: [
                        {id: 1, title: 'Do this', done: false},
                        {id: 2, title: 'Do that', done: false},
                        {id: 3, title: 'Do the other', done: false},
                        {id: 4, title: 'Do the thing', done: false},
                    ]};
            }
        };

        UserServiceMock = {
            data: function() {
                return {id: 123, firstName: 'John', lastName: 'Doe'};
            },
            login: function(username, password) {
                deferred = q.defer();
                // Place the fake return object here
                deferred.resolve({id: 123, firstName: 'John', lastName: 'Doe'});
                return deferred.promise;
            }
        };

        $httpBackend = _$httpBackend_;
        //userService = $injector.get('UserService');

        $scope = $rootScope.$new();

        /*spyOn(TodoServiceMock, "getTodos").andCallThrough();*/

        mainCtrl = $controller( "MainCtrl", {
            $scope: $scope,
            $http: $http,
            UserService: UserServiceMock,
            TodoService: TodoServiceMock

        });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe("Controller MainCtrl", function() {

        beforeEach(function() {


        });

//        it('should ensure TodoServiceMock.getTodos() was called', function() {
//            //$httpBackend.flush();
//            expect(TodoServiceMock.getTodos).toHaveBeenCalled();
//        });

        it("Should have a message Hello!", function() {
            expect(mainCtrl.message).toBe("Hello");
        });
//
//        it("Sholud have scope var theMoney be 0", function() {
//            expect($scope.theMoney).toBe(0);
//        });
//
//
//        it("Should have scope method giveMeSomeMoney defined", function() {
//            expect($scope.giveMeSomeMoney).toBeDefined();
//        });
//
//        it("Should have scope method takeOutWallet defined", function() {
//            expect(mainCtrl.takeOutWallet).toBeDefined();
//        });
//
//        it("Should have method giveMeSomeMoney called", function() {
//            spyOn($scope, 'giveMeSomeMoney').andCallThrough();
//            spyOn(mainCtrl, 'takeOutWallet').andCallThrough();
//            $scope.giveMeSomeMoney();
//            expect($scope.giveMeSomeMoney).toHaveBeenCalled();
//            expect(mainCtrl.takeOutWallet).toHaveBeenCalled();
//        });




//        describe("method getTodos", function() {
//
//            beforeEach(function() {
//
//
//            });
//
//            afterEach(function() {
//                $httpBackend.verifyNoOutstandingExpectation();
//                $httpBackend.verifyNoOutstandingRequest();
//            });
//
//            it("should return proper data", function() {
//                $httpBackend.expectPOST('/GetTodos').respond(200, {data: [{id: 1, title: 'Do this', done: false}]});
//
//                $scope.getTodos();
//                $httpBackend.flush();
//                expect($scope.todos[0]).toEqual({id: 1, title: 'Do this', done: false});
//            });
//
//        });

    });

//    describe("Service UserService", function() {
//        var user;
//
//        it("method login() should accept user login data and service should then contain proper user data", function() {
//            var testData = {id: 123, firstName: 'John', lastName: 'Doe'};
//            //console.log(userService);
//
//            $httpBackend.expectPOST('/User/Login', {username: 'johndoe@anonimous.com', password: '123456'})
//                    .respond(200, {data: testData});
//
//            userService.login('johndoe@anonimous.com', '123456');
//            $httpBackend.flush();
//            expect(userService.data()).toEqual(testData);
//
//        });
//    });


});