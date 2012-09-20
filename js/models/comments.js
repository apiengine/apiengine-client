define([
  'underscore',
  'backbone',
  'models/session'
], function(_, Backbone, Session) {
  var CommentModel = Backbone.Model.extend({
    urlRoot: function () {


      if (typeof this.options.methodId !== 'undefined') {
        return '/user/' +this.options.username+ '/api/' +this.options.api+ '/' + this.options.version + '/resource/' + this.options.resourceId + '/method/' + this.options.methodId + '/comment';
      } else {
        return '/user/' +this.options.username+ '/api/' +this.options.api+ '/' + this.options.version + '/resource/' + this.options.resourceId + '/comment';
        
      }
    }
  });
  return CommentModel;

});
