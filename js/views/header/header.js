define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'mustache',
  'text!templates/header/layout.html',
  'views/header/main-menu'
], function($, _, Backbone, Session, Mustache, headerLayoutTemplate, MainMenuView){
  var HeaderView = Backbone.View.extend({
    el: '.header',
    initialize: function () {
      var that = this;
      Session.on('change:auth', function (session) {
     //   that.render();
      });
      Session.on('change:errors', function (errors) {
       // that.render();
      });
    },
    render: function () {
      this.$el.hide().fadeIn(250);
      this.$el.html(Mustache.render(headerLayoutTemplate, {username: Session.get('login')}));
      var mainMenu = new MainMenuView();
      mainMenu.render();
      var value = 0



    }
  });
  return HeaderView;
});
