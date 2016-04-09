* un scope nunca deberia acceder a sus padress ni a sus hijos. Porque estariamos aplicando el codigo.

* las directivas en angular son igual que los componentes en react o en angular2

* Un input escribe en un scope (esto se hace con una directiva), ya que la vista solo puede leer, no escribir.

* :: var  no se muestra los cambios de var para mejorar el rendimiento. (esto se suele utilizar para la internalizacion)


*no es necesario que un controlador exista par tener una aplicacion angular pero siempre hay que tener un module.

* todo lo que creeemos tinee que estar dentro de un modulo

* al minimizar cambiamos parametros por caracteres.


* se crean class=scope en cada sitio del dom donde hay un scope.


 #ControlerAS

* todos los objetos en javascript tiene prototype.

*prototype en javascript es

var user = function(){
  this.name = "ra";
}

user.prototype.saluda = function({
  console.log("hola soy" + this.name)
})


# valores
* config antes de run

* run despues de config.


# ng-model
este es el que es capaz de obtener los datos del usuario y guardarlos en el javascript.




#ng-if
elimina el elemento del dom. El ng-if nos crea un scope. ng-show no!
#ng-hide
lo oculta



# Valores

* los valores primitivos en javascript se pasa por valor.
* los objetos se pasan por referencia.



var persona = {
  cabeza : 1,
  piernas : {
    derecha : 1,
    izquierda : 1
  }
}

function modificarUsuario(cabeza){
  cabeza ++;
}

function modificarUsuario(persona){
  persona.cabeza ++;
}

modificarUsuario (persona.cabeza);
modificarUsuario (persona);
console.log(persona.cabeza)


#ng-repeat
##li
si en la lista tnego dos valores

track by $index ==> para uqe no nos pete cuando en la lista tengo objetos repetidos


#ng-src
cuando lo que este entre parentesis tenga valor ponmelo en el src.


#el include me cepilla cosas


* revisar ng-class

#Filtros
nos permiten modifiar la informacion q estamos viendo


#ng-options
nos genera las opciones de un select. Tenemos que meterle ng-model




#SERVICIOS
en angular2 no existe niservice ni facory ni peovider

 * Service sigue el patron prototype. publico con this
 * Factory sigue el patron revealing modulepublico devuelveu npobjeto

function(){
  var users = [{}};
  var createUser = function(){};
  var listUsers = function(){};
  return {
    createUser : createUser,
    listUsers : listUsers
  };
}

* el injector de angular injecta los servicios y factorias
