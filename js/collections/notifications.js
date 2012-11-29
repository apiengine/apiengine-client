define([
  'jquery',
  'underscore',
  'backbone',
  'models/session'
], function($, _, Backbone, Session){
  var Notifications = Backbone.Collection.extend({
    url: function () {
      if(typeof this.options.methodId !== 'undefined') {

        return '/user/' + this.options.username + '/api/' + this.options.apiname + '/' + this.options.version + '/resource/' + this.options.resourceId + '/method/' + this.options.methodId + '/notification';
      } else if(typeof this.options.resourceId !== 'undefined') {

        return '/user/' + this.options.username + '/api/' + this.options.apiname + '/' + this.options.version + '/resource/' + this.options.resourceId + '/notification';
      } else {
        return '/user/' + this.options.username + '/api/' + this.options.apiname + '/' + this.options.version + '/notification';

      }
    },
    initialize: function () {
      console.log(this);
    }
  });

  return Notifications;
});
  