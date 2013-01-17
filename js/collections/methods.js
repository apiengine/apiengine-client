define([
  'jquery',
  'underscore',
  'backbone',
  'models/session'
], function($, _, Backbone, Session){
  var Methods = Backbone.Collection.extend({
    url: function () {
        return '/user/' + this.username + '/api/' + this.apiname + '/' + this.version + '/resource/' + this.resourceId + '/method';
    },
    initialize: function () {
    	console.log(this);
    }
  });

  return Methods;
});
  