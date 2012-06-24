define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var UserModel = Backbone.Model.extend({
    url: '/user'

  });
  return UserModel;

});
