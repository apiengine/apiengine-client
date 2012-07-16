define([
  'jquery',
  'underscore',
  'backbone',
  'models/session'
], function($, _, Backbone, Session){
  var Apis = Backbone.Collection.extend({
    url: function () {
      if(this.location === 'profile') {
        return '/user/' + Session.get('login') + '/api';
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
