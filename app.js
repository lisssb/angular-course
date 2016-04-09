
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
    age : 28,
    job : "",
    date : Date.now()
  }, {
    name : 'Marcial',
    age : 27,
    job : "",
    date :Date.now()
  },
  {
    name : "Elba",
    age : 45,
    job : "",
    date : Date.now()
  }, {
    name : 'Kate',
    age : 25,
    job : "",
    date :  Date.now()
  },
  {
    name : "Anthony",
    age : 21,
    job : "",
    date : Date.now()
  }];

  this.formats = [{name : 'español', format: 'dd/MM/yyyy'},{name : 'ingles', format:  'MM/dd/yyyy'}];



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

app.controller('ChildCtrl', [function(){
  this.title="Controlador hijo";
  //var a = $scope;
  //debugger;
}]);
