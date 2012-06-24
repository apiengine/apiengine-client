define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Apis = Backbone.Collection.extend({
    url: '/apis'
  });

  return Apis;
});
