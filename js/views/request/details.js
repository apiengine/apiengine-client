define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/request/details.html',
  'jsoneditor'
], function($, _, Backbone, Router, Session, requestDetailsTemplate, jsoneditor){
  var MethodDetailsView = Backbone.View.extend({
    el: '.new-request',
    initialize: function () {
      var that = this;
      
    },  
    render: function () {
      var that = this;
      this.$el.removeClass('new-request').addClass('request-'+this.cid);
      this.$el.html(requestDetailsTemplate);
      formatter = new jsoneditor.JSONEditor($('.json', this.$el)[0]);
      formatter.set({
  "Name": "John Smith",
  "Age": 3,
  "Employed": true,
  "Address": {
    "Street": "701 Ave.",
    "City": "Sunnyvale, CA 95125",
    "Country": {}
  },
  "Children": [
    {
      "Name": "Richard",
      "Age": 7
    },
    {
      "Name": "Susan",
      "Age": 4
    },
    {
      "Name": "James",
      "Age": 3
    }
  ],
  "field": "value"
});
      formatter.onError = function (err) {
        main.showError(err);
      }
    }
  });
  return MethodDetailsView;
});
