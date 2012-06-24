define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/methods/details.html',
  'models/method',
  'views/request/details'
], function($, _, Backbone, Router, Session, methodTemplate, MethodModel, RequestDetailsView){
  var MethodDetailsView = Backbone.View.extend({
    el: '.method-container',
    initialize: function () {
      var that = this;
      
    },  
    events: {
      'click .js-new-request': 'newRequest'
    },
    newRequest: function () {
      this.$el.append('<div class="new-request"></div>');
      var requestView = new RequestDetailsView();
      requestView.render();
    },
    render: function () {
      var that = this;
      this.$el.html('loading');
      var methodModel = new MethodModel({id: this.options.apiId});
      methodModel.fetch({
        success: function (method) {
          that.$el.html(_.template(methodTemplate, {method: method}));
        }
      });
    }
  });
  return MethodDetailsView;
});
