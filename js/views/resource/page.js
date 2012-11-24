define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'models/session',
  'models/resource',
  'text!templates/resource/page.html',
  'views/comments/comments'
  ], function($, _, Backbone, Vm, Session, ResourceModel, resourcePageTemplate, CommentsView){
  var ResourcesPage = Backbone.View.extend({
    el: '.method-container',
    initialize: function () {
      var that = this;
      
    },
    events: {
    },
    render: function () {
      $('.api-menu-container a.active').removeClass('active');

      $('a[data-resource-id='+this.options.resourceId+']').addClass('active');
      var that = this;
      var resource = new ResourceModel();
      resource.set({
        username: this.options.username,
        api: this.options.api,
        version: this.options.version,
        resourceId: this.options.resourceId
      });
      resource.fetch({
        success: function (resource) {
          console.log('we can now render the resouce page using', resource);
          that.$el.html(_.template(resourcePageTemplate, {_:_, resource: resource}));
          var commentsView = new CommentsView({
            version: that.options.version,
            api: that.options.api,
            username: that.options.username,
            resourceId: that.options.resourceId
          });
          commentsView.render();



        }
      });
        console.log('render resource page');
    }
  });
  return ResourcesPage;
});

