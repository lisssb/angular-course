
var app = angular.module('app', ['ngMessages', 'ui.router']);

app.directive('nif', [function(){
  return {
    restrict: 'A',
    require : 'ngModel',
    link : function(scope, elem, atts, ctrl){ //ctrl -> controlador del ngModel


      ctrl.$validators.nif = function (modelValue, viewValue) {

        var expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

        if(expresion_regular_dni.test(viewValue) == true) {

          var numero = dni.substr(0, viewValue.length - 1);

          var letr = viewValue.substr(viewValue.length - 1, 1);

          numero = numero % 23;

          var letra = 'TRWAGMYFPDXBNJZSQVHLCKET';

          letra = letra.substring(numero, numero + 1);

          if(letra != letr.toUpperCase()) {

            return false;

          } else {

            return true;

          }

        } else {

          return false;

        }

      }


    }
  }
}]);

app.constant('API_URL', 'http://localhost:8000/api'); //no se puede modificar
app.value('authToken', 'ssss');//esto si se puede modificar

// app.run(['UserProvider', function(UserProvider){
//   debugger;
// }]);
// app.config(['UserProviderProvider', function(UserProvider){
//   debugger;
// }]);
// app.provider('UserProvider', [function(){ //etapa config
//   this.init = function(url){
//     urlApi = url;
//   };
//   this.$get = [function(){//etapa run
//     return {
//       user : function(){
//         alert(urlApi);
//       }
//     };
//   }];
// }]);


app.factory('UserFactory', [function(){
  var users = [{
    name : 'Liss',
    age : 28,
    job : "FullStack",
    date : new Date(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  }, {
    name : 'Marcial',
    age : 27,
    job : "Backend",
    date :new Date(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  },
  {
    name : "Elba",
    age : 45,
    job : "System administrator",
    date : new Date(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  }, {
    name : 'Kate',
    age : 25,
    job : "Frontend",
    date :  new Date(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  },
  {
    name : "Anthony",
    age : 21,
    job : "CTO",
    date : new Date(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  }];

  var getUsers = function(){
    return users;
  };

  var createUser = function(user){
    users.push(user);
  };

  var deleteUser = function(name){
    for(var i = 0, length = users.length; i < length - 1; i++){
      if(users[i].name === name){
        users.splice(i,1);
      }
    }
  };

  var editUser = function(name, user){
    for(var i = 0, length = users.length; i < length - 1; i++){
      if(users[i].name === name){
        users[i] = user;
      }
    }
  };



  var userEdit = null;
  var setUserEdit = function(user){
    userEdit = angular.copy(user); // esto lo hago para uqe no se me modifique en la tabla, no hago la referencia al mismo objecto
  }

  var getUserEdit = function(){
    return userEdit;
  }

  return {
    getUsers : getUsers,
    createUser : createUser,
    deleteUser: deleteUser,
    editUser: editUser,
    setUserEdit : setUserEdit,
    getUserEdit : getUserEdit
  };

}]);

app.controller('ManageCtrl', ['UserFactory', '$rootScope', function(UserFactory, $rootScope){
  this.jobs = ["FullStack","Backend","Frontend","System administrator","CTO"]
  //this.user = UserFactory.userEdit;
  this.isEdit = false;
  //this.nameEdit = angular.copy(this.user.name);
  //this.nameEdit = null;

  $rootScope.$on('edituser', function(event, user){
    this.user = UserFactory.getUserEdit();
    this.isEdit = true;
    this.nameEdit = angular.copy(this.user.name);
  }.bind(this));

  this.onSubmit = function(){
    if(this.form.$valid){ // esto es necesario si no agrego ng-submit="manageCtrl.form.$valid && manageCtrl.onSubmit()"
    //debugger;
    if(this.isEdit){
      UserFactory.editUser(this.nameEdit, angular.copy(this.user));
    }
    else{
      UserFactory.createUser(angular.copy(this.user));
    }

    this.isEdit = false;
    this.nameEdit = null;
    this.user = null;
    this.form.$setPristine(); // esto nos sirve para limpiar el formulario (reset de un formulario)
  }
};
this.addAddress = function(){
  if(!this.user){
    this.user = {
      addresses : []
    };
  }
  if(this.user && !this.user.addresses){
    this.user.addresses = [];
  }
  this.user.addresses.push({});
};
//this.user = {addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]}
}]);




app.controller('ParentCtrl', ['$filter', 'UserFactory', '$rootScope', function($filter, UserFactory, $rootScope){
  this.title="Mi agenda";
  this.formats = [{name : 'español', format: 'dd/MM/yyyy'},{name : 'ingles', format:  'MM/dd/yyyy'}];
  //this.users = UserService.getUsers();
  this.users = UserFactory.getUsers();

  this.deleteUser = function(user){
    UserFactory.deleteUser(user.name);
  };
  this.editUser = function(user){
    UserFactory.setUserEdit(user);
    $rootScope.$emit('edituser', user); // edito el evento edit user
  };


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
