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
      $('[type="submit"]', $(ev.currentTarget)).attr('disabled', 'disabled');
      var details = $(ev.currentTarget).serializeObject();
      details.page = window.location.href;
      var feedbackModel = new FeedbackModel();
      feedbackModel.save(details, {
        success: function () {
          $('.modal textarea').hide();
      $('[type="submit"]', $(ev.currentTarget)).hide();
      $('.btn-red', $(ev.currentTarget)).show();

          $('.thank-you').fadeIn(200);       
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
