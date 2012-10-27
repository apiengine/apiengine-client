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
    render: function (options) {
      $('.tabs-container li').removeClass('active');
      $('.tabs-container .settings').addClass('active');
      this.$el.html(_.template(pageTemplate, {user: Session.get('user')}));
      switch(options.setting){
      case 'profile':
        require(['views/settings/profile'], function (ProfileView) {
          var profileView = new ProfileView();
          profileView.render();
        })
        break;
      case 'history':
        require(['views/settings/history'], function (HistoryView) {
          var historyView = new HistoryView();
          historyView.render();
        })
        break;
      case 'billing':
        require(['views/settings/billing'], function (BillingView) {
          var billingView = new BillingView();
          billingView.render();
        })
        break;
      case 'notifications':
        require(['views/settings/notifications'], function (NotificationsView) {
          var notificationsView = new NotificationsView();
          notificationsView.render();
        })
        break;
      case 'account':
        require(['views/settings/account'], function (AccountView) {
          var accountView = new AccountView();
          accountView.render();
        })
        break;
      }
    }
  });
  return NewApiPage;
});
