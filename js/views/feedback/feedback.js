define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'modal',
  'text!templates/modals/feedback.html',
  'models/feedback'
], function($, _, Backbone, Session, Modal, feedbackTemplate, FeedbackModel){
  var Feedback = Backbone.View.extend({
    el: 'body',
    initialize: function () {
    },
    render: function () {
      this.modal = Modal.create({
        content: feedbackTemplate
      });
      $('.modal textarea').focus();
    },
    events: {
      'submit .feedback-form': 'submitFeedback'
    },
    submitFeedback: function (ev) {
      var that = this;
      $('[type="submit"]', $(ev.currentTarget)).attr('disabled', 'disabled');
      var details = $(ev.currentTarget).serializeObject();
      details.page = window.location.href;
      var feedbackModel = new FeedbackModel();
      feedbackModel.save(details, {
        success: function () {
          that.modal.hide();   
        }
      });
      return false;
    },
      newapi: function (ev) {
      return false;     
    }
  });
  return Feedback;
});
