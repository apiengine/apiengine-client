define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var ProfileModel = Backbone.Model.extend({
    url: function () {
      return '/user/' + this.id + '/profile'
    }

  });
  return ProfileModel;

});
