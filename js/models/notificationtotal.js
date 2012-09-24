define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var NotificationTotalModel = Backbone.Model.extend({
    urlRoot: function () {

      if (typeof this.options.api !== 'undefined' && typeof this.options.resourceId === 'undefined') {
        return '/notification/' +this.options.username+ '/' +this.options.api+ '/' + this.options.version;

      } 
      if (typeof this.options.resourceId !== 'undefined') {
        return '/notification/' +this.options.username+ '/' +this.options.api+ '/' + this.options.version + '/' + this.options.resourceId;
      } else {
        return '/comment';
      }
    }
  });
  return NotificationTotalModel;

});
