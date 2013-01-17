define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var MethodModel = Backbone.Model.extend({
    urlRoot: function () {

    		return '/user/' +this.get('username')+ '/api/' +this.get('apiname')+ '/' + this.get('version') + '/resource/' + this.get('resourceId') + '/method';
  
    }
  });
  return MethodModel;

});
