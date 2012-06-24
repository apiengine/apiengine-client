define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/methods/edit.html',
  'models/method'
], function($, _, Backbone, Router, Session, editMethodTemplate, MethodModel){
  var EditMethodPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      
    },  
    events: {
      'submit form.edit-method': 'editMethod'
    },
    editMethod: function (ev) {
      $('[type=submit]', ev.currentTarget).text('Creating method').attr('disabled', 'disabled');
      // Serialize the form into an object using a jQuery plgin
      var methodData = $(ev.currentTarget).serializeObject();
      var method = new MethodModel;
      methodData.api_id = this.options.apiId;
      method.save(methodData, {
        success: function (model) {
          console.log(model);
          window.location = '#/apis/' + model.get('api_id') + '/method/' + method.id;
        }
      });
      return false;
    },
    render: function () {
      var that = this;
      this.$el.html(_.template(editMethodTemplate, {errors: []}));
    }
  });
  return EditMethodPage;
});
