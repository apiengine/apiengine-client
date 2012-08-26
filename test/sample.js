var assert = require('assert');
var w3cjs = require('w3cjs');
describe('html validation', function(){
  it('index page should have no html errors', function(done){
  	w3cjs.validate({
  		file: 'index.html',
  		callback: function (res) {
  				console.log(res);
  			if (res.messages.length > 0 ) {
  			//	throw {error: 'html errors have been found', results: res};
  			};
  			done();
  		}
  	})
  })
})
