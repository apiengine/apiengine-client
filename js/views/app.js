define([
  'jquery',
  'underscore',
  'backbone',
  'extensions',
  'vm',
	'events',
  'models/session',
  'models/error',
  'text!templates/layout.html',
  'views/header/account-menu',
  'views/header/header',
  'views/footer/footer',
  'views/feedback/feedback',
  'views/notifications/main'
], function($, _, Backbone, extensions, Vm, Events, Session, ErrorModel, layoutTemplate, AccountMenu, HeaderView, FooterView, FeedbackView, Notifications){
  var AppView = Backbone.View.extend({
    el: 'body',
    initialize: function () {
 // log all 500 error codes with the server. We may also log others - this is done in libs/form/form.js
 // when no UI elements are found for handling a valid server error condition.
      $("body").ajaxError(function(ev, res, req) {
		 if(res.status >= 500 && res.status <= 600) {
			var responseJSON = xhr.responseText;
			try {
				responseJSON = JSON.parse(xhr.responseText);
			} catch (e) {}

		  var error = new ErrorModel();
		  error.save({
		    "page": window.location.href,
			"context": req.type + ' ' + req.url,
			"code": res.status,
			"error": "Internal API error",
			"payload": {
				sent : req.data,
				received : responseJSON
			}
		  }, {});
		 }
		  console.log(arguments);
	   });

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

      var that = this;
 $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        // Your server goes below
       if(options.url.indexOf('proxino') === -1) {
        options.url = 'https://s.apiengine.io' + options.url;
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
          if($(this).attr('href').substr(0,4) === 'http' || $(this).attr('href').substr(0,4) === 'mail') {

          } else {
            clicky.log($(this).attr('href'), $(this).attr('href'), 'pageview')
           // mixpanel.track_pageview();
            Backbone.router.navigate($(this).attr('href'), true);
            $(document).scrollTop(0);
            return false;

          }
        });
        var notifications = new Notifications();
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
