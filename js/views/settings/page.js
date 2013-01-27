define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'vm',
  'models/session',
  'text!templates/settings/page.html',
  'views/settings/profile',
  'views/settings/account',
  'views/settings/history',
  'views/settings/billing',
  'views/settings/notifications'
], function($, _, Backbone, Router, Vm, Session, pageTemplate, ProfileView, AccountView, HistoryView, BillingView, NotificationsView){
  var NewApiPage = Backbone.View.extend({
    el: '.tab-container',
    initialize: function () {
    },
    events: {
    },
    render: function (options) {
      $('.tabs-container li').removeClass('active');
      $('.tabs-container .settings').addClass('active');
      this.$el.html(_.template(pageTemplate, {user: Session.get('user')}));
      switch(options.setting){
      case 'profile':
          var profileView = new ProfileView();
          profileView.render();
        break;
      case 'history':
          var historyView = new HistoryView();
          historyView.render();
        break;
      case 'billing':
          var billingView = new BillingView();
          billingView.render();
        break;
      case 'notifications':
          var notificationsView = new NotificationsView();
          notificationsView.render();
        break;
      case 'account':
          var accountView = new AccountView();
          accountView.render();
        break;
      }
    }
  });
  return NewApiPage;
});
