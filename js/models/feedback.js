define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var FeedbackModel = Backbone.Model.extend({
    urlRoot: function () {

        return '/feedback';
  
    }
  });
  return FeedbackModel;

});
