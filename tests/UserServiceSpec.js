
describe("UserService Tests", function() {
    var $scope;
    var userService;
    var $httpBackend;
    var q;

    beforeEach(module("myApp"));

    beforeEach(inject(function(_$httpBackend_, $rootScope, $injector, $http, $q) {

        $httpBackend = _$httpBackend_;
        q = $q;

        userService = $injector.get('UserService');

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("method login() should accept user login data and service should then contain proper user data", function() {
        var testData = {id: 123, firstName: 'John', lastName: 'Doe'};
        //console.log(userService);

        $httpBackend.expectPOST('/User/Login', {username: 'johndoe@anonimous.com', password: '123456'})
                .respond(200, {data: testData});

        userService.login('johndoe@anonimous.com', '123456');
        $httpBackend.flush();
        expect(userService.data()).toEqual(testData);

    });





});