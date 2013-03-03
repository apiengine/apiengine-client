define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'router',
  'models/session',
  'text!templates/apis/docs-overview.html',
  'views/comments/comments',
  'models/api',
  'views/resource/tablelist'
], function($, _, Backbone, Mustache, Router, Session, overviewTemplate, CommentsView, ApiModel, TableList){
  var NewApiPage = Backbone.View.extend({
    el: '.docs-container',
    initialize: function () {
      var that = this;

    },
    render: function () {
      var that = this;
      $('.api-menu-container a.active').removeClass('active');
      $('.overview-link').addClass('active');
      this.$el.html(Mustache.render(overviewTemplate, this.options));
       // :TODO: complete tableList component
       // var tableList = new TableList({username: that.options.username, api: that.options.apiname, version: that.options.version, resourceId: that.options.resourceId, method: that.options.method});
       //      tableList.render();
            var commentsView = new CommentsView({
            methodId: that.options.method,
            version: that.options.version,
            apiname: that.options.apiname,
            username: that.options.username,
            resourceId: that.options.resourceId
          });
          commentsView.render();
    }
  });
  return NewApiPage;
});
