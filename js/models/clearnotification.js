define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var ClearNotificationModel = Backbone.Model.extend({
    urlRoot: function () {


        return '/notification/' +this.options.username+ '/' +this.options.api+ '/' + this.options.version + '/' + this.options.resourceId ;
    }
  });
  return ClearNotificationModel;

});
