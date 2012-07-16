define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var ApiModel = Backbone.Model.extend({
    urlRoot: function () {
    	if(this.location === 'profile') {
    		return '/user/' + Session.get('login') + '/api';
    	} else {
    		return '/api';
    	}
    }
  });
  return ApiModel;

});
