define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var RequestModel = Backbone.Model.extend({
    urlRoot: '/requests'

  });
  return RequestModel;

});
