var assert = require('assert');
var wc3js = require('wc3js');
describe('html validation', function(){
  it('index page should have no html errors', function(done){
  	wc3js.validate({
  		file: 'index.html',
  		callback: function (res) {
  				console.log(res);
  			if (res.messages.length > 0 ) {
  				throw {error: 'html errors have been found', results: res};
  			};
  			done();
  		}
  	})
  })
})
