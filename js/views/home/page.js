define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/home/page.html',
  'views/user/auth',
  'views/apis/list',
  'text!templates/example/login.html',
  'text!templates/example/logout.html'
], function($, _, Backbone, Session, homeTemplate, AuthView, ApisList, exampleLoginTemplate, exampleLogoutTemplate){
  var ExamplePage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    render: function () {
      // Simply choose which template to choose depending on
      // our Session models auth attribute      
      $('.top-bar-menu li a.active').removeClass('active');
      $('.top-bar-menu li a.home-button').addClass('active');
      if(Session.get('auth')){
        this.$el.html(_.template(homeTemplate, {username: Session.get('login')}));
        var apisList = new ApisList({is_public: false, el: '.private-container'});
        apisList.render();
      } else {
        this.$el.html(_.template(homeTemplate, {username: false, errors: Session.get('errors'), _: _})); 
        var authView = new AuthView();
        authView.render();
      }

        var apisList = new ApisList({is_public: true, el: '.public-container'});
        apisList.render();
    }
  });
  return ExamplePage;
});
