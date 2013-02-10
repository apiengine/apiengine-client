define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var MethodModel = Backbone.Model.extend({
  	idAttribute : 'method',
    urlRoot: function () {
    	return '/user/' +this.options.username+ '/api/' +this.options.apiname+ '/' + this.options.version + '/resource/' + this.options.resourceId;
    }
  });
  return MethodModel;

});
