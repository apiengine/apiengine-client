define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/comments/comments.html',
  'models/comments',
  'collections/notifications',
  'text!templates/comments/list.html'
], function($, _, Backbone, Router, Session, commentsTemplate, CommentsModel, NotificationCollection, listTemplate){
  var CommentsWidget = Backbone.View.extend({
    el: '.comments-container',
    initialize: function (options) {
      var that = this;
      console.log('XXXXXXXXXXXXXXXXX', options)
      this.commentModel = new CommentsModel();
      this.commentModel.options = options;
    },  
    events: {
      'click .add-comment': 'postComment'
    },
    postComment: function (ev) {
      var that = this;
      this.commentModel.set({
        comment: $('.comment-input').val()
      });

       
      this.commentModel.save({}, {
        success: function () {
          console.log("rofl");
          that.render();
        }
      }, this.options)
      return false;
    },
    editMethod: function (ev) {
      return false;
    },
    render: function () {
      var that = this;
      this.$el.html(_.template(commentsTemplate, {errors: []}));
      var notification = new NotificationCollection();
      notification.options = that.options;
      $('.comments-list-container').html('aaaa');
      notification.fetch({
        success: function (notifications) {
          $('.comments-list-container').html(_.template(listTemplate, {_:_, notifications: notifications.models}));
        }
      })
    }
  });
  return CommentsWidget;
});

