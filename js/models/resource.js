define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var ResourceModel = Backbone.Model.extend({
    urlRoot: function () {
    	if (typeof this.get('api') !== 'undefined') {
    		return '/user/' +this.get('username')+ '/api/' +this.get('api')+ '/' + this.get('version') + '/resource/' + this.get('resourceId');
    	} else {
    		return '/user/' +this.get('username')+ '/api';
    	}
    }
  });
  return ResourceModel;

});
