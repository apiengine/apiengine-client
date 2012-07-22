define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/methods/details.html',
  'models/method'
], function($, _, Backbone, Router, Session, methodTemplate, MethodModel){
  var MethodDetailsView = Backbone.View.extend({
    el: '.method-container',
    initialize: function () {
      var that = this;
      
    },  
   
    render: function () {
      var that = this;
      var methodModel = new MethodModel();
      methodModel.set({
        method: this.options.method,
        version: this.options.version,
        api: this.options.api,
        username: this.options.username,
        resourceId: this.options.resourceId
      });
      methodModel.fetch({
        success: function(model) {
          that.$el.html(_.template(methodTemplate, {method: model}));

        }
      })
    }
  });
  return MethodDetailsView;
});
