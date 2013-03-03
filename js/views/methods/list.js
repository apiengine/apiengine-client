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
  'views/methods/page',
  'collections/methods',
  'models/resource',
  'models/notificationtotal'
  ], function($, _, Backbone, Vm, Mustache, Session, resourceListTemplate, ResourceForm, MethodForm, MethodView, Methods, ResourceModel, NTotals){
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

      // re-request resource only if necessary
      if (that.options.resource) {
      	  this.resource = that.options.resource;
      } else {
	      this.resource = new ResourceModel();
	      this.resource.options = {
	        username: that.options.username,
	        apiname: that.options.apiname,
	        version: that.options.version,
	        resourceId: that.options.resourceId
	      };
	      this.resource.fetch();
	  }
      that.$el.attr('data-resource-id', that.options.resourceId);
      that.$el.fadeIn(200);

      this.methods.username = that.options.username;
      this.methods.apiname = that.options.apiname;
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
                var notifEla = $('.resource-notification[data-resource-id='+model.options.resourceId+']');
                var methodTotals = 0;
                _.each(model.get('methods'), function(method){
                  var anotifEl = $('.method-notification[data-method-id='+method.key+']');
                  methodTotals += method.count*1;
                  anotifEl.text(method.count).show();
                });
                notifEla.attr('data-method-totals', methodTotals);
               $(notifEla).text($(notifEla).attr('data-method-totals')).show(200);
                if(model.get('resource') !== 0){
                  notifEla.text(model.get('resource')).show();
                }
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
