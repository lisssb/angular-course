
var app = angular.module('app', []);

app.service('UserService', [function(){
  var users = [{
    name : 'Liss',
    age : 28,
    job : "FullStack",
    date : Date.now()
  }, {
    name : 'Marcial',
    age : 27,
    job : "Backend",
    date :Date.now()
  },
  {
    name : "Elba",
    age : 45,
    job : "System administrator",
    date : Date.now()
  }, {
    name : 'Kate',
    age : 25,
    job : "Frontend",
    date :  Date.now()
  },
  {
    name : "Anthony",
    age : 21,
    job : "CTO",
    date : Date.now()
  }];
  this.getUsers = function(){ //para que users sea privado
    return users;
  };
}]);

app.controller('ParentCtrl', ['$filter', 'UserService', function($filter, UserService){
  this.title="Mi agenda";
  this.formats = [{name : 'español', format: 'dd/MM/yyyy'},{name : 'ingles', format:  'MM/dd/yyyy'}];
  this.users = UserService.getUsers();


}]);

//un filtro siempre tiene que devolver una funcion. SIEMPRE. Lo que le llega es lo que esta en la parte izquierda del pipe
app.filter ('pagination', [function(){
  return function(items, numElem){
    var length = Math.ceil(items.length /numElem);
    var arr = []
    for (var i = 0; i < length; i++){
      arr.push(i);
    }
    return arr;
  };
}]);
