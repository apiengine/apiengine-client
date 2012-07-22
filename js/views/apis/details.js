define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'router',
  'vm',
  'models/session',
  'text!templates/apis/details.html',
  'models/api',
  'collections/methods',
  'views/methods/list',
  'views/resource/list',
  'views/methods/details',
  'models/api',
  'models/resource',
  'models/method',
  'libs/highlight/highlight',
  'views/methods/details'
], function($, _, Backbone, Bootstrap, Router, Vm, Session, apiDetailsTemplate, ApiModel, MethodsCollection, MethodsListView, ResourceListView, MethodDetailView, ApiModel, ResourceModel, MethodModel, hljs, MethodView){
  var NewApiPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      
    },  
    events: {
      'click .js-new-resource': 'newResource',
      'click .js-new-method': 'newMethod',
      'submit .js-new-resource-form': 'saveResource',
      'submit .js-new-method-form': 'saveMethod'
    },
    newResource: function () {
      $('#js-new-resource-modal').modal('show');
      return false;
    },
    newMethod: function () {
      $('#js-new-method-modal').modal('show');
      return false;
    },
    saveMethod: function (ev) {
      var methodData = $(ev.currentTarget).serializeObject();
      console.log(methodData);
      var methodModel = new MethodModel({
        username: this.options.username,
        version: this.options.version,
        api: this.options.apiname,
        resourceId: 1
      });
      methodModel.save(methodData, {
        success: function () {
          console.log('oooo', arguments);
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
    render: function () { 
      var that = this;

      if($('.api-methods-container').length === 0) {
        this.$el.html('Loading API');
        var apiModel = new ApiModel({username: this.options.username, apiname: this.options.apiname, version: this.options.version});


        apiModel.fetch({
          success: function (api) {
            console.log('hljf' , hljs)
            that.$el.html(_.template(apiDetailsTemplate, {api: api, errors: []}));
              
            $('code').each(function(i, e) {hljs.highlightBlock(e); });
              $('.js-api-pages a').click(function (e) {
              e.preventDefault();
              $(this).tab('show');
            });
            var resourceListView = new ResourceListView({username: that.options.username, api: that.options.apiname, version: that.options.version});
            resourceListView.render();
            if(typeof that.options.resourceId !== 'undefined') {
              var methodListView = new MethodsListView({username: that.options.username, api: that.options.apiname, version: that.options.version, resourceId: that.options.resourceId});
              methodListView.render();              
            }
            if(typeof that.options.method !== 'undefined') {
              var methodView = new MethodView({username: that.options.username, api: that.options.apiname, version: that.options.version, resourceId: that.options.resourceId, method: that.options.method});
              methodView.render();              
            }            
             /*
            var owner = false;
            if(Session.get('user_id') === api.get('UserId')){
              owner = true;
            }
              that.$el.html(_.template(apiDetailsTemplate, {api: api, errors: []}));
              var methodsListView = Vm.create(that, 'methodslistview', MethodsListView, {apiId: that.options.apiId, owner: owner});
              methodsListView.render();
            
             if(typeof that.options.methodId !== 'undefined') {
                var methodDetailView = Vm.create(that, 'methoddetailview', MethodDetailView, {methodId: that.options.methodId, apiId: that.options.apiId, owner: owner});
                methodDetailView.render();
             }
             */
          }
        })
      } else {
        /*
         var owner = false;
          if(Session.get('user_id')*1 === $('.api-methods-container').attr('data-user-id')*1){
            owner = true;
          }
        if(typeof that.options.methodId !== 'undefined') {
          var methodDetailView = Vm.create(that, 'methoddetailview', MethodDetailView, {methodId: that.options.methodId, apiId: that.options.apiId, owner: owner});
          methodDetailView.render();
        }*/
      }

    }
  });
  return NewApiPage;
});
