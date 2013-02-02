define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/apis/settings.html',
  'views/comments/comments',
  'models/api'
], function($, _, Backbone, Router, Session, overviewTemplate, CommentsView, ApiModel){
  var SettingsPage = Backbone.View.extend({
    el: '.api-page-container',
    initialize: function () {
      var that = this;

    },
    render: function () {
    	this.options.parent.activateTab('api-settings');

      this.$el.html(Mustache.render(overviewTemplate, this.options));
    }
  });
  return SettingsPage;
});
