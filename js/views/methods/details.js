define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'router',
  'models/session',
  'text!templates/methods/details.html',
  'models/method',
  'views/forms/method',
  'views/comments/comments'
], function($, _, Backbone, Vm, Router, Session, methodTemplate, MethodModel, MethodForm, CommentsView){
  var MethodDetailsView = Backbone.View.extend({
    el: '.method-container',
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
      var that = this;
      $('[data-method-id].active').removeClass('active');
      $('[data-method-id='+ this.options.method +']').addClass('active');

      this.method = new MethodModel();
      this.method.set({
        id: this.options.method,
        version: this.options.version,
        api: this.options.api,
        username: this.options.username,
        resourceId: this.options.resourceId
      });
      this.method.fetch({
        success: function(model) {
          that.$el.html(_.template(methodTemplate, {method: model}));
          var commentsView = new CommentsView({
            methodId: this.options.method,
            version: this.options.version,
            api: this.options.api,
            username: this.options.username,
            resourceId: this.options.resourceId
          });
          commentsView.render();
        }
      })
    }
  });
  return MethodDetailsView;
});
