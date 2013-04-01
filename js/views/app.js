define([
  'jquery',
  'underscore',
  'backbone',
  'extensions',
  'vm',
	'events',
  'libs/events/event_bus',
  'libs/events/events',
  'models/session',
  'models/error',
  'text!templates/layout.html',
  'views/header/account-menu',
  'views/header/header',
  'views/footer/footer',
  'views/feedback/feedback',
  'views/notifications/main'
], function($, _, Backbone, extensions, Vm, Eventsa, EventBus, Events, Session, ErrorModel, layoutTemplate, AccountMenu, HeaderView, FooterView, FeedbackView, Notifications){
  var AppView = Backbone.View.extend({
    el: 'body',
    initialize: function () {
      

      var that = this;

      $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        if(options.url.indexOf('proxino') === -1) {
          options.url = $('[data-server-url]').attr('data-server-url') + options.url;
        }
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
            ga('send', {
              'hitType': 'pageview',
              'page': $(this).attr('href')
            });
           // mixpanel.track_pageview();
            Backbone.router.navigate($(this).attr('href'), true);
            $(document).scrollTop(0);
            return false;

          }
        });
        var notifications = new Notifications();
   var root = '/';
        if(window.location.hostname === 'localhost' && window.location.pathname.indexOf('relic') !== -1) {
          root = '/repos/apiengine-client/build/relic';

        } else if(window.location.hostname === 'localhost') {
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
