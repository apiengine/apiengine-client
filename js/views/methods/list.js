define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'vm',
  'models/session',
  'text!templates/methods/list.html',
  'views/forms/resource',
  'views/forms/method',
  'views/methods/details',
  'collections/methods',
  'models/method'
  ], function($, _, Backbone, bootstrap, Vm, Session, resourceListTemplate, ResourceForm, MethodForm, MethodView, ResourcesCollection, MethodModel){
  var ApisPage = Backbone.View.extend({
    el: '.method-list-container',
    initialize: function () {
      var that = this;
      
    },
    events: {
      'click .js-edit-resource': 'editResource',
      'click .js-new-method': 'newMethod'
    },
    newMethod: function () {
      var methodForm = Vm.create(this, 'methodform', MethodForm, {
        username: this.options.username,
        version: this.options.version,
        api: this.options.api,
        resourceId: this.options.resourceId
      });
      methodForm.render();
      return false;
    },
    editResource: function () {
      var resourceForm = Vm.create(this, 'resourceform', ResourceForm, {
        username: this.options.username,
        version: this.options.version,
        api: this.options.api,
        resource: this.resource
      });
      resourceForm.render();

      return false;
    },
    render: function () {
      var that = this;
      this.resource = new MethodModel();
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

      this.resource.set({
        username: that.options.username,
        api: that.options.api,
        version: that.options.version,
        resourceId: that.options.resourceId
      });
      if($('.method-list-container').length !== 0) {

        this.resource.fetch({
          success: function (model) {
            console.log(model);
            that.$el.html(_.template(resourceListTemplate, {_:_, is_public: that.options.is_public, resource: model, username: Session.get('login'), selectedMethod: that.options.method, location: that.options.location}));
            $('.js-api-filter').button();
            var methodView = new MethodView({username: that.options.username, api: that.options.api, version: that.options.version, resourceId: that.options.resourceId, method: that.options.method});
            methodView.render();  
          }
        });
      };

      
    }
  });
  return ApisPage;
});
