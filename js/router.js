// Filename: router.js
define([
  'require',
  'jquery',
  'underscore',
  'backbone',
	'vm',
  'views/apis/page',
  'views/browse/page',
  'views/home/forgot_password',
  'views/apis/edit',
  'views/methods/edit',
  'views/profile/page'
], function (require, $, _, Backbone, Vm,ApiPageView,BrowseView,ForgotView,EditApiView,EditMethodView,ProfilePage) {
  var AppRouter = Backbone.Router.extend({
    routes: {

      'apis/edit/:id': 'editApi',
      'apis/edit': 'editApi',
      'apis/:id': 'showApi',
      'apis/:id/method/:method_id': 'showApi',
      'apis/:id/methods/edit': 'editMethod',
      'login': 'login',
      'legal/:page': 'legal',
      'browse': 'browse',
      'members': 'members',
      'forgot_password/*token': 'forgot_password',
      'forgot_password': 'forgot_password',
      'register': 'register',
      'features': 'features',
      'pricing': 'pricing',
      '': 'home',
      ':username/:apiname/version/:version/resource/:resource/:method': 'apiPage',
      ':username/:apiname/version/:version/resource/:resource': 'apiPage',
      ':username/:apiname/version/:version': 'apiPage',
      ':username/:apiname/settings/:page': 'apiSettingsPage',
      ':username/settings/:page': 'settingsTab',
      ':username/:apiname/collaborators': 'collaboratorsTab',
      ':username': 'defaultAction' // All urls will trigger this route
    }
  });

  var initialize = function(options){
    
		var appView = options.appView;
    var router = new AppRouter(options);
    Backbone.router = router;
    router.on('route:apiPage', function (username, apiname, version, resourceId, method) {
        var apiDetailsView = Vm.create(appView, 'page', ApiPageView, {username: username, apiname: apiname, version: version, resourceId: resourceId, method: method});
        apiDetailsView.render();
    });

    router.on('route:collaboratorsTab', function (username, apiname) {
        var apiDetailsView = Vm.create(appView, 'page', ApiPageView, {username: username, apiname: apiname, collaborators: true});
        apiDetailsView.render();
    });
    router.on('route:apiSettingsPage', function (username, apiname, page) {
        var apiDetailsView = Vm.create(appView, 'page', ApiPageView, {username: username, apiname: apiname, page: page, settings: true});
        apiDetailsView.render();
    });
    /*
    router.on('route:login', function (apiId) {
        var loginView = Vm.create(appView, 'LoginView', LoginView, {});
        loginView.render();
    });
*/
    router.on('route:browse', function () {
        var browseView = Vm.create(appView, 'page', BrowseView, {});
        browseView.render();
    });
    /*
    router.on('route:members', function () {
        var membersView = Vm.create(appView, 'MembersView', MembersView, {});
        membersView.render();
    });
    */ 
    router.on('route:forgot_password', function (token) {
        var forgotView = Vm.create(appView, 'page', ForgotView, {token: token});
        forgotView.render();
    }); 
    /*
    router.on('route:register', function (apiId) {
        var registerView = Vm.create(appView, 'RegisterView', RegisterView, {});
        registerView.render();
    });
    */      
    router.on('route:showApi', function (apiId, methodId) {
        var apiDetailsView = Vm.create(appView, 'page', ApiDetailsView, {apiId: apiId, methodId: methodId});
        apiDetailsView.render();
    });

    router.on('route:editApi', function (actions) {
        var editApiView = Vm.create(appView, 'page', EditMethodViewitApiView);
        editApiView.render();
    });
    router.on('route:editMethod', function (apiId) {
        var editMethodView = Vm.create(appView, 'page', EditMethodView, {apiId: apiId});
        editMethodView.render();
    });
    router.on('route:home', function () {
      console.log('home');
      require(['views/home/page'], function (HomeView) {
        var homeView = Vm.create(appView, 'page', HomeView, {});
        homeView.render();
      });
    });
    router.on('route:features', function () {
      require(['views/home/features'], function (Features) {
        var features = Vm.create(appView, 'page', Features, {});
        features.render();
      });
    });
    router.on('route:legal', function (page) {
      require(['views/legal/page'], function (Legal) {
        var legalPage = Vm.create(appView, 'page', Legal, {page:page});
        legalPage.render();
      });
    });
    router.on('route:pricing', function () {
      require(['views/home/pricing'], function (Pricing) {
        var pricing = Vm.create(appView, 'page', Pricing, {});
        pricing.render();
      });
    });        
		router.on('route:defaultAction', function (username) {
        var profilePage = Vm.create(appView, 'page', ProfilePage, {username: username});
        profilePage.render();
		});

    router.on('route:settingsTab', function (username, page) {
        var profilePage = Vm.create(appView, 'page', ProfilePage, {username: username, tab: 'settings', setting: page});
        profilePage.render();
    });
   
  };
  return {
    initialize: initialize
  };
});
