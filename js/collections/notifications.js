define([
  'jquery',
  'underscore',
  'backbone',
  'models/session'
], function($, _, Backbone, Session){
  var Notifications = Backbone.Collection.extend({
    url: function () {
        return '/user/' + this.options.username + '/api/' + this.options.api + '/' + this.options.version + '/resource/' + this.options.resourceId + '/method/' + this.options.methodId + '/notification';
    },
    initialize: function () {
      console.log(this);
    }
  });

  return Notifications;
});
  