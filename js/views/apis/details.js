define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/apis/details.html',
  'models/api',
  'collections/methods',
  'views/methods/list',
  'views/methods/details'
], function($, _, Backbone, Router, Session, apiDetailsTemplate, ApiModel, MethodsCollection, MethodsListView, MethodDetailView){
  var NewApiPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      
    },  
    events: {
    },

    render: function () {
      var that = this;
      this.$el.html(_.template(apiDetailsTemplate, {errors: []}));
      var methodsListView = new MethodsListView({apiId: this.options.apiId});
      methodsListView.render();
      if(typeof this.options.methodId !== 'undefined') {
        var methodDetailView = new MethodDetailView({methodId: this.options.methodId});
        methodDetailView.render();
      }
    }
  });
  return NewApiPage;
});
