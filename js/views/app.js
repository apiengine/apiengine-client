define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
	'events',
  'models/session',
  'text!templates/layout.html',
  'views/header/header'
], function($, _, Backbone, Vm, Events, Session, layoutTemplate, HeaderView){
  var AppView = Backbone.View.extend({
    el: '.container',
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
        //options.url = 'http://localhost:8000' + options.url;
       // console.log('network request', Session.get('auth'), options);
        if(Session.get('auth') || options.url.indexOf('session') !== -1) {
      //  options.url = 'http://apidocco.com:3000' + options.url;
          options.url = 'http://192.168.111.193:4000' + options.url;
        } else {
          options.url = 'http://d2i1j8bdf3iqn6.cloudfront.net' + options.url;
        //options.url = 'http://apidocco.com:3000' + options.url;
         

        };
        //options.url = 'http://192.168.111.193:4000' + options.url;
        //options.url = 'http://apidocco.com:3000' + options.url;

      });
    
    },
    render: function () {
			var that = this;
      $(this.el).html(layoutTemplate);      
      var headerView = new HeaderView();
      headerView.render();
      Session.getAuth(function () {
        Backbone.history.start();
      });
		} 
	});
  return AppView;
});
