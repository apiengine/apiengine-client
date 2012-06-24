define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Users = Backbone.Collection.extend({
    url: '/tracks'
  });

  return Users;
});
