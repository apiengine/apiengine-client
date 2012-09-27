define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'models/session',
  'text!templates/header/account-menu.html',
  'views/home/login',
  'views/home/register',
  'fallr'
], function($, _, Backbone, Vm, Session, mainMenuTemplate, LoginView, RegisterView, fallr){
  var MainMenuView = Backbone.View.extend({
    el: '.account-menu-container',
    initialize: function () {
      var that = this;
      Session.on('change:auth', function (session) {
        that.render();

      });
      Session.on('change:errors', function (errors) {
        that.render();
      });
    },
    render: function () {
      if(typeof Session.get('auth') !== 'undefined') {
        if(Session.get('auth')){
          
          this.$el.html(_.template(mainMenuTemplate, {username: Session.get('login')}));
        } else {
          
          this.$el.html(_.template(mainMenuTemplate, {username: null}));
        }
        this.$el.fadeIn(200);
      }
    },
    events: {
      'click .signup': 'signup',
      'click .logout': 'logout',
      'click .login': 'login'
    },
    logout: function (ev) {
      console.log('logged out');
      // Disable the button
      $(ev.currentTarget).text('Logging out').attr('disabled', 'disabled');
      Session.logout();
      Backbone.router.navigate('', true);

    },
    login: function (ev) {
      var loginView = Vm.create(this, 'LoginView', LoginView, {});
      loginView.render();
    },
    signup: function (ev) {
      var registerView = Vm.create(this, 'RegisterView', RegisterView, {});
      registerView.render();
    }
  });
  return MainMenuView;
});
