define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/methods/list.html',
  'collections/methods',
  'text!templates/test/template.html'
], function($, _, Backbone, Session, methodsListTemplate, MethodsCollection, testTemplate){
  var UsersPage = Backbone.View.extend({
    el: '.api-methods-container',
    initialize: function () {
      var that = this;
      
    },
    events: {

      'click .js-test-api': 'testApi'
    },
    testApi: function (ev) {
      $(ev.currentTarget).text('Testing api').attr('disabled', 'disabled');
      var TestModel = Backbone.Model.extend({
        url: '/apis/1/test'
      });
      var testModel = new TestModel();

          $('.method-container').html('<h3>Loading test</h3>');
      testModel.fetch({
        success: function (model) {
          $(ev.currentTarget).text('Test Api').removeAttr('disabled');
          $('.method-container').html(_.template(testTemplate, {_:_, methods: model.get('methods')}));
        }
      })
    },
    render: function () {
      var that = this;
      this.$el.html('Loading');

      var methodsCollection =  new MethodsCollection();
      methodsCollection.apiId = this.options.apiId;
      methodsCollection.fetch({
        success: function (collection) {
          that.$el.html(_.template(methodsListTemplate, {owner: that.options.owner, apiId: that.options.apiId, methods: collection.models}));
        }
      })
    }
  });
  return UsersPage;
});
