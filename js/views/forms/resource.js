define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'models/session',
  'text!templates/resource/edit.html',
  'models/resource'
  ], function($, _, Backbone, Vm, Session, resourceEditTemplate, ResourceModel){
  var ResourceForm = Backbone.View.extend({
    el: 'body',
    initialize: function () {
      var that = this;
      this.resource = this.options.resource;
      if(typeof this.resource === 'undefined') {
        this.resource = new ResourceModel({
          username: this.options.username,
          version: this.options.version,
          apiname: this.options.api
        });
      }
    },
    events: {
      'submit .js-new-resource-form': 'saveResource'
    },
    saveResource: function (ev) {
      var resourceData = $(ev.currentTarget).serializeObject();
      console.log(this.resource);
      this.resource.save(resourceData, {
        success: function () {
          console.log('oooo', arguments);
        }
      });
      return false;
    },
    render: function () {
      $('body').append(_.template(resourceEditTemplate, {resource: this.resource}));
      $('#js-new-resource-modal').modal('show');

    }
  });
  return ResourceForm;
});
