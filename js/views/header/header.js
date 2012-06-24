define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/header/layout.html',
  'views/header/main-menu'
], function($, _, Backbone, Session, headerLayoutTemplate, MainMenuView){
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
      this.$el.html(_.template(headerLayoutTemplate, {username: Session.get('login')}));
      var mainMenu = new MainMenuView();
      mainMenu.render();
    }
  });
  return HeaderView;
});
