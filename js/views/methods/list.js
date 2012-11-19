define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'models/session',
  'text!templates/methods/list.html',
  'views/forms/resource',
  'views/forms/method',
  'views/methods/details',
  'collections/methods',
  'models/method',
  'models/notificationtotal'
  ], function($, _, Backbone, Vm, Session, resourceListTemplate, ResourceForm, MethodForm, MethodView, Methods, MethodModel, NTotals){
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
      if(ev) {
        console.log('ooo')
        that.options.method = $(ev.currentTarget).attr('data-method-id');
      }
      var methodView = Vm.create(this, 'methodpageview', MethodView, {username: that.options.username, api: that.options.api, version: that.options.version, resourceId: that.options.resourceId, method: that.options.method});
      methodView.render();  
    },
    render: function () {
      console.log(this.options.method, 'WHY IS THERE NO DAMN METHOD');
      console.log(this.el, 'BLAH BLAH BLAH');
      var that = this;
      this.methods = new Methods();
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
            console.log(that.$el, 'what the fuck is going on');
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
            console.log(that.$el, 'what the fuck is going on');

        this.methods.fetch({
          success: function (methods) {
            //that.$el.fadeIn(200);

            var notificationTotals = new NTotals();
            notificationTotals.options = that.options;
            notificationTotals.fetch({
              success: function (model) {
                var notifEl = $('.method_notification[data-resource-id='+model.options.resourceId+']');
                if(model.get('resource') !== 0){                  
                notifEl.text(model.get('resource')).show();
                }
                _.each(model.get('methods'), function(method){
                  var anotifEl = $('.method_notification[data-method-id='+method.key+']');
                  anotifEl.text(method.count).show();

                });
              }
            });

            $('.method-sublist-container', that.$el).html(_.template(resourceListTemplate, {_:_, is_public: that.options.is_public, methods: methods, username: Session.get('login'), selectedMethod: that.options.method, location: that.options.location}));
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
