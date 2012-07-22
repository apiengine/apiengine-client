define([
  'jquery',
  'underscore',
  'backbone',
  'models/session'
], function($, _, Backbone, Session){
  var Resources = Backbone.Collection.extend({
    url: function () {
        return '/user/' + this.username + '/api/' + this.api + '/' + this.version + '/resource';
    },
    initialize: function () {
    	console.log(this);
    }
  });

  return Resources;
});
  