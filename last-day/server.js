var koa = require('koa');
var bodyParser = require('koa-body-parser');
var cors = require('koa-cors');
var Router = require('koa-router');

var app = koa();
app.use(cors());
app.use(bodyParser());

var users = [{
            name:'Raaaaaaaaaaaaa',
            job:'Developer'
          }, {
            name: 'Pepe',
            job: 'Backend Developer'
          }, {
            name: 'Juan',
            job: 'Designer'
          }];
var router = new Router();
router.get('/api/users', function * () {

	for(var i = 0; i < 9999999; i++){

	}
	this.body= users;
});

router.get('/api/users/:name', function * () {
   var i, length = users.length;
          for(i = 0; i< length; i++){
            if(users[i].name === this.params.name){
              this.body = users[i];
				return;
            }
          }
});

router.post('/api/users', function * () {
this.assert(this.request.body.name, 400, 'Name not found');
this.assert(this.request.body.job, 400, 'Job not found');
  var user = this.request.body;
    users.push(user);
    this.body = user;
});

router.put('/api/users/:name', function * () {
  var user = this.request.body;
  var i, length = users.length;
          for(i = 0; i< length; i++){
            if(users[i].name === this.params.name){
              users[i]= user;
              break;
            }
          }
    if(i < length){
        this.body = user;
    }else{
      this.body = null;
      this.status = 404;
    }

});
router.delete('/api/users/:name', function * () {
	var user = null;
	 var i, length = users.length;
          for(i = 0; i< length; i++){
            if(users[i].name === this.params.name){
              user = users.splice(i, 1);
              break;
            }
          }
    this.body = user[0];
});
app.use(router.middleware());
app.listen(8000);
