cuando registramos eventos con el root scope tenemso que acordarnos de destruirlo.


* then
* success
* fails
  * catch
  * caught
  * error
* done
* always ~ finally



# defered

nos perfmite gestionar la parte de detras d ela promersa uqe un programador no ve.



KARMA ==> unitario
protractor  end to end


# TESTING


* describe("xxx", fn). agrupa conjunto de test. Podemos tener describes dentro de este.
  * before(fn) se ejecuta antes de los it. Por ejemplo instanciar la factoria que vamos a usar. Se ejecuta solo una vez.
  * beforeEach(fn). Es igual que el before, se ejecuta una vez siempre de carda it
  * it ("xx", fn). Cada uno de los test. ejemplo: create, edit, delete
  * afterEach (fn)
  * after(fn)



# notas
* Separar el factory,
* las dependencias puestas en cada uno de los modulos, para uqe no hayan dependencias y se puedea testear cada modulo


#animaciones

ng-app no deberia estar en el mismo sitio de ui-view
