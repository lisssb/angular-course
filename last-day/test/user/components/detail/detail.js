describe('Detail tes', function(){

  var html = null;
  var scope = null;
  var compile = null;

  beforeEach(angular.mock.module('app.components.detail'));
  beforeEach(angular.mock.inject(function($rootScope, $compile){//complee s el servicio de angular q compila el html lo recorre busca las directvas linka el scope con la template y genera un elemento del dom
    scope = $rootScope.$new();
    compile = $compile;
    html = '<test-directive user="usuario"></test-directive>'; // probar como seria un string aqui
  }));

  it('Render correctly', function(){
    scope.usuario = {
      name : 'Ra',
      age: 28
    };
    var dom_element = compile(html)(scope)//la primer parte o nos devuelve una function. La segunda parte hace la llamada cone l scope
    scope.$digest(); // se genera el elementeo del dom con sus datos
    var spans = dom_element.find('span');
    expect(spans[0].innerText).toBe(scope.usuario.name);
    expect(+spans[1].innerText).toBe(scope.usuario.age);
    //debugger;
  }); //el metodo digest del scope revisar

});
