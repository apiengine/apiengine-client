define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/apis/list.html',
  'collections/apis'
], function($, _, Backbone, Session, apisListTemplate, ApisCollection){
  var ApisPage = Backbone.View.extend({
    el: '.private-container',
    initialize: function () {
      var that = this;
      
    },
    render: function () {
      var that = this;
      var apis = new ApisCollection();
      apis.is_public =  this.options.is_public;
      apis.fetch({
        success: function (collection) {
          that.$el.html(_.template(apisListTemplate, {_:_, is_public: that.options.is_public, apis: collection.models}));
        }
      });
    }
  });
  return ApisPage;
});
