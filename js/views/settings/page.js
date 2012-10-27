define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'vm',
  'models/session',
  'text!templates/settings/page.html'
], function($, _, Backbone, Router, Vm, Session, pageTemplate){
  var NewApiPage = Backbone.View.extend({
    el: '.tab-container',
    initialize: function () {
    },  
    events: {
    },
    render: function () {
      $('.tabs-container li').removeClass('active');
      $('.tabs-container .settings').addClass('active');
      this.$el.html(pageTemplate);
    }
  });
  return NewApiPage;
});
