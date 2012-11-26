define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'mustache',
  'models/session',
  'text!templates/resource/tablelist.html',
  'collections/resources',
  'views/methods/list',
  'models/resource',
  'views/resource/page',
  'models/notificationtotal'
], function($, _, Backbone, Vm, Mustache, Session, resourceListTemplate, ResourcesCollection, MethodsListView, ResourceModel, ResourcePageView, NTotals){
  var ApisPage = Backbone.View.extend({
    el: '.resource-tablelist-container',
    initialize: function () {
      var that = this;
      
    },
    render: function () {
      var that = this;
      var resources = new ResourcesCollection();
      resources.username = that.options.username;
      resources.api = that.options.api;
      resources.version = that.options.version;
      that.$el.attr('data-api-id', that.options.api);
      resources.fetch({
        success: function (collection) {
          if(that.options.resourceId) {
            collection.get(that.options.resourceId).set({active: 'active'});
          }
          that.$el.html(Mustache.render(resourceListTemplate, {_:_, selectedResource: that.options.resourceId, is_public: that.options.is_public, resources: collection.models, username: Session.get('login'), location: that.options.location}));
          if(typeof that.options.resourceId !== 'undefined') { //&& $('.method-list-container').attr('data-resource-id') !== that.options.resourceId) {
             that.showMethodList();           
          }
        }
      });

      
    }
  });
  return ApisPage;
});
