define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/comments/comments.html',
  'models/comments'
], function($, _, Backbone, Router, Session, commentsTemplate, CommentsModel){
  var CommentsWidget = Backbone.View.extend({
    el: '.comments-container',
    initialize: function (options) {
      var that = this;
      this.commentModel = new CommentsModel(options);
    },  
    events: {
    },
    editMethod: function (ev) {
      return false;
    },
    render: function () {
      var that = this;
      this.$el.html(_.template(commentsTemplate, {errors: []}));
    }
  });
  return CommentsWidget;
});

