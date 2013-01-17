define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'mustache',
  'modal',
  'models/session',
  'text!templates/comments/comments.html',
  'text!templates/comments/comment.html',
  'models/comments',
  'collections/notifications',
  'text!templates/comments/list.html',
  'text!templates/modals/markdown.html'
], function($, _, Backbone, Router, Mustache, Modal, Session, commentsTemplate, SingleComment, CommentsModel, NotificationCollection, listTemplate, MarkDownTemplate){
  var CommentsWidget = Backbone.View.extend({
    el: '.comments-container',
    initialize: function (options) {
      var that = this;
      this.commentModel = new CommentsModel();
      this.commentModel.options = options;
      console.log('what are we getting here', options)
    },  
    events: {
      'click .add-comment': 'postComment',
      'focus .comment-input': 'prepareComment',
      'blur .comment-input': 'unprepareComment',
      'click .markdown-help': 'markdownModal'
    },
    markdownModal: function () {
      var modal = new Modal.create({
        content: MarkDownTemplate
      })
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

       $('.comment-input').attr('disabled', 'disabled');
      this.commentModel.save({}, {
        success: function (comment) {
        $('.comment-input').val('');
        var attributes = {
          user: Session.get('user'),
          message: comment.get('comment'),
          created_at: new Date().toISOString()
        }
          $('.comments-list-container .comments').prepend(Mustache.render(SingleComment, {attributes: attributes}));
          $('.timeago').timeago();
       $('.comment-input').removeAttr('disabled');

          console.log("rofl");
          //that.render();
        }
      }, this.options)
      return false;
    },
    editMethod: function (ev) {
      return false;
    },
    render: function () {
      var that = this;
      
      this.$el.html(Mustache.render(commentsTemplate, {user: Session.get('user'), errors: []}));
      var notification = new NotificationCollection();
      notification.options = that.options;
      $('.comments-list-container').html('');
      notification.fetch({
        success: function (notifications) {
          $('.comments-list-container').html(Mustache.render(listTemplate, {user: Session.get('user'), _:_, notifications: notifications.models}, {comment: SingleComment}));
          $('.timeago').timeago();
        }
      })
    }
  });
  return CommentsWidget;
});

