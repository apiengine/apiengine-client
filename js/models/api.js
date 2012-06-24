define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var ApiModel = Backbone.Model.extend({
    urlRoot: '/apis'

  });
  return ApiModel;

});
