define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'router',
  'mustache',
  'models/session',
  'text!templates/methods/page.html',
  'models/method',
  'views/forms/method',
  'views/comments/comments',
  'models/clearnotification'
], function($, _, Backbone, Vm, Router, Mustache, Session, methodTemplate, MethodModel, MethodForm, CommentsView, ClearNModel){
  var MethodDetailsView = Backbone.View.extend({
    el: '.docs-container',
    initialize: function () {
      var that = this;

    },
    events: {
      'click .js-edit-method': 'saveMethod'
    },
    saveMethod: function (ev) {
      var methodForm = Vm.create(this, 'methodform', MethodForm, {
        username: this.options.username,
        version: this.options.version,
        api: this.options.api,
        resourceId: this.options.resourceId,
        method: this.method
      });
      methodForm.render();
      return false;
    },
    render: function () {
      console.log('why no rerender view');
      var that = this;
            $('.api-menu-container a.active').removeClass('active');
            console.log(this.options, 'is there a resource id');
      $('[data-method-id='+ this.options.method +']', $('[data-resource-id='+this.options.resourceId+']')).addClass('active');

      this.method = new MethodModel({
        method: this.options.method
      }, {
        version: this.options.version,
        apiname: this.options.api,
        username: this.options.username,
        resourceId: this.options.resourceId
      });
      var resourceUrl = $('li[data-resource-id="'+this.options.resourceId+'"]').attr('data-resource-resource');
      this.method.fetch({
        success: function(model) {
          that.$el.html(Mustache.render(methodTemplate, {method: model, resourceUrl: resourceUrl}));
          var clearNModel = new ClearNModel({id: that.options.method});
          clearNModel.options = that.options;
          clearNModel.options.method = model.get('method');
          console.log('YOOOOOOOOOOOOOo', clearNModel);
          clearNModel.destroy({
            success: function (arguments) {
              console.log('YOLO', arguments);
              var methodEl = $('.method-notification[data-resource-id="'+that.options.resourceId+'"][data-method-id="'+that.options.method+'"]');
              var methodCount = methodEl.text();
              methodEl.fadeOut(200).text('0');
              var resourceEl = $('.resource-notification[data-resource-id="'+that.options.resourceId+'"]');

               $(resourceEl).attr('data-method-totals', $(resourceEl).attr('data-method-totals')*1 - methodCount*1);
               $(resourceEl).text($(resourceEl).attr('data-method-totals'));
               if($(resourceEl).attr('data-method-totals')*1 === 0) {
                $(resourceEl).fadeOut(200);

               }
              }

          })
          var commentsView = new CommentsView({
            methodId: that.options.method,
            version: that.options.version,
            api: that.options.api,
            username: that.options.username,
            resourceId: that.options.resourceId
          });
          commentsView.render();
        }
      })
    }
  });
  return MethodDetailsView;
});
