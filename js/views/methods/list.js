define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'models/session',
  'text!templates/methods/list.html',
  'collections/methods',
  'models/method'
  ], function($, _, Backbone, bootstrap, Session, resourceListTemplate, ResourcesCollection, MethodModel){
  var ApisPage = Backbone.View.extend({
    el: '.method-list-container',
    initialize: function () {
      var that = this;
      
    },
    render: function () {
      console.log('render methods');
      var that = this;
      var resources = new ResourcesCollection();
      var resource = new MethodModel();
      /*
      resources.username = that.options.username;
      resources.api = that.options.api;
      resources.version = that.options.version;
      resources.resourceId = that.options.resourceId;
      resources.fetch({
        success: function (collection) {
          console.log(collection);
          that.$el.html(_.template(resourceListTemplate, {_:_, is_public: that.options.is_public, methods: collection, username: Session.get('login'), location: that.options.location}));
          $('.js-api-filter').button();
        }
      });
      */
      that.$el.attr('data-resource-id', that.options.resourceId);

      resource.set({
        username: that.options.username,
        api: that.options.api,
        version: that.options.version,
        resourceId: that.options.resourceId
      });
      if($('.method-list-container').length !== 0) {

        resource.fetch({
          success: function (model) {
            console.log(model);
            that.$el.html(_.template(resourceListTemplate, {_:_, is_public: that.options.is_public, resource: model, username: Session.get('login'), location: that.options.location}));
            $('.js-api-filter').button();
          }
        });
      };

      
    }
  });
  return ApisPage;
});
