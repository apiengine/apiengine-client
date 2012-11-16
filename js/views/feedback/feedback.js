define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'modal',
  'text!templates/modals/feedback.html'
], function($, _, Backbone, Session, Modal, feedbackTemplate){
  var Feedback = Backbone.View.extend({
    el: 'body',
    initialize: function () {
    },
    render: function () {
      this.modal = Modal.create({
        content: feedbackTemplate
      });
    },
    events: {

    },
      newapi: function (ev) {
      return false;     
    }
  });
  return Feedback;
});
