define([
  'jquery',
  'underscore',
  'backbone',
  'extensions',
  'vm',
	'events',
  'models/session',
  'text!templates/layout.html',
  'views/header/account-menu',
  'views/header/header',
  'views/footer/footer',
  'views/feedback/feedback'
], function($, _, Backbone, extensions, Vm, Events, Session, layoutTemplate, AccountMenu, HeaderView, FooterView, FeedbackView){
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
       if(options.url.indexOf('proxino') === -1) {
        options.url = 'http://x.apiengine.io' + options.url;
        //options.url = 'http://192.168.2.111:3000' + options.url;
        }// else {
        //options.url = 'http://d3gscmgl75g1oq.cloudfront.net' + options.url;
         

       // };

      });
    
    },
    render: function () {

			var that = this;
      $(this.el).html(layoutTemplate);     
      var footerView = new FooterView();

      var headerView = new HeaderView();
      headerView.render();
      footerView.render(); 
      Session.getAuth(function () {
        $('body').on('click', 'a', function (e) {
          if($(this).attr('href').substr(0,4) === 'http') {

          } else {
            clicky.log($(this).attr('href'), $(this).attr('href'), 'pageview')
            Backbone.router.navigate($(this).attr('href'), true);
            return false;
              
          }
        });
    
        var root = '/';
        if(window.location.hostname === 'localhost') {
          root = '/repos/apiengine-client/';
        }
        Backbone.history.start({pushState: true, root: root});
      });    


//$.ajax('http://d3gscmgl75g1oq.cloudfront.net/user/thomasdavis/api/ApiEngine/1/resource/8', {
  //success: function () {console.log(arguments);}
//});
		},
    events: {
      'click .js-feedback': 'openFeedback'
    },
    openFeedback: function () {
      var feedbackView = Vm.create(this, 'feedback', FeedbackView, {});
      feedbackView.render();
    }
	});
  return AppView;
});
