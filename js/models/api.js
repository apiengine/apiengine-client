define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var ApiModel = Backbone.Model.extend({
    urlRoot: function () {
    		return '/user/' +this.get('username')+ '/api/' +this.get('apiname')+ '/' + this.get('version');
    }
  });
  return ApiModel;

});
