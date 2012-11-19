define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var NotificationModel = Backbone.Model.extend({
    urlRoot: function () {


      if(typeof this.options.methodId !== 'undefined') {

        return '/user/' + this.options.username + '/api/' + this.options.api + '/' + this.options.version + '/resource/' + this.options.resourceId + '/method/' + this.options.methodId + '/notification';
      } else if(typeof this.options.resourceId !== 'undefined') {

        return '/user/' + this.options.username + '/api/' + this.options.api + '/' + this.options.version + '/resource/' + this.options.resourceId + '/notification';
      } else {
        return '/user/' + this.options.username + '/api/' + this.options.api + '/' + this.options.version + '/notification';

      }
    }
  });
  return NotificationModel;

});
