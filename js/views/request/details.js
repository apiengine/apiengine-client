define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/request/details.html',
  'text!templates/request/edit.html',
  'jsoneditor',
  'models/request',
  'prettyprint'
], function($, _, Backbone, Router, Session, requestDetailsTemplate, editRequestTemplate, jsoneditor, RequestModel, prettyprint){
  var MethodDetailsView = Backbone.View.extend({
    el: '.new-request',
    initialize: function () {
      var that = this;
      
    },
    events: {
      'submit form.update-request': 'updateRequest',
      'click .js-edit-request': 'editRequest'
    },
    editRequest: function () {

      this.$el.html(_.template(editRequestTemplate, {request: this.options.request }));

      this.requestEditor = new jsoneditor.JSONEditor($('.request-body', this.$el)[0]);
      this.requestEditor.set(JSON.parse(this.options.request.get('requestBody')));
      this.responseEditor = new jsoneditor.JSONEditor($('.response-body', this.$el)[0]);
      this.responseEditor.set(JSON.parse(this.options.request.get('responseBody')));


      $(".jsoneditor-frame *").click(function(e){e.preventDefault()});
    },
    updateRequest: function (ev) {
      var that = this;
      $('[type=submit]', ev.currentTarget).text('Updating request').attr('disabled', 'disabled');
      // Serialize the form into an object using a jQuery plgin
      var requestData = $(ev.currentTarget).serializeObject();
      requestData.id = this.options.request.id;

      requestJson = this.requestEditor.get();
      responseJson = this.responseEditor.get();
      requestData.id = this.options.request.id;
      requestData.requestBody = JSON.stringify(requestJson);
      requestData.responseBody = JSON.stringify(responseJson);
      var request = new RequestModel;
      request.save(requestData, {
        success: function (model) {
          that.options.request = model;
          that.render();
          //window.location = '#/apis/' + model.id;
        }
      });
      return false;
    },
    render: function () {
      var that = this;
      this.$el.html(_.template(requestDetailsTemplate, {request: this.options.request, owner: this.options.owner }));
      $('.request-body', this.$el).append(prettyprint(JSON.parse(this.options.request.get('requestBody'))));
      $('.response-body', this.$el).append(prettyprint(JSON.parse(this.options.request.get('responseBody'))));
     
      //this.editor.onError = function (err) {
     //   alert(err);
     // }
      
    }
  });
  return MethodDetailsView;
});
