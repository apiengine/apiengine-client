define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'models/session',
  'text!templates/apis/list.html',
  'text!templates/apis/list-item.html',
  'collections/notifications'
], function($, _, Backbone, Mustache, Session, apisListTemplate, apisListItemTemplate, NotificationsCollection){
  var NotsPage = Backbone.View.extend({
    el: '.private-container',
    initialize: function () {

    },
    events: {

    },
    render: function () {
      var that = this;
      	notifications = new NotificationsCollection([], this.options);

      notifications.fetch({
        success: function (collection) {
        	console.log('done got', collection);
          // that.$el.html(Mustache.render(apisListTemplate, {
          // 	notifications: collection.models
          // }));
        }
      });
    }
  });
  return NotsPage;
});
