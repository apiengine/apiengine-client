define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/members/page.html',
  'collections/users',
  'text!templates/members/list.html'
], function($, _, Backbone, Session, membersTemplate, Users, membersListTemplate){
  var MembersView = Backbone.View.extend({
    el: '.page',
    initialize: function () {

    },
    render: function () {
      
      $('.top-bar-menu li a.active').removeClass('active');
      $('.top-bar-menu li a[href=members]').addClass('active');
      this.$el.html(_.template(membersTemplate, {}));
      var users = new Users();
      users.fetch({
        success: function (users) {
          users = _.sortBy(users.models, function(user){ return user.get('login') });
          $('.members-list').html(_.template(membersListTemplate, {users: users, _:_}));



        }
        
      })
    }
  });
  return MembersView;
});
