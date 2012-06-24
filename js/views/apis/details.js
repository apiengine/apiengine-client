define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'vm',
  'models/session',
  'text!templates/apis/details.html',
  'models/api',
  'collections/methods',
  'views/methods/list',
  'views/methods/details',
  'models/api'
], function($, _, Backbone, Router, Vm, Session, apiDetailsTemplate, ApiModel, MethodsCollection, MethodsListView, MethodDetailView, ApiModel){
  var NewApiPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      
    },  
    events: {
    },

    render: function () { 
      var that = this;

      if($('.api-methods-container').length === 0) {
        this.$el.html('Loading API');
        var apiModel = new ApiModel({id: this.options.apiId});
        apiModel.fetch({
          success: function (api) {
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
          }
        })
      } else {
         var owner = false;
          if(Session.get('user_id')*1 === $('.api-methods-container').attr('data-user-id')*1){
            owner = true;
          }
        if(typeof that.options.methodId !== 'undefined') {
          var methodDetailView = Vm.create(that, 'methoddetailview', MethodDetailView, {methodId: that.options.methodId, apiId: that.options.apiId, owner: owner});
          methodDetailView.render();
        }
      }
    }
  });
  return NewApiPage;
});
