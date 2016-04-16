var app = angular.module('app', []);
app.controller('AppCtrl', ['$q', function($q){
  var myTimeout = function(seconds){
    if(seconds % 2 === 0){
      var defer = $q.defer();
      setTimeout(function(){
        defer.resolve();  //Defer.reject
      }, seconds * 1000);
      setInterval(function(){ //cuando una promesa s eha recsuelto o rechazado ya no se sigue llamando al notiofy
        defer.notify('Ha pasado')
      }, 1000);

      return defer.promise;
    }
    else{
      return $q.when("el tiempo es impar");
    }

  };
  var p = myTimeout(3);
  //var p2 = myTimeout(2);

  var p2 = p.then(function(){
    return myTimeout(2)
  });
  p2.then(function(){
    alert("finalizados")
  });




  //
  // $q.all([p, p2]).then(function(){
  //   alert ("Timeouts correctors");
  // }, function(){
  //   alert("Error en algun timeout")
  // }); //q.all
  //
  //
  //
  // p.then(function(){
  //   alert('Timeout finalizadp');
  // }, function(){
  //   alert("error");
  // }, function(data){ //este data es el que le pasamos al notify
  //   console.log("notify : " + data);
  // });


}]);
