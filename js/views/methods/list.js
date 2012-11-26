define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'mustache',
  'models/session',
  'text!templates/methods/list.html',
  'views/forms/resource',
  'views/forms/method',
  'views/methods/details',
  'collections/methods',
  'models/method',
  'models/notificationtotal'
  ], function($, _, Backbone, Vm, Mustache, Session, resourceListTemplate, ResourceForm, MethodForm, MethodView, Methods, MethodModel, NTotals){
  var ApisPage = Backbone.View.extend({
    el: '.method-list-container',
    initialize: function () {
      var that = this;
      
    },
    events: {
      'click .js-edit-resource': 'editResource',
      'click [data-method-id]': 'showMethodView',
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
    showMethodView: function (ev) {
        var that = this;

      if(that.options.method || ev) {
        if(ev) {
          that.options.method = $(ev.currentTarget).attr('data-method-id');
        }
        var methodView = Vm.create(this, 'methodpageview', MethodView, {username: that.options.username, api: that.options.api, version: that.options.version, resourceId: that.options.resourceId, method: that.options.method});
        methodView.render();  
      }
    },
    render: function () {
      var that = this;
      this.methods = new Methods();
      this.resource = new MethodModel();
      that.$el.attr('data-resource-id', that.options.resourceId);
      that.$el.fadeIn(200);

      this.resource.set({
        username: that.options.username,
        api: that.options.api,
        version: that.options.version,
        resourceId: that.options.resourceId
      });
      this.resource.fetch();
      this.methods.username = that.options.username;
      this.methods.api = that.options.api;
      this.methods.version = that.options.version;
      this.methods.resourceId = that.options.resourceId;
        this.methods.fetch({
          success: function (methods) {
            //that.$el.fadeIn(200);
            //methods.get(that.options.method).set({active: 'active'})
            $('.method-sublist-container', that.$el).html(Mustache.render(resourceListTemplate, {_:_, is_public: that.options.is_public, methods: methods.models, username: Session.get('login'), location: that.options.location}));

            var notificationTotals = new NTotals();
            notificationTotals.options = that.options;
            notificationTotals.fetch({
              success: function (model) {
                var notifEl = $('.method-notification[data-resource-id='+model.options.resourceId+']');
                if(model.get('resource') !== 0){                  
                notifEl.text(model.get('resource')).show();
                }
                _.each(model.get('methods'), function(method){
                  var anotifEl = $('.method-notification[data-method-id='+method.key+']');
                  anotifEl.text(method.count).show();

                });
              }
            });

            console.log(that.options.method);
            if(typeof that.options.method !== 'undefined') {
              that.showMethodView();
            }
          }
        });

      
    }
  });
  return ApisPage;
});
