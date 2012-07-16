define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var ApiModel = Backbone.Model.extend({
    urlRoot: '/user/thomasdavis/api'

  });
  return ApiModel;

});
