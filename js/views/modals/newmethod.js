define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'mustache',
  'modal',
  'text!templates/modals/newmethod.html',
  'models/method'
], function($, _, Backbone, Session, Mustache, Modal, methodModal, Method){
  var NewMethod = Backbone.View.extend({
    el: 'body',
    initialize: function () {
    },
    events: {
      'submit .new-resource-form': 'newMethod'
    },
    newMethod: function (ev) {
      var that = this;
      var details = $(ev.currentTarget).serializeObject();
      var method = new Method();
      method.options = this.options;
      var request = method.save(details, {success:function (model) {
          Backbone.history.navigate(that.options.username + '/' + that.options.apiname + '/version/' + that.options.version + '/resource/' + this.options.resourceId + '/' + model.get('method'), {trigger: true});
          that.modal.hide();
      }});
      return false;
    },
    render: function () {
      this.modal = Modal.create({
        content: methodModal
      });
      $('.modal input')[0].focus();
    }
  });
  return NewMethod;
});
