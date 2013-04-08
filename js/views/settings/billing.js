define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'vm',
  'models/session',
  'text!templates/settings/billing.html',
  'models/billing/card'
], function($, _, Backbone, Router, Vm, Session, settingTemplate, Card){
  var SettingPage = Backbone.View.extend({
    el: '.settings-page-container',
    initialize: function () {
    },  
    events: {
      'submit .billing-form': 'updateCreditCard'
    },
    render: function (options) {
      $('.settings-menu a').removeClass('active');
      $('.settings-menu .billing').addClass('active');
      this.$el.html(settingTemplate);
    },
    updateCreditCard: function (ev) {
      var formData = $(ev.currentTarget).serializeObject();
      var cardData = {
        card_number: formData.card_number,
        expiry: {
          month: formData.expiry_month,
          year: formData.expiry_year
        },
        ccv: formData.ccv,
        name: formData.name
      }
      var card = new Card();
      card.login = Session.get('login');
      card.save(cardData, {
        success: function () {
          console.log(arguments)
        }
      })

      return false;

    }
  });
  return SettingPage;
});
