var app = angular.module('app.user.create', ['ui.router']);

app.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('app.user.create', {//siempre sufijo de provider en el config, en el controller es solo state
        url:'/create',
        controller:'CreateCtrl as createCtrl',
        templateUrl: 'app/user/create/create.tpl.html',
        data : {
          roles: ['admin'] // decimos que estos roles pueden entrar
        },
        resolve : {
          user : function(){ // esto es porque no tengo un usuario y para que no me pete
            return null;
          }
        }
    });
    $stateProvider.state('app.user.edit', {//siempre sufijo de provider en el config, en el controller es solo state
        url:'/edit/:name',
        controller:'CreateCtrl as createCtrl',
        templateUrl: 'app/user/create/create.tpl.html',
        data : {
          roles: ['admin'] // decimos que estos roles pueden entrar
        },
        resolve : {
          user: ['UserFactory', '$stateParams', function(UserFactory, $stateParams){
            return UserFactory.get({ name : $stateParams.name}).$promise;
          }]
        }
    });
}]);
app.controller('CreateCtrl', ['$scope', 'UserFactory', '$rootScope', '$state', '$stateParams', 'user',
 function($scope, UserFactory, $rootScope, $state, $stateParams, user){
  this.jobs = ["FullStack","Backend","Frontend","System administrator","CTO"]
  //this.user = UserFactory.userEdit;
  this.isEdit = false;
  //this.nameEdit = angular.copy(this.user.name);

  /*$rootScope.$on('edituser', function(event, user){
    this.user = UserFactory.getUserEdit();
    this.isEdit = true;
    this.nameEdit = angular.copy(this.user.name);
  }.bind(this));*/

  if($stateParams.name){
    this.isEdit = true;
    this.user = user;
  }

  this.onSubmit = function(){
    var promise = null;
    if(this.form.$valid){ // esto es necesario si no agrego ng-submit="manageCtrl.form.$valid && manageCtrl.onSubmit()"
    //debugger;
    if(this.isEdit){
      promise = user.$update();
    }
    else{
      promise = UserFactory.save(this.user).$promise;
    }

    promise.then(function(){
      $state.go('app.user.list');
    }, function(err){
      alert('Error')
    });

    // this.isEdit = false;
    // this.nameEdit = null;
    // this.user = null;
    // this.form.$setPristine(); // esto nos sirve para limpiar el formulario (reset de un formulario)
    // $state.go('app.user.list');
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
}]);


app.directive('nif', [function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {

            ctrl.$validators.nif = function (modelValue, viewValue) {
                var expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

                if(expresion_regular_dni.test(viewValue) == true) {
                    var numero = viewValue.substr(0, viewValue.length - 1);
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
