// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
	'vm'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {

      'layouttest': 'layouttest',
      'apis/edit/:id': 'editApi',
      'apis/edit': 'editApi',
      'apis/:id': 'showApi',
      'apis/:id/method/:method_id': 'showApi',
      'apis/:id/methods/edit': 'editMethod',
      'login': 'login',
      'register': 'register',
      '': 'home',
      ':username/:apiname/version/:version/resource/:resource/:method': 'apiPage',
      ':username/:apiname/version/:version/resource/:resource': 'apiPage',
      ':username/:apiname/version/:version': 'apiPage',
      ':username': 'defaultAction' // All urls will trigger this route
    }
  });

  var initialize = function(options){
    
		var appView = options.appView;
    var router = new AppRouter(options);
    router.on('route:apiPage', function (username, apiname, version, resourceId, method) {
      require(['views/apis/details'], function (ApiDetailsView) {
        var apiDetailsView = Vm.create(appView, 'ApiDetailsView', ApiDetailsView, {username: username, apiname: apiname, version: version, resourceId: resourceId, method: method});
        apiDetailsView.render();
      });
    });
    router.on('route:layouttest', function (apiId, methodId) {
      require(['views/layouttest'], function (ApiDetailsView) {
        var apiDetailsView = Vm.create(appView, 'ApiDetailsView', ApiDetailsView, {});
        apiDetailsView.render();
      });
    });
    router.on('route:login', function (apiId) {
      require(['views/home/login'], function (LoginView) {
        var loginView = Vm.create(appView, 'LoginView', LoginView, {});
        loginView.render();
      });
    });
  
    router.on('route:register', function (apiId) {
      require(['views/home/register'], function (RegisterView) {
        var registerView = Vm.create(appView, 'RegisterView', RegisterView, {});
        registerView.render();
      });
    });      
    router.on('route:showApi', function (apiId, methodId) {
      require(['views/apis/details'], function (ApiDetailsView) {
        var apiDetailsView = Vm.create(appView, 'ApiDetailsView', ApiDetailsView, {apiId: apiId, methodId: methodId});
        apiDetailsView.render();
      });
    });

    router.on('route:editApi', function (actions) {
      require(['views/apis/edit'], function (EditApiView) {
        var editApiView = Vm.create(appView, 'EditApiView', EditMethodViewitApiView);
        editApiView.render();
      });
    });
    router.on('route:editMethod', function (apiId) {
      require(['views/methods/edit'], function (EditMethodView) {
        var editMethodView = Vm.create(appView, 'EditMethodView', EditMethodView, {apiId: apiId});
        editMethodView.render();
      });
    });
    router.on('route:home', function () {
      console.log('home');
      require(['views/home/page'], function (HomeView) {
        var homeView = Vm.create(appView, 'HomeView', HomeView, {});
        homeView.render();
      });
    });
        
		router.on('route:defaultAction', function (username) {
      console.log(username, 'errrr');
			require(['views/profile/page'], function (ProfilePage) {
        var profilePage = Vm.create(appView, 'ProfilePage', ProfilePage, {username: username});
        profilePage.render();
      });
		});
    
  };
  return {
    initialize: initialize
  };
});
