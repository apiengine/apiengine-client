define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Methods = Backbone.Collection.extend({
    url: '/methods'
  });

  return Methods;
});
