define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/home/pricing.html',
], function($, _, Backbone, Session, pricingTemplate){
  var ExamplePage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    render: function () {
      mixpanel.track("Video play");
      $('.top-bar-menu li a.active').removeClass('active');
      $('.top-bar-menu li a.pricing-button').addClass('active');
      this.$el.html(pricingTemplate);
    }
  });
  return ExamplePage;
});
