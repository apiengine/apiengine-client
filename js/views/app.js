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
        //options.url = 'http://110.174.208.24:8000' + options.url;
        options.url = 'http://apidocco2.nodejitsu.com' + options.url;
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
