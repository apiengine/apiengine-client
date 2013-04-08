define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var Card = Backbone.Model.extend({
    url: function() {
      return '/user/' + this.login + '/card';
    }
  });
  return Card;

});
