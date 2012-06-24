define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Requests = Backbone.Collection.extend({
    url: function () {
    	return '/methods/' + this.methodId + '/requests'
    }
  });

  return Requests;
});
