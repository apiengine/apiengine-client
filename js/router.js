// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
	'vm'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {

      '/apis/edit/:id': 'editApi',
      '/apis/edit': 'editApi',
      '/apis/:id': 'showApi',
      '/apis/:id/method/:method_id': 'showApi',
      '/apis/:id/methods/edit': 'editMethod',
      '*actions': 'defaultAction' // All urls will trigger this route
    }
  });

  var initialize = function(options){
    
		var appView = options.appView;
    var router = new AppRouter(options);


    router.on('route:showApi', function (apiId, methodId) {
      require(['views/apis/details'], function (ApiDetailsView) {
        var apiDetailsView = Vm.create(appView, 'ApiDetailsView', ApiDetailsView, {apiId: apiId, methodId: methodId});
        apiDetailsView.render();
      });
    });

    router.on('route:editApi', function (actions) {
      require(['views/apis/edit'], function (EditApiView) {
        var editApiView = Vm.create(appView, 'EditApiView', EditApiView);
        editApiView.render();
      });
    });
    router.on('route:editMethod', function (apiId) {
      require(['views/methods/edit'], function (EditMethodView) {
        var editMethodView = Vm.create(appView, 'EditMethodView', EditMethodView, {apiId: apiId});
        editMethodView.render();
      });
    });
    
		router.on('route:defaultAction', function (actions) {
			require(['views/home/page'], function (HomePage) {
        var homePage = Vm.create(appView, 'HomePage', HomePage);
        homePage.render();
      });
		});
    
  };
  return {
    initialize: initialize
  };
});
