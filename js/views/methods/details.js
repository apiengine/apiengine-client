define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'models/session',
  'text!templates/methods/details.html',
  'models/method',
  'models/request',
  'views/request/details',
  'collections/requests'
], function($, _, Backbone, Router, Session, methodTemplate, MethodModel, RequestModel, RequestDetailsView, RequestCollection){
  var MethodDetailsView = Backbone.View.extend({
    el: '.method-container',
    initialize: function () {
      var that = this;
      
    },  
    events: {
      'click .js-new-request': 'newRequest'
    },
    newRequest: function (ev) {

      $(ev.currentTarget).text('Adding request').attr('disabled', 'disabled');
      var that = this;
      var requestModel = new RequestModel();
      requestModel.save({
        name: 'No name',
        description: 'No Description',
        requestBody: '{"hello": "world"}',
        responseBody: '{"hello": "world"}',
        MethodId: this.options.methodId
      }, {
        success: function (request) {
        $(ev.currentTarget).text('New request').removeAttr('disabled');
          that.$el.append('<div data-request-id="'+request.id+'"></div>');
                var requestView = new RequestDetailsView({request: request, el: '[data-request-id="'+request.id+'"]'});
                requestView.render();
        }
      });
    },
    render: function () {
      var that = this;
      this.$el.html('loading');
      var methodModel = new MethodModel({id: this.options.methodId});
      methodModel.fetch({
        success: function (method) {
          that.$el.html(_.template(methodTemplate, {method: method}));
          var requestCollection = new RequestCollection();
          requestCollection.methodId = method.id;

          requestCollection.fetch({ 
            success: function (requests) {

                $('.requests-container', that.$el).html('');
              _.each(requests.models, function(request) {
                that.$el.append('<div data-request-id="'+request.id+'"></div>');
                var requestView = new RequestDetailsView({request: request, el: '[data-request-id="'+request.id+'"]'});
                requestView.render();
              });
              if(requests.models.length === 0) {

                $('.requests-container', that.$el).html('No request');
              }
  
            }
          });
        }
      });
    }
  });
  return MethodDetailsView;
});
