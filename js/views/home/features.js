define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/home/features.html',
], function($, _, Backbone, Session, featuresTemplate){
  var ExamplePage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    render: function () {
     // mixpanel.track('Viewed features');

      $('.top-bar-menu li a.active').removeClass('active');
      $('.top-bar-menu li a.features-button').addClass('active');
      this.$el.html(featuresTemplate);
    }
  });
  return ExamplePage;
});
