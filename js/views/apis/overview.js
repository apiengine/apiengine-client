define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/apis/overview.html',
  'views/comments/comments',
  'models/api',
  'views/resource/tablelist'
], function($, _, Backbone, Router, Session, overviewTemplate, CommentsView, ApiModel, TableList){
  var NewApiPage = Backbone.View.extend({
    el: '.method-container',
    initialize: function () {
      var that = this;
      
    },  
    render: function () {
      var that = this;
      $('.api-menu-container a.active').removeClass('active');
      $('.overview-link').addClass('active');
      this.$el.html(_.template(overviewTemplate, {errors: []}));
       var tableList = new TableList({username: that.options.username, api: that.options.apiname, version: that.options.version, resourceId: that.options.resourceId, method: that.options.method});
            tableList.render();
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
