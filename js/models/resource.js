define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var ResourceModel = Backbone.Model.extend({
    urlRoot: function () {
    		return '/user/' +this.options.username+ '/api/' +this.options.apiname+ '/' + this.options.version + '/resource';
    }
  });
  return ResourceModel;

});
