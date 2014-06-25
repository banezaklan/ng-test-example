
describe("TodoService Tests", function() {
    
    var todoService;
    var $httpBackend;

    var mockDataTodos = [
            {id: 123456, title: 'Do this', done: false},
            {id: 2, title: 'Do that', done: false},
            {id: 3, title: 'Do the other', done: false},
            {id: 4, title: 'Do the thing', done: false},
        ];

    beforeEach(module("myApp"));


    beforeEach(inject(function(_$httpBackend_, $injector ) {
        $httpBackend = _$httpBackend_;
        todoService = $injector.get('TodoService');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("method getTodos() should resolve correct mock test data", function() {
        $httpBackend.expectPOST('/GetTodos')
                .respond(200, {data:mockDataTodos} );
        
        todoService.getTodos().then( function(response) {
            expect(response.data).toEqual( mockDataTodos );
        });
        $httpBackend.flush();
    });

});