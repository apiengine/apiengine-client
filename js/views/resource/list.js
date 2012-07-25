define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'models/session',
  'text!templates/resource/list.html',
  'collections/resources',
  'models/resource'
], function($, _, Backbone, bootstrap, Session, resourceListTemplate, ResourcesCollection, ResourceModel){
  var ApisPage = Backbone.View.extend({
    el: '.resource-list-container',
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
          console.log(that.options.resourceId);
          that.$el.html(_.template(resourceListTemplate, {_:_, selectedResource: that.options.resourceId, is_public: that.options.is_public, resources: collection, username: Session.get('login'), location: that.options.location}));
          $('.js-api-filter').button();
        }
      });

      
    }
  });
  return ApisPage;
});
