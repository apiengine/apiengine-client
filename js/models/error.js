define([
  'backbone',
], function(Backbone) {
  var ErrorModel = Backbone.Model.extend({
        url: '/error'
      });
  return ErrorModel;
});
