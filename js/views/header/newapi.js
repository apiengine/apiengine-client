define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'models/api',
  'text!templates/home/register.html',
  'modal',
  'text!templates/modals/newapi.html'
], function($, _, Backbone, Session, Api, loginTemplate, Modal, registert){
  var ExamplePage = Backbone.View.extend({
    el: 'body',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
      Session.on('change:errors', function (errors) {
        //  that.render();
      });
    },
    render: function () {
     // mixpanel.track('Opened API modal');
     var that = this;

      this.modal = Modal.create({
        content: registert,

        form : {
        	element : 'form.newapi',
        	model : new Api({username: Session.get('login')}),

	      	onPreValidate : function(creds) {
	      		// don't send password if not filled in
				if(creds.private === 'on') {
					creds.private = true;
				} else {
					creds.private = false;
				}
	      		return creds;
	    	},
	    	success: function(data) {
	          	that.modal.hide();
            	Backbone.router.navigate(data.get('user') + '/' + data.get('name') + '/version/' + data.get('versions')[0], true);
	     // mixpanel.track('Created a new API');
	        }
        }
      });
      $('.modal input[name="name"]').focus();
    }
  });
  return ExamplePage;
});
