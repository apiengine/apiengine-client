define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'models/session',
  'text!templates/methods/edit.html',
  'models/method'
  ], function($, _, Backbone, Vm, Session, methodEditTemplate, MethodModel){
  var ResourceForm = Backbone.View.extend({
    el: 'body',
    initialize: function () {
      var that = this;
      this.method = this.options.method;
      if(typeof this.options.method === 'undefined') {
        this.method = new MethodModel({}, {
          username: this.options.username,
          version: this.options.version,
          apiname: this.options.api,
          resourceId: this.options.resourceId
        });
      }
    },
    events: {
      'submit .js-new-method-form': 'saveMethod'
    },
    saveMethod: function (ev) {
      var that = this;
      var methodData = $(ev.currentTarget).serializeObject();
      console.log(this.method);
      this.method.save(methodData, {
        success: function () {
          $('#js-new-method-modal').modal('hide');
        }
      });
      return false;
    },
    render: function () {
      var methodTypes = ['POST', 'GET', 'DELETE', 'PUT'];
      $('body').append(_.template(methodEditTemplate, {methodTypes: methodTypes, method: this.method}));
      $('#js-new-method-modal').modal('show');

    }
  });
  return ResourceForm;
});
