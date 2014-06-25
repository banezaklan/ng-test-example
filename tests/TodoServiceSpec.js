
describe("TodoService Tests", function() {
    var $scope;
    var todoService;
    var $httpBackend;
    var q;


    var mockDataTodos = [
            {id: 1, title: 'Do this', done: false},
            {id: 2, title: 'Do that', done: false},
            {id: 3, title: 'Do the other', done: false},
            {id: 4, title: 'Do the thing', done: false},
        ];

    beforeEach(module("myApp"));


    beforeEach(inject(function(_$httpBackend_, $rootScope, $injector, $http, $q) {

        $httpBackend = _$httpBackend_;
        q = $q;

        todoService = $injector.get('TodoService');


    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("method getTodos() should resolve mock test data", function() {

        $httpBackend.expectPOST('/GetTodos')
                .respond(200, {data:mockDataTodos} );
        
        todoService.getTodos().then( function(response) {

            expect(response).toEqual(mockDataTodos);
        });
        $httpBackend.flush();

    });





});