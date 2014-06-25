
describe("UserService Tests", function() {
    
    var userService;
    var $httpBackend;
    
    beforeEach(module("myApp"));

    beforeEach( inject(function(_$httpBackend_, $injector ) {

        $httpBackend = _$httpBackend_;
        userService = $injector.get('UserService');

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("method login() should accept user login data and service should then contain proper user data", function() {
        var testData = {id: 123, firstName: 'John', lastName: 'Doe'};

        $httpBackend.expectPOST('/User/Login', {username: 'johndoe@anonimous.com', password: '123456'})
                .respond(200, {data: testData});

        userService.login('johndoe@anonimous.com', '123456');
        $httpBackend.flush();
        expect(userService.data()).toEqual(testData);

    });

});