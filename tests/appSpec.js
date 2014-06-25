
describe("myApp Tests", function() {
    var $scope;
    var mainCtrl;
    var $httpBackend;
    var q;

    var TodoServiceMock;
    var UserServiceMock;

    var mockDataTodos = [
            {id: 1, title: 'Do this', done: false},
            {id: 2, title: 'Do that', done: false},
            {id: 3, title: 'Do the other', done: false},
            {id: 4, title: 'Do the thing', done: false},
        ];

    beforeEach(module("myApp"));


    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $injector, $http, $q) {

        $httpBackend = _$httpBackend_;
        q = $q;

        TodoServiceMock = {
            getTodos: function() {

                deferred = q.defer();
                // Place the fake return object here.
                // Important to simulate the server mock response where the first 'data' is from the library and the second is custom param
                // where the idea is to have more params in the response as needed.
                deferred.resolve( { data: mockDataTodos }  );
                return deferred.promise;
            }
        };

        UserServiceMock = {
            data: function() {
                return {};
            },
            login: function(username, password) {
                deferred = q.defer();
                // Place the fake return object here
                deferred.resolve({id: 123, firstName: 'John', lastName: 'Doe'});
                return deferred.promise;
            }
        };



        //userService = $injector.get('UserService');

        $scope = $rootScope.$new();
        spyOn(TodoServiceMock, "getTodos").andCallThrough();

        mainCtrl = $controller("MainCtrl", {
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

        it("Should have a message Hello!", function() {
            expect(mainCtrl.message).toBe("Hello");
        });

        it("Sholud have scope var theMoney be 0", function() {
            expect($scope.theMoney).toBe(0);
        });


        it("Should have scope method giveMeSomeMoney defined", function() {
            expect($scope.giveMeSomeMoney).toBeDefined();
        });

        it("Should have scope method takeOutWallet defined", function() {
            expect(mainCtrl.takeOutWallet).toBeDefined();
        });

        it("Should have method giveMeSomeMoney called", function() {
            spyOn($scope, 'giveMeSomeMoney').andCallThrough();
            spyOn(mainCtrl, 'takeOutWallet').andCallThrough();
            $scope.giveMeSomeMoney();
            expect($scope.giveMeSomeMoney).toHaveBeenCalled();
            expect(mainCtrl.takeOutWallet).toHaveBeenCalled();
        });


        /* todos service related */
        it('should ensure method was called', function() {
            //$httpBackend.flush();
            expect(TodoServiceMock.getTodos).toHaveBeenCalled();
        });

        it("scope todos should contain proper mock data", function() {
            $scope.$root.$digest();
            expect($scope.todos).toEqual(mockDataTodos);
        });

        /* UserService related */
        it("scope.user should initially be empty", function() {
            expect($scope.user).toEqual({});
        });


        it("scope.login() should call UserService.login() method", function() {
            spyOn(UserServiceMock, 'login').andCallThrough();
            $scope.login('johndoe@anonymous.com', '123456');
            expect(UserServiceMock.login).toHaveBeenCalled();
        });



    });



});