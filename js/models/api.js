define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var ApiModel = Backbone.Model.extend({
    urlRoot: function () {
    	if (typeof this.get('apiname') !== 'undefined') {
    		return '/user/' +this.get('username')+ '/api/' +this.get('apiname')+ '/' + this.get('version');
    	} else {
    		return '/user/' +this.get('username')+ '/api';
    	}
    }
  });
  return ApiModel;

});
