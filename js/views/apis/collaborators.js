define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/apis/overview.html',
  'views/comments/comments',
  'models/api'
], function($, _, Backbone, Router, Session, overviewTemplate, CommentsView, ApiModel){
  var Collaborators = Backbone.View.extend({
    el: '.api-page-container',
    initialize: function () {
      var that = this;
      
    },  
    render: function () {
      var that = this;
      $('.api-container .tabs li.active').removeClass('active');
      $('.api-container .tabs .api-collab').addClass('active');
      this.$el.html('colab page');
    }
  });
  return Collaborators;
});
