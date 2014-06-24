/* Load and show the list code */
/* Mock server back-end */
angular.module('ServerMock', ["myApp",'ngMockE2E'])
        .run(['$httpBackend', function($httpBackend) {

                var todos = [
                    {id: 1, title: 'Do this', done: false},
                    {id: 2, title: 'Do that', done: false},
                    {id: 3, title: 'Do the other', done: false},
                    {id: 4, title: 'Do the thing', done: false},
                ];

//                // let all views through (the actual html views from the views folder should be loaded)
//                $httpBackend.whenGET(new RegExp('views\/.*')).passThrough();
//
//                // Mock out the call to '/service/hello'
//                $httpBackend.whenGET('/service/hello').respond(200, {message: 'world'});
//                
//                // Respond with 404 for all other service calls
//                $httpBackend.whenGET(new RegExp('service\/.*')).respond(404);

                $httpBackend.whenPOST('/GetTodos').respond(function(method, url, data, headers) {
                    var result = [200];
                    console.log("Server returing all todos");
                    result.push({
                        data: todos
                    })
                    return result;
                });

                $httpBackend.whenPOST('/AddTodo').respond(function(method, url, data, headers) {
                    var result = [200];
                    console.log("Adding new todo");
                    var dataJson = JSON.parse(data);
                    todos.push(dataJson.todo);
                    result.push({
                        data: todos
                    })
                    return result;
                });


            }]);