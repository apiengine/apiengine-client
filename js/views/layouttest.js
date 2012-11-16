define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/layouttest.html'
], function($, _, Backbone, Session, layoutTemplate){
  var UsersPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      
    },
    render: function () {
      var that = this;
      that.$el.html(layoutTemplate);
      $('.js-new-resource').on('click', function (){  
        $('#myModal').modal({});  
      });
    }
  });
  return UsersPage;
});
