define([
  'jquery',
  'underscore',
  'backbone',
  'models/session'
], function($, _, Backbone, Session){
  var Apis = Backbone.Collection.extend({
    url: function () {
      if(this.username) {
        return '/user/' + this.username + '/api';
      } else {
        return '/api';
      }
    },
    initialize: function () {
    	console.log(this);
    }
  });

  return Apis;
});
  