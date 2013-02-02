define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'models/session',
  'models/resource',
  'text!templates/resource/page.html',
  'models/clearnotification',
  'views/comments/comments'
  ], function($, _, Backbone, Vm, Session, ResourceModel, resourcePageTemplate, ClearNModel, CommentsView){
  var ResourcesPage = Backbone.View.extend({
    el: '.docs-container',
    initialize: function () {
      var that = this;

    },
    events: {
    },
    render: function () {
      $('.api-menu-container a.active').removeClass('active');

      $('a[data-resource-id='+this.options.resourceId+']').addClass('active');
      var that = this;
      console.log(this.options,  'they don');
      var resource = new ResourceModel();
      resource.options = this.options;
      resource.set({
        id: this.options.resourceId
      });
      resource.fetch({
        success: function (resource) {
          console.log('we can now render the resouce page using', resource);
          that.$el.html(_.template(resourcePageTemplate, {_:_, resource: resource}));
          var commentsView = new CommentsView(that.options);
          commentsView.render();
          var clearNModel = new ClearNModel({id: 'dummy'});
          clearNModel.options = that.options;
          console.log('YOOOOOOOOOOOOOo', clearNModel);
          clearNModel.destroy({
            success: function (arguments) {
              var resourceEl = $('.resource-notification[data-resource-id="'+that.options.resourceId+'"]');
              if($(resourceEl).attr('data-method-totals')*1 > 0) {
               $(resourceEl).text($(resourceEl).attr('data-method-totals')*1).fadeIn(200);

              } else {
                $(resourceEl).fadeOut(200).text('0');

              }
            }
          })


        }
      });
        console.log('render resource page');
    }
  });
  return ResourcesPage;
});

