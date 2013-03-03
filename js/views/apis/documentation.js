define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'vm',
  'mustache',
  'qtip',
  'models/session',
  'text!templates/apis/docs.html',
  'models/api',
  'collections/methods',
  'views/resource/list',
  'views/methods/page',
  'views/resource/page',
  'models/resource',
  'models/method',
  'libs/highlight/highlight',
  'views/forms/resource',
  'modal',
  'views/apis/overview',
  'models/method',
  'views/modals/newresource',
], function($, _, Backbone, Router, Vm,  Mustache, Qtip, Session, docsTemplate, ApiModel, MethodsCollection, ResourceListView, MethodDetailView, ResourceDetailView, ResourceModel, MethodModel, hljs, ResourceForm, Modal, OverView, Method, NewResource){
  var NewApiPage = Backbone.View.extend({
    el: '.api-page-container',
    initialize: function () {
      var that = this;

    },
    events: {
      'click .js-new-resource': 'newResource',
      'click .js-new-method': 'newMethod'
    },

    /*------------- --actions -------------------*/

    newResource: function () {
      var resourceForm = Vm.create(this, 'resourceform', NewResource, {
        username: this.options.username,
        version: this.options.version,
        apiname: this.options.apiname
      });
      resourceForm.render();

      return false;
    },
    newMethod: function () {
      var that = this;

      this.modal = Modal.create({
        inline : {
        	from : $('.resource-list-container'),
        	cloneDOM : true
        }
      });

      return false;
    },
    saveMethod: function (ev) {
      var that = this;
      var methodData = $(ev.currentTarget).serializeObject();
      var methodModel = new MethodModel({}, {
        username: this.options.username,
        version: this.options.version,
        apiname: this.options.apiname,
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
        apiname: this.options.apiname
      });
      resourceModel.save(resourceData, {
        success: function () {
          console.log('oooo', arguments);
        }
      });
      return false;
    },

    /*--------------- UI -------------------*/

    showMethodList: function () {
      var that = this;
      var methodListView = new MethodsListView({username: that.options.username, apiname: that.options.apiname, version: that.options.version, resourceId: that.options.resourceId, method: that.options.method});
      methodListView.render();
    },
    renderPageBody: function () {
		if(typeof this.options.resourceId == 'undefined') {
			// overview page
			var overview = Vm.create(this, 'apitab', OverView, _.extend({parent : this.parent}, this.options));
	        overview.render();
		} else if (typeof this.options.method == 'undefined') {
			// resource page
			var resourceDetailView = new ResourceDetailView({username: this.options.username, apiname: this.options.apiname, version: this.options.version, resourceId: this.options.resourceId, method: this.options.method});
    		resourceDetailView.render();
		} else {
			// method page
			var methodDetailView = new MethodDetailView({username: this.options.username, apiname: this.options.apiname, version: this.options.version, resourceId: this.options.resourceId, method: this.options.method});
    		methodDetailView.render();
		}
    },
    render: function (options) {
    	this.options.parent.activateTab('api-docs');

        var owner = Session.get('login') ===  this.options.username ? true : false;
		this.$el.html(Mustache.render(docsTemplate, {api: this.options.apiname,user: this.options.username,version:this.options.version, owner: owner}));

		// main area
		this.renderPageBody();

		// sidebar
		var resourceListView = Vm.create(this, 'resourceListView', ResourceListView, this.options);
		resourceListView.render();
    }
  });
  return NewApiPage;
});
