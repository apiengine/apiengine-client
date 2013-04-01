define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var Card = Backbone.Model.extend({
    url: function() {
      return '/user/' + this.get('login') + '/card';
    }
  });
  return Card;

});
