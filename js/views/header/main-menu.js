define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/header/main-menu.html'
], function($, _, Backbone, Session, mainMenuTemplate){
  var MainMenuView = Backbone.View.extend({
    el: '.main-menu-container',
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
      'click .logout': 'logout'
    },
    logout: function (ev) {
      // Disable the button
      $(ev.currentTarget).text('Logging out').attr('disabled', 'disabled');
      Session.logout();
    }
  });
  return MainMenuView;
});
