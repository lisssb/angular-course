describe('App functionality', function(){

  var controller, httpBackend;
  var users = [{
    name : 'pepe'
  }];

  beforeEach(angular.mock.module('app'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $httpBackend, API_URL, UserFactory){
    var scope = $rootScope.$new();
    debugger;
    $httpBackend.whenGET(API_URL + '/users').respond(users);
    $httpBackend.whenGET('app/app.tpl.html').respond('');
    $httpBackend.whenGET('app/user/user.tpl.html').respond('');
    $httpBackend.whenGET('app/user/list/list.tpl.html').respond('');

    controller = $controller('ListCtrl', {
      users: users,
      $state : null,
      $scope : scope,
      UserFactory : UserFactory
    });
    httpBackend = $httpBackend;
  }));

  it('Nuevos usuarios', function(){
    httpBackend.flush();
    var a = controller;
    expect(controller.nuevosUsuarios).toBeDefined();
    expect(controller.nuevosUsuarios.length).toBe(users.length);
    debugger;
  });

});
