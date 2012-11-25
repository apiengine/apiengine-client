define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var ClearNotificationModel = Backbone.Model.extend({
    url: function () {


       if(this.options.method) {

        return '/notification/' + this.options.username + '/' + this.options.api + '/' + this.options.version + '/' + this.options.resourceId + '/' + this.options.method ;
      } else if(typeof this.options.resourceId !== 'undefined') {

        return '/notification/' + this.options.username + '/' + this.options.api + '/' + this.options.version + '/' + this.options.resourceId ;
      } else {
        return '/notification/' + this.options.username + '/' + this.options.api + '/' + this.options.version + '/notification';

      }
    }
  });
  return ClearNotificationModel;

});
