define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'models/session',
  'text!templates/header/account-menu.html',
  'views/home/login',
  'fallr'
], function($, _, Backbone, Vm, Session, mainMenuTemplate, LoginView, fallr){
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
      if(Session.get('auth')){
        
        this.$el.html(_.template(mainMenuTemplate, {username: Session.get('login')}));
      } else {
        
        this.$el.html(_.template(mainMenuTemplate, {username: null}));
      }
    },
    events: {
      'click .logout': 'logout',
      'click .login': 'login'
    },
    logout: function (ev) {
      console.log('logged out');
      // Disable the button
      $(ev.currentTarget).text('Logging out').attr('disabled', 'disabled');
      Session.logout();
    },
    login: function (ev) {
      var loginView = Vm.create(this, 'LoginView', LoginView, {});
      loginView.render();
    }
  });
  return MainMenuView;
});
