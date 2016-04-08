
var app = angular.module('app', []);

app.controller('ParentCtrl', [function(){
  this.title="Mi agenda";
  this.saluda = function(user){
    alert(user.name);
  };
  this.onClick = function(e){
    //console.log(e)
    alert("Hola lola: " + e);
  }
  this.onChange= function(){
    alert("cambio");
  };

  this.users = [{
    name : 'Liss',
    age : 28
  }, {
    name : 'Marcial',
    age : 27
  },
  {
    name : "Elba",
    age : 45
  }];


  
}]);

app.controller('ChildCtrl', [function(){
  this.title="Controlador hijo";
  //var a = $scope;
  //debugger;
}]);
