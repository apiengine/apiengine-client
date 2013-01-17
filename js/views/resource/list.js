define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'mustache',
  'models/session',
  'text!templates/resource/list.html',
  'collections/resources',
  'views/methods/list',
  'models/resource',
  'views/resource/page',
  'models/notificationtotal'
], function($, _, Backbone, Vm, Mustache, Session, resourceListTemplate, ResourcesCollection, MethodsListView, ResourceModel, ResourcePageView, NTotals){
  var ApisPage = Backbone.View.extend({
    el: '.resource-list-container',
    initialize: function () {
      var that = this;
      
    },
    events: {
      'click a[data-resource-id]': 'showMethodList',
      'click .expand': 'expandMethodsHandler',
      'click .expanded': 'contractMethods'
    },
    showMethodList: function (ev) {
      var that = this;
      if(ev){
        var el = $(ev.currentTarget);
        this.options.resourceId = $(el).attr('data-resource-id');
        this.options.method = null;
      } else {
       var el = $('[data-resource-id=' + this.options.resourceId + ']');
      }
      if(el.length > 0) { 
        this.expandMethods($(el).parents('li[data-resource-id]'));
      }
      
      //var methodListView = new MethodsListView({username: that.options.username, api: that.options.api, version: that.options.version, resourceId: that.options.resourceId, method: that.options.method});
      //methodListView.render();        
      var resourcePageView = Vm.create(this, 'resourcepageview', ResourcePageView, that.options);
      resourcePageView.render();  
    },
    expandMethodsHandler: function (ev) {
        $(ev.currentTarget).text('-');
        $(ev).addClass('expanded');
        var ele = $(ev.currentTarget).parents('li[data-resource-id]');
        this.expandMethods(ele);
    },
    expandMethods: function (ele) {   
      var resourceId = $(ele).attr('data-resource-id');
      var el =  $(ele).next('li');
      var methodListView = Vm.create(this, 'methodlist'+this.options.resourceId, MethodsListView, {username: this.options.username, apiname: this.options.apiname, version: this.options.version, resourceId: resourceId, method: this.options.method, el: el});
      methodListView.setElement(el);
      methodListView.render();    
    },
    contractMethods: function (ev) {
      $(ev.currentTarget).removeClass('expanded');
      $('.resource-submenu').fadeOut(200);
    },
    render: function () {
      var that = this;
      var resources = new ResourcesCollection();
      resources.username = that.options.username;
      resources.apiname = that.options.apiname;
      resources.version = that.options.version;
      that.$el.attr('data-api-id', that.options.apiname);
      resources.fetch({
        success: function (collection) {
          if(that.options.resourceId) {
            
          collection.get(that.options.resourceId).set({active: 'active'});
          }
          that.$el.html(Mustache.render(resourceListTemplate, {_:_, selectedResource: that.options.resourceId, is_public: that.options.is_public, resources: collection, username: Session.get('login'), location: that.options.location}));
          if(typeof that.options.resourceId !== 'undefined') { //&& $('.method-list-container').attr('data-resource-id') !== that.options.resourceId) {
             that.showMethodList();           
          }
          //that.showMethodList();  

          var notificationTotals = new NTotals();
          notificationTotals.options = {
            api: that.options.apiname,
            version: that.options.version,
            username: that.options.username
          };
          notificationTotals.fetch({
            success: function (model) {
              console.log('I dont know what to do', model);
              //var notifEl = $('.notification[data-resource-id='+model.options.resourceId+']');
             // notifEl.text(model.get('resource')).show();
              _.each(model.get('resources'), function(method){
                console.log(method,'wtf is this');
                if(method.count > 0) {
                  var anotifEl = $('.resource-notification[data-resource-id='+method.key+']');
                  anotifEl.text(method.count).show();
                }

              });
            }
          });




        }
      });

      
    }
  });
  return ApisPage;
});
