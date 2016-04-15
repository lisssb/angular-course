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
* tambien se encarga de las validadciones y transformaciones de los campos,



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




# etapas PROVIDER

config --> $injector --> Run -->


en config solo podemos injectar constantes
$get es lo que se configura en la etapa de run



# Fromularios
* En angular se permite meter form dentor de form. En html antes del 5 no se puede
por defecto usar form, pero si tengo formularios embebidos usar ng-forms



#CONCEPTOS
## .bind
var myFunc = function(){
  alert(this.name);
};
var myFuncBind = myFunc.bind({name : 'Ra'}); //le paso el entorno donde se va a efectuar esa funcion
myFunc();
myFuncBind();


## .call

myFunc.call({name : 'Ra'}, p1, p2);

## .apply

myFunc.apply({name : 'Ra'}, [p1, p2]);



#Engine messages ngMessages

sirve para manejar errores de formularios

















#EVENTOS
 a través del scope escuchamos y enviamos eventos.
 * Emitir
     * $emit. lo escuchan los de arriba
     * $broadcast. lo escichan los de abajo
     *  en el caso del rootscope con el broadcast lo escuchan todos y con el emit los que se hallan registrado.
     * en caso de hermanos se suele usar el rootscope y se emite a uno determinado.
 * $on



 #DIRECTIVAS
