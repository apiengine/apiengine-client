define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/apis/overview.html',
  'models/api'
], function($, _, Backbone, Router, Session, overviewTemplate, ApiModel){
  var Collaborators = Backbone.View.extend({
    el: '.api-page-container',
    initialize: function () {
      var that = this;

    },
    render: function () {
    	this.options.parent.activateTab('api-collab');

      var that = this;
      $('.api-container .tabs li.active').removeClass('active');
      $('.api-container .tabs .api-collab').addClass('active');
      this.$el.html('colab page');
    }
  });
  return Collaborators;
});
