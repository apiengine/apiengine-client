define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'marked',
  'models/session',
  'text!templates/legal/layout.html',
  'text!templates/legal/page.html',
  'text!legal/privacy.md',
  'text!legal/beacon.md',
  'text!legal/security.md',
  'text!legal/support.md',
  'text!legal/terms.md',
  'text!legal/trademark.md',
  'text!legal/money.md'
], function($, _, Backbone, Mustache, marked, Session, legalLayout, legalPage, privacyMd, beaconMd, securityMd, supportMd,termsMd,trademarkMd,moneyMd){
  var LegalPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    render: function () {
      this.$el.html(legalLayout);
      var heading, content;
      switch(this.options.page) {
        case 'privacy':
          heading = 'Privacy policy';
          content = marked(privacyMd);
        break;
        case 'terms':
          heading = 'Terms of Service';
          content = marked(termsMd);
        break;
        case 'beacon':
         heading = 'Our values';
         content = marked(beaconMd);
        break;
        case 'security':
         heading = 'Security';
         content = marked(securityMd);
        break;
        case 'support':
         heading = 'Support';
         content = marked(supportMd);
        break;
        case 'trademark':
         heading = 'Trademarks';
         content = marked(trademarkMd);
        break;
        case 'money':
         heading = 'Our service fees';
         content = marked(moneyMd);
        break;
      }
      $('.settings-menu li a').removeClass('active');
      $('.settings-menu li a.' + this.options.page).addClass('active');
      this.$el.find('.settings-page-container').html(Mustache.render(legalPage, {heading: heading, content: content}))
    }
  });
  return LegalPage;
});
