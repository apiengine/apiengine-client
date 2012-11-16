define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/footer/footer.html',
], function($, _, Backbone, Session, footerTemplate){
  var FooterView = Backbone.View.extend({
    el: '.footer',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    render: function () {
      this.$el.html(footerTemplate);
    }
  });
  return FooterView;
});
