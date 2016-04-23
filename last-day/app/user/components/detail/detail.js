(function(angular){ // para no crearlo en el ambito del window
  var component = angular.module('app.components.detail', []);
  component.directive('testDirective', [function(){
    return {
      restrict : 'EA',
      template : '<div>\
                    <div> \
                     Nombre: <span id ="name">{{user.name}}</span>\
                    </div>\
                    <div> \
                    Edad: <span id ="age">{{user.age}}</span>\
                    </div>\
                  </div>',
      scope : {
        user : '='
      }
    }
  }]);
})(angular);
