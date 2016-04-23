describe('ListCtrl tests', function(){
  // before(function(){
  //
  // });

  var controller = null;
  var users = [{
    name : 'pepe'
  }];

  beforeEach(angular.mock.module('app'));// en este caso deberia realemtne cargar el modulo app.users.lsit
  beforeEach(angular.mock.inject(function($rootScope, $controller){ // invocamos el inject diciendole que le podemos i
    scope = $rootScope.$new();
    controller = $controller('ListCtrl', {users: users, $state : null, $scope : scope}); // $scope el objeto que provee lo que vamos a injectar.
  }));

  it('Load user correct', function(){
    //expect(controller.users.length).toBe(users.length);
  });


  it ('corret capitalize users', function(){
  //  expect(controller.users.length).toBe(users.length);
  //  expect(controller.users[0].name).toBe(users[0].name.toUpperCase());
  });

  // afterEach(function(){
  //
  // });
  //
  // after(function(){
  //
  // });



});
