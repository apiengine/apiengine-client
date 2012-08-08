define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'models/session',
  'text!templates/resource/list.html',
  'collections/resources',
  'views/methods/list',
  'models/resource'
], function($, _, Backbone, bootstrap, Session, resourceListTemplate, ResourcesCollection, MethodsListView, ResourceModel){
  var ApisPage = Backbone.View.extend({
    el: '.resource-list-container',
    initialize: function () {
      var that = this;
      
    },
    events: {
      'click [data-resource-id]': 'showMethodList'
    },
    showMethodList: function (ev) {
      var that = this;
      if(ev) {
        this.options.resourceId = $(ev.currentTarget).attr('data-resource-id');
      }
      var methodListView = new MethodsListView({username: that.options.username, api: that.options.api, version: that.options.version, resourceId: that.options.resourceId, method: that.options.method});
      methodListView.render();  
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
          console.log('hey', collection);
          console.log(that.options.resourceId);
          that.$el.html(_.template(resourceListTemplate, {_:_, selectedResource: that.options.resourceId, is_public: that.options.is_public, resources: collection, username: Session.get('login'), location: that.options.location}));
          $('.js-api-filter').button();
          //if(typeof that.options.resourceId !== 'undefined' && $('.method-list-container').attr('data-resource-id') !== that.options.resourceId) {
         //   that.showMethodList();           
          //}
          that.showMethodList();  
        }
      });

      
    }
  });
  return ApisPage;
});
