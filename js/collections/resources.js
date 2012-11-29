define([
  'jquery',
  'underscore',
  'backbone',
  'models/session'
], function($, _, Backbone, Session){
  var Resources = Backbone.Collection.extend({
    url: function () {
        return '/user/' + this.username + '/api/' + this.apiname + '/' + this.version + '/resource';
    },
    initialize: function () {
    	console.log(this);
    },
    comparator: function (resource) {
      return resource.get('tag');
    }
  });

  return Resources;
});
  