define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var MethodModel = Backbone.Model.extend({
    urlRoot: function () {
    	if (typeof this.get('method') !== 'undefined') {
    		return '/user/' +this.get('username')+ '/api/' +this.get('api')+ '/' + this.get('version') + '/resource/' + this.get('resourceId') + '/' + this.get('method');
    	} else {
    		return '/user/' +this.get('username')+ '/api/' +this.get('api')+ '/' + this.get('version') + '/resource/' + this.get('resourceId');
    	}
    }
  });
  return MethodModel;

});
