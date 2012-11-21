define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var FollowerModel = Backbone.Model.extend({
    url: function () {

        return '/user/' +this.user+ '/api/' +this.api+ '/follower';
  
    }
  });
  return FollowerModel;

});
