define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Users = Backbone.Collection.extend({
    url: '/user'
  });

  return Users;
});
