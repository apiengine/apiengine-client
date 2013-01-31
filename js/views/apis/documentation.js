define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'vm',
  'mustache',
  'qtip',
  'models/session',
  'text!templates/apis/documentation.html',
  'models/api',
  'collections/methods',
  'views/resource/list',
  'views/methods/details',
  'models/api',
  'models/resource',
  'models/method',
  'libs/highlight/highlight',
  'views/forms/resource',
  'modal',
  'views/apis/overview',
  'views/modals/newmethod',
  'views/modals/newresource',
], function($, _, Backbone, Router, Vm,  Mustache, Qtip, Session, docsTemplate, ApiModel, MethodsCollection, ResourceListView, MethodDetailView, ApiModel, ResourceModel, MethodModel, hljs, ResourceForm, Modal, OverView, NewMethod, NewResource){
  var NewApiPage = Backbone.View.extend({
    el: '.api-page-container',
    initialize: function () {
      var that = this;

    },
    events: {
      'click .js-new-resource': 'newResource',
      'click .js-new-method': 'newMethod',
      'click .edit-api-description': 'editDescription'
    },
    editDescription: function(ev) {
      var modal = Modal.create({
        inline: {
        	from : $(ev.currentTarget),
        	model : this.options.model,
        	field : 'description'
        }
      });
      modal.show();
    },
    newResource: function () {
      console.log(this.options);
      var newResource = Vm.create(this, 'modal', NewResource, this.options);
      newResource.render();

      return false;
    },
    newMethod: function () {
      alert('new methods');
      return false;
    },
    saveMethod: function (ev) {
      var that = this;
      var methodData = $(ev.currentTarget).serializeObject();
      var methodModel = new MethodModel({
        username: this.options.username,
        version: this.options.version,
        api: this.options.apiname,
        resourceId: this.options.resourceId
      });
      methodModel.save(methodData, {
        success: function () {
          $('#js-new-method-modal').modal('hide');
          that.showMethodList();
        }
      });
      return false;
    },
    saveResource: function (ev) {
      var resourceData = $(ev.currentTarget).serializeObject();
      console.log(resourceData);
      var resourceModel = new ResourceModel({
        username: this.options.username,
        version: this.options.version,
        api: this.options.apiname
      });
      resourceModel.save(resourceData, {
        success: function () {
          console.log('oooo', arguments);
        }
      });
      return false;
    },
    showMethodList: function () {
      var that = this;
      var methodListView = new MethodsListView({username: that.options.username, api: that.options.apiname, version: that.options.version, resourceId: that.options.resourceId, method: that.options.method});
      methodListView.render();
    },
    showDetails: function () {
      var that = this;
       if(typeof that.options.resourceId === 'undefined') {
        var overview = Vm.create(that, 'apipage', OverView, that.options);
        overview.render();
      }
      if($('.resource-list-container').attr('data-api-id') !== that.options.apiname && $('.resource-list').length === 0) {
        var resourceListView = Vm.create(that, 'resourceListView', ResourceListView, that.options);
        resourceListView.render();
      };
    // if(typeof that.options.resourceId !== 'undefined' && $('.method-list-container').attr('data-resource-id') !== that.options.resourceId) {
    //   that.showMethodList();
    //}
    //  if(typeof that.options.method !== 'undefined') {
    //    var methodView = new MethodView({username: that.options.username, api: that.options.apiname, version: that.options.version, resourceId: that.options.resourceId, method: that.options.method});
    //     methodView.render();
    //  }
    },
    renderOverview: function () {

    },
    render: function (options) {
      if($('.api-details-container').length === 0) {
           var owner = Session.get('login') ===  this.options.username ? true : false;
              console.log(this.options, 'friday night');
      $('.api-container .tabs li.active').removeClass('active');
      $('.api-container .tabs .api-docs').addClass('active');
      this.$el.html(Mustache.render(docsTemplate, {api: this.options.apiname,user: this.options.username,version:this.options.version, owner: owner}));
      }
           this.showDetails();
    }
  });
  return NewApiPage;
});
