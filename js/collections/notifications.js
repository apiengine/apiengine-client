define([
  'jquery',
  'underscore',
  'backbone',
  'models/session'
], function($, _, Backbone, Session){
  var Notifications = Backbone.Collection.extend({
    url: function () {
      if(typeof this.options.methodId !== 'undefined') {

        return '/user/' + this.options.username + '/api/' + this.options.api + '/' + this.options.version + '/resource/' + this.options.resourceId + '/method/' + this.options.methodId + '/notification';
      } else {

        return '/user/' + this.options.username + '/api/' + this.options.api + '/' + this.options.version + '/resource/' + this.options.resourceId + '/notification';
      };
    },
    initialize: function () {
      console.log(this);
    }
  });

  return Notifications;
});
  