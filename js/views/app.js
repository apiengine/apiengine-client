define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
	'events',
  'models/session',
  'text!templates/layout.html',
  'views/header/account-menu',
  'views/header/header'
], function($, _, Backbone, Vm, Events, Session, layoutTemplate, AccountMenu, HeaderView){
  var AppView = Backbone.View.extend({
    el: 'body',
    initialize: function () {
      
      // This snipper should usually be loaded elsewhere
      // It simply takes a <form> and converts its values to an object
      $.fn.serializeObject = function() {
          var o = {};
          var a = this.serializeArray();
          $.each(a, function() {
              if (o[this.name] !== undefined) {
                  if (!o[this.name].push) {
                      o[this.name] = [o[this.name]];
                  }
                  o[this.name].push(this.value || '');
              } else {
                  o[this.name] = this.value || '';
              }
          });
          return o;
      };
    


      $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        // Your server goes below
      //  if(Session.get('auth') || options.url.indexOf('session') !== -1) {
        console.log(options.url);
        options.url = 'http://altz.apiengine.io' + options.url;
        //options.url = 'http://192.168.2.111:3000' + options.url;
      //  } else {
        //options.url = 'http://d3gscmgl75g1oq.cloudfront.net' + options.url;
         

       // };

      });
    
    },
    render: function () {

			var that = this;
      $(this.el).html(layoutTemplate);      
      Session.getAuth(function () {
        $('body').on('click', 'a', function (e) {
          clicky.log($(this).attr('href'), $(this).attr('href'), 'pageview')
          console.log('yooo', $(this).attr('href'), $(this).attr('href'), 'pageview')
          Backbone.router.navigate($(this).attr('href'), true);
          return false;
        });
    
      var headerView = new HeaderView();
      headerView.render();
        var root = '/';
        if(window.location.hostname === 'localhost') {
          root = '/repos/apiengine-client/';
        }
        Backbone.history.start({pushState: true, root: root});
      });    


//$.ajax('http://d3gscmgl75g1oq.cloudfront.net/user/thomasdavis/api/ApiEngine/1/resource/8', {
  //success: function () {console.log(arguments);}
//});
		} 
	});
  return AppView;
});
