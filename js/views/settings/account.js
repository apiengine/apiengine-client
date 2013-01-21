define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'router',
  'vm',
  'models/session',
  'modal',
  'text!templates/settings/account.html',
  'text!templates/modals/deleteaccount.html',
  'models/user'
], function($, _, Backbone, Mustache, Router, Vm, Session, Modal, settingTemplate, confirmTemplate, UserModel){
  var SettingPage = Backbone.View.extend({
    el: '.settings-page-container',
    initialize: function () {
    },
    events: {
    	'submit .update-account': 'updateAccount',
    	'click .delete-button' : 'deleteAccount'
    },
    render: function (options) {
      $('.settings-menu a').removeClass('active');
      $('.settings-menu .account').addClass('active');
      this.$el.html(Mustache.render(settingTemplate, {user : Session.get('user')}));
    },

    updateAccount : function(ev)
    {
		var profileDetails = $(ev.currentTarget).serializeObject();

		// throw an error if it mismatched
		if (profileDetails.password && (profileDetails.password != profileDetails.password_check)) {
			$('.form-error[for=password]').show();
			return false;
		}
		delete profileDetails.password_check;

		// don't send password if not filled in
		if (!profileDetails.password && !profileDetails.password_check) {
			delete profileDetails.password_old
			delete profileDetails.password;
			delete profileDetails.password_check;
		}

		// :TODO: check 'old password' parameter name against API

    	// disable all submission inputs
		$('[type="submit"]').attr('disabled', 'disabled');

		// fire off the request
		var userModel = new UserModel();
		profileDetails.login = Session.get('user').login;
		userModel.save(profileDetails, {
			success: function () {
				console.log('user', arguments);
				$('[type="submit"]').removeAttr('disabled');
			},
			error: function () {
				$('[type="submit"]').removeAttr('disabled');
			}
		});
    	return false;
    },

    deleteAccount : function(ev)
    {
    	// show confirmation dialog
		this.modal = Modal.create({
			content: confirmTemplate,
			confirm : true
		});

		// bind to modal form submission
		$('.modal .account-delete-form').on('submit', function(ev) {
			var userModel = new UserModel(),
				accountDetails = {
					login : Session.get('user').login
				};

			userModel.destroy(accountDetails, {
				success: function () {
					console.log('BAHLEET', arguments);
					// :TODO: logout & redirect to goodbye page?
					$('[type="submit"]').removeAttr('disabled');
				},
				error: function () {
					console.log('ERROR NO DELETE', arguments);
					// :TODO: show error in UI
					$('[type="submit"]').removeAttr('disabled');
				}
			});
			return false;
		});

    	this.modal.show();
    }
  });
  return SettingPage;
});
