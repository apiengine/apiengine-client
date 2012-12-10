define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/home/blog.html',
], function($, _, Backbone, Session, blogTemplate){
  var ExamplePage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    render: function () {
     // mixpanel.track('Viewed pricing');
      $('.top-bar-menu li a.active').removeClass('active');
      $('.top-bar-menu li a.pricing-button').addClass('active');
      this.$el.html(blogTemplate);
    }
  });
  return ExamplePage;
});
