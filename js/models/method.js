define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var MethodModel = Backbone.Model.extend({
    urlRoot: '/methods'

  });
  return MethodModel;

});
