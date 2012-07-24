define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var MethodModel = Backbone.Model.extend({
    urlRoot: function () {

    		return '/user/' +this.get('username')+ '/api/' +this.get('api')+ '/' + this.get('version') + '/resource/' + this.get('resourceId');
  
    }
  });
  return MethodModel;

});
