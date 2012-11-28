define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'mustache',
  'modal',
  'text!templates/modals/newresource.html'
], function($, _, Backbone, Session, Mustache, Modal, resourceModal){
  var NewResource = Backbone.View.extend({
    el: '.header',
    initialize: function () {
    },
    render: function () {
      this.modal = Modal.create({
        content: resourceModal
      });
      $('.modal input')[0].focus();


    }
  });
  return NewResource;
});
