define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'mustache',
  'modal',
  'text!templates/modals/newresource.html',
  'models/resource'
], function($, _, Backbone, Session, Mustache, Modal, resourceModal, Resource){
  var NewResource = Backbone.View.extend({
    el: 'body',
    initialize: function () {
    },
    events: {
      'submit .new-resource-form': 'newResource'
    },
    newResource: function (ev) {
      var that = this;
      var details = $(ev.currentTarget).serializeObject();
      var resource = new Resource();
      resource.options = this.options;
      var request = resource.save(details, {success:function () {
        console.log(request);
          that.modal.hide();

         // Backbone.router.navigate(session.get('login') + '/' + that.options.apiname + '/' + that.options.version + '/resource/' + deta, {trigger: true});
      }});
      return false;
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
