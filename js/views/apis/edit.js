define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/apis/edit.html',
  'models/api'
], function($, _, Backbone, Router, Session, newApiTemplate, ApiModel){
  var NewApiPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      
    },  
    events: {
      'submit form.edit-api': 'editApi'
    },
    editApi: function (ev) {
      $('[type=submit]', ev.currentTarget).val('Logging in').attr('disabled', 'disabled');
      // Serialize the form into an object using a jQuery plgin
      var apiData = $(ev.currentTarget).serializeObject();
      var api = new ApiModel;
      console.log(apiData);
      api.save(apiData, {
        success: function (model) {
          console.log(model);
          window.location = '#/apis/' + model.id;
        }
      });
      return false;
    },
    render: function () {
      var that = this;
      this.$el.html(_.template(newApiTemplate, {errors: []}));
    }
  });
  return NewApiPage;
});
