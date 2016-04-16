

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

app.factory('UserFactory', [function () {
    var users = [{
        name: 'Ra',
        age: 28,
        job: 'FullStack',
        birthDate: new Date()
    }, {
        name: 'Pepe',
        age: 18,
        job: 'Frontend',
        birthDate: new Date()
    }, {
        name: 'Jose',
        age: 40,
        job: 'Backend',
        birthDate: new Date()
    }, {
        name: 'Pepito',
        age: 35,
        job: 'FullStack',
        birthDate: new Date()
    }];

    var userEdit = null;

    var getUsers = function () {
        return users;
    };
    var createUser = function (user) {
        users.push(user);
    };

    var deleteUser = function (name) {
        for(var i = 0, length = users.length; i < length; i++) {
            if(users[i].name === name) {
                users.splice(i, 1);
                break;
            }
        }
    };

    var editUser = function (name, user) {
        for(var i = 0, length = users.length; i < length; i++) {
            if(users[i].name === name) {
                users[i] = user;
                break;
            }
        }
    };

    var setUserEdit = function (user) {
        userEdit = angular.copy(user);
    };

    var getUserEdit = function () {
        return userEdit;
    };

    return {
        getUsers: getUsers,
        createUser: createUser,
        deleteUser: deleteUser,
        editUser: editUser,
        setUserEdit: setUserEdit,
        getUserEdit: getUserEdit
    };

}]);
app.controller('ManageCtrl', ['UserFactory', '$rootScope', function (UserFactory, $rootScope) {
    this.jobs = ['FullStack', 'Frontend', 'Backend', 'Designer'];
    this.user = UserFactory.userEdit;
    this.isEdit = false;
    $rootScope.$on('editUser', function (event, user) {
        this.user = UserFactory.getUserEdit();
        this.isEdit = true;
        this.nameEdit = angular.copy(this.user.name);
    }.bind(this));
    this.onSubmit = function () {
        if(this.form.$valid) {
            if(this.isEdit) {
                UserFactory.editUser(this.nameEdit, angular.copy(this.user));
            } else {
                UserFactory.createUser(angular.copy(this.user));
            }
            this.isEdit = false;
            this.nameEdit = null;
            this.user = null;
            this.form.$setPristine();
        }
    };
    this.addAddress = function () {
        if(!this.user) {
            this.user = {
                addresses: []
            };
        };
        if(this.user && !this.user.addresses) {
            this.user.addresses = [];
        }
        this.user.addresses.push({});

    }
}]);
app.controller('ParentCtrl', ['$filter', 'UserFactory', '$rootScope',
    function ($filter, UserFactory, $rootScope) {
        this.users = UserFactory.getUsers();

        this.removeUser = function (user) {
            UserFactory.deleteUser(user.name);
        };

        this.editUser = function (user) {
            UserFactory.setUserEdit(user);
            $rootScope.$emit('editUser', user);
        };
    }
]);
app.filter('pagination', [function () {
    return function (items, numElem) {
        var length = Math.ceil(items.length / numElem);
        var arr = [];
        for(var i = 0; i < length; i++) {
            arr.push(i);
        }
        return arr;
    };
}]);
