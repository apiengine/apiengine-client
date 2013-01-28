define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'vm',
  'mustache',
  'qtip',
  'models/session',
  'text!templates/apis/details.html',
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
  'text!templates/modals/inlineedit.html',
  'views/apis/overview',
  'views/apis/tablelist'
], function($, _, Backbone, Router, Vm,  Mustache, Qtip, Session, apiDetailsTemplate, ApiModel, MethodsCollection, ResourceListView, MethodDetailView, ApiModel, ResourceModel, MethodModel, hljs, ResourceForm, Modal, edt, OverView, TableList){
  var NewApiPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;

    },
    events: {
      'click .js-new-resource': 'newResource',
      'click .js-new-method': 'newMethod',
      'click .api-description': 'editDescription'
    },
    editDescription: function(ev) {
      var modal = Modal.create({
        content: edt,
        inline: {
          from: $(ev.currentTarget),
          to: '.xx'
        }
      });
      $('.editdescription').on('submit', function(ev) {
        console.log('asd');
        var api = new ApiModel({
          username: 'thomasdavis',
          apiname: 'ApiEngine',
          version: 1
        });
        var apiDetails = $(ev.currentTarget).serializeObject();
        apiDetails.name = 'ApiEngine';
        api.save(apiDetails, {
          success: function (model) {

          }
        })
        return false;
      });
      window.modal = modal;
    },
    newResource: function () {
      var resourceForm = Vm.create(this, 'resourceform', ResourceForm, {
        username: this.options.username,
        version: this.options.version,
        api: this.options.apiname
      });
      resourceForm.render();

      return false;
    },
    newMethod: function () {
      $('#js-new-method-modal').modal('show');
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
      if($('.resource-list-container').attr('data-api-id') !== that.options.apiname) {
        var resourceListView = Vm.create(that, 'resourceListView', ResourceListView, {username: that.options.username, api: that.options.apiname, version: that.options.version, resourceId: that.options.resourceId, method: that.options.method});
        resourceListView.render();
        console.log('show list container');
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
    render: function () {
      var that = this;
      console.log('re-render');
      if($('.api-container').length === 0) {
        this.$el.html('');

        var apiModel = new ApiModel({username: this.options.username, apiname: this.options.apiname, version: this.options.version});

        apiModel.fetch({
          success: function (api) {
            console.log('hljf' , hljs)
            if($('.api-container').length === 0) {
              var owner = Session.get('login') === api.get('user') ? true : false;
              that.$el.html(Mustache.render(apiDetailsTemplate, {api: api, errors: [], owner: owner}));


              $('code').each(function(i, e) {hljs.highlightBlock(e); });
                $('.js-api-pages a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
              });
            };

            that.showDetails();
          }
        })
      } else {

         that.showDetails();

      }

    }
  });
  return NewApiPage;
});
