define([
  'backbone',
  'underscore'
], function(Backbone, _) {
  var EventBus = _.clone(Backbone.Events);
  return EventBus;
});