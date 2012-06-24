define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/methods/list.html',
  'collections/methods'
], function($, _, Backbone, Session, methodsListTemplate, MethodsCollection){
  var UsersPage = Backbone.View.extend({
    el: '.api-methods-container',
    initialize: function () {
      var that = this;
      
    },
    render: function () {
      var that = this;
      this.$el.html('Loading');

      var methodsCollection =  new MethodsCollection();
      methodsCollection.apiId = this.options.apiId;
      methodsCollection.fetch({
        success: function (collection) {
          that.$el.html(_.template(methodsListTemplate, {apiId: that.options.apiId, methods: collection.models}));
        }
      })
    }
  });
  return UsersPage;
});
