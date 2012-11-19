define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/apis/overview.html',
  'views/comments/comments',
  'models/api'
], function($, _, Backbone, Router, Session, overviewTemplate, CommentsView, ApiModel){
  var NewApiPage = Backbone.View.extend({
    el: '.method-container',
    initialize: function () {
      var that = this;
      
    },  
    render: function () {
      var that = this;
      this.$el.html(_.template(overviewTemplate, {errors: []}));
      console.log(that.options, 'eeeeee')
            var commentsView = new CommentsView({
            methodId: that.options.method,
            version: that.options.version,
            api: that.options.apiname,
            username: that.options.username,
            resourceId: that.options.resourceId
          });
          commentsView.render();
    }
  });
  return NewApiPage;
});
