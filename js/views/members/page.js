define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/members/page.html'
], function($, _, Backbone, Session, membersTemplate){
  var MembersView = Backbone.View.extend({
    el: '.page',
    initialize: function () {

    },
    render: function () {
      this.$el.html(_.template(membersTemplate, {}));
    }
  });
  return MembersView;
});
