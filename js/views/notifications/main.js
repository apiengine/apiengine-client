define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'events'
], function($, _, Backbone, Router, Session, Events){
  var Notifications = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      
    },  
    events: {
    }
  });
  return Notifications;
});
