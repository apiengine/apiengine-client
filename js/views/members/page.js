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
          console.log(users);
          $('.members-list').html(_.template(membersListTemplate, {users: users.models, _:_}));

          $(".gridster ul").gridster({
              widget_margins: [10, 10],
              widget_base_dimensions: [140, 140]
          });


        }
        
      })
    }
  });
  return MembersView;
});
