# DIRECTIVAS
###  restric
 * A == atributo. <div hello-world></div>
 * E == elemento <hello-world></hello-world>
 * C == clase
 * por defecto???

### SCOPe
 * true ==> la directiva tiene su propio SCOPe (normalmente tiene su propio scope)
 * si no pongo nada comparte con el controller en donde este , parentCtrl.
 * Si le pasamos un objeto, le estamos pasadon referencias y sigue teniendo su propio scope,
    * = paso por referencia (se cambia en el padre tmabien)
    * @ paso por valor (con el arroba tengo que hacer que me evalue la variable con {{}})
    * < solo one way //revisar estamos  
      * si se pasa objeto se pasa por referencia
      * si se pasa un primitivo por valor
    * & esto es para pasarle una referencia al metodo, revisar paso de parametros!!!!¿¿¿

### LINK
El elemento del dom donde esta puesta la directiva


REVISAR ng-transclude!!!
