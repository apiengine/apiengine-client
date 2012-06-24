define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/users/layout.html',
  'text!templates/users/user.html',
  'collections/users'
], function($, _, Backbone, Session, usersLayoutTemplate, userTemplate, UsersCollection){
  var UsersPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      
    },
    render: function () {
      var that = this;
      this.$el.html(usersLayoutTemplate);
      var users = new UsersCollection();
      users.fetch({
        success: function (collection) {
          var listHTML = '';
          _.each(collection.models, function (user) {
            listHTML += _.template(userTemplate, {_:_, user: user});
          });
          that.$el.find('.user-list').html(listHTML);
        }
      });
    }
  });
  return UsersPage;
});
