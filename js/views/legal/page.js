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
  'text!legal/terms-of-service.md',
  'text!legal/test.md'
], function($, _, Backbone, Mustache, marked, Session, legalLayout, legalPage, privacyMd, termsMd, testMd){
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
          heading = 'Privacy';
          content = marked(privacyMd);
        break;
        case 'terms-of-service':
          heading = 'Terms of service';
          content = marked(termsMd);
        break;
        case 'test':
         heading = 'Test';
         content = marked(testMd);
        break;
      }
      $('.settings-menu li a').removeClass('active');
      $('.settings-menu li a.' + this.options.page).addClass('active');
      this.$el.find('.settings-page-container').html(Mustache.render(legalPage, {heading: heading, content: content}))
    }
  });
  return LegalPage;
});
