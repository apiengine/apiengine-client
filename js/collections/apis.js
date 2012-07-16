define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Apis = Backbone.Collection.extend({
    url: function () {
    	return '/api?is_public=' + this.is_public
    },
    initialize: function () {
    	console.log(this);
    }
  });

  return Apis;
});
