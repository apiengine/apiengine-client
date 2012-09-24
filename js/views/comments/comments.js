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
      this.commentModel = new CommentsModel();
      this.commentModel.options = options;
    },  
    events: {
      'click .add-comment': 'postComment',
      'focus .comment-input': 'prepareComment',
      'blur .comment-input': 'unprepareComment'
    },
    prepareComment: function (ev) {
      $('.comment-input').animate({
        height: '80px',
        "margin-bottom": '20px'
      }, 250, function () {
        $('.add-comment').fadeIn(450);

      })
    },
    unprepareComment: function (ev) {
        $('.add-comment').fadeOut(250, function () {
          $('.comment-input').animate({
            height: '40px',
            "margin-bottom": '0px'
          }, 250);
        });

    },
    postComment: function (ev) {
      var that = this;
      this.commentModel.set({
        comment: $('.comment-input').val()
      });

       
      this.commentModel.save({}, {
        success: function () {
        $('.comment-input').val('');
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
          $('.timeago').timeago();
        }
      })
    }
  });
  return CommentsWidget;
});

