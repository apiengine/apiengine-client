/**
 * Form handler library.
 *
 * Because models are used ad-hoc throughout the client, we don't really want to tie their validation
 * to any specific pages. Form wraps that up in a reasonably simple way to glue models to the DOM.
 *
 * Templating:
 *  The only requirement for a form to function correctly is a container element full of .form-error labels.
 *  You should use the correct parent class as well, like so:
 *
 *  <div class="form-errors">
 *  	<label class="form-error" for="name">Please provide your name.</label>
 *		<label class="form-error" for="password" data-errcode="password.mismatch">The provided passwords did not match.</label>
 *		<label class="form-error" for="password" data-errcode="password.notprovided">You must specify your current password to update it.</label>
 *	</div>
 *
 *  The data-errcode is optional, and only used when multiple error conditions exist for the same field - @see showError()
 *
 * Options:
 *  onPreValidate	- callback to manipulate the raw data from the form's inputs.
 * 					  Receives the form's input data as an argument. The Form controller is function context.
 * 			    	  Simply return the desired object.
 *  validate		- callback for validating data pre-send.
 *  				  Receives the form's input data as an argument. The Form controller is function context.
 *  				  You should return an object mapping input names to arrays of error codes. If the field has just errored generically you can simply use 'true' as a value.
 * 	onPreSend		- callback to manipulate the data after validation but before sending.
 * 					  Receives the form's input data as an argument. The Form controller is function context.
 * 			    	  Simply return the desired object.
 * 	skipSubmitEvent	- can be used to skip binding the form <submit> action, if you wish to call .save() by your own code.
 *
 *  flashTime		- time in ms to show success notification messages for
 *
 *  success			- same as with Backbone.Model, and runs instead of the form's default success message behaviour.
 *  error			- same as with Backbone.Model, and runs instead of the form's default error callback when an unknown error is encountered.
 *
 *  errorMapping	- a hash mapping API error codes to input names or IDs which should be indicated to be in error when the code is returned.
 *  				  When non-handled codes are returned, they simply show the error message assigned to them without highlighting any particular fields.
 *
 * :TODO:
 * - success flash messages
 *
 * @package	APIEngine Client
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	23/1/13
 */
define(['require', 'jquery', 'underscore', 'mustache', 'models/error'], function (require, $, _, Mustache, ErrorModel) {
	var defaultOptions = {
		onPreValidate : null,
		onPreSend : null,
		validate : null,

		errorMapping : {},

		flashTime : 4000,

		skipSubmitEvent : false
	};

	var form = function(el, Model, options) {
		var options = $.extend({}, defaultOptions, options),
			that = this;

		this.model = Model;
		this.options = options;

		// bind DOM events
		this.element = $(el);

		// toggle buttons
		var btns = $('.button-group.toggle', this.element);
		if (btns.length) {
			btns.each(function() {
				var btn = $(this),
					hidden = $('input[type="hidden"]', btn);

				btn.find($('button[value="' + hidden.val() + '"]')).removeClass('btn-regular').addClass('btn-green');
			});
			btns.on('click', 'button.btn', function(e) {
				var $this = $(this),
					top = $this.closest('.toggle');

				top.find('input').val($this.val());
				top.find('button').removeClass('btn-green').addClass('btn-regular');
				$this.removeClass('btn-regular').addClass('btn-green');
			});
		}

		// submit action
		if (!options.skipSubmitEvent) {
			this.element.on('submit', function(ev) {
				var pressed = $(this).data('clicked'),
					action = pressed.data('action') || 'save';

				that.resetUI();

				if (action == 'save') {
					var attributes = that.element.serializeObject();
					attributes = that.presend(attributes);

					if (attributes === false) {
						return false;
					}

					that[action](attributes);
				} else {
					that[action]();
				}

				return false;
			});

			this.element.on('click', function(e) {
				$(this).data('clicked', $(e.target));
			});
		}
	};

	/**
	 * Pre-send data manipulation
	 */
	form.prototype.presend = function(attributes)
	{
		var invalid, invalidCount = 0, that = this;

		if (this.options.onPreValidate) {
			attributes = this.options.onPreValidate.call(this, attributes)
		}

		if (this.options.validate && (invalid = this.options.validate.call(this, attributes))) {
			$.each(invalid, function(fldName, v) {
				if (!$.isArray(v)) {
					v = [v];
				}
				if (v.length) {
					invalidCount++;
					$.each(v, function(k2, errCode) {
						if (!that.showError(fldName, errCode)) {
							that.handleNonConfiguredError(fldName, null, errCode, null);
						}
					});
				}
			});
			if (invalidCount) {
				return false;
			}
		}

		if (this.options.onPreSend) {
			attributes = this.options.onPreSend.call(this, attributes)
		}

		return attributes;
	};

	/**
	 * Request wrappers
	 */
	form.prototype.save = function(attributes)
	{
		this.disable();
		this.model.save(attributes, this.extendOptions());
	};

	form.prototype.fetch = function()
	{
		this.disable();
		this.model.fetch(this.extendOptions());
	};

	form.prototype.destroy = function()
	{
		this.disable();
		this.model.destroy(this.extendOptions());
	};

	// bind default callbacks for request actions
	form.prototype.extendOptions = function()
	{
		var that = this;
		return $.extend({
			success: function(model, response, options) {
				that.enable.call(that);

				// fire custom success callback instead of default one if present
				if (that.options && that.options.success) {
					that.options.success.call(that, model, response, options);
				} else {
					that.showSuccess();
				}
			},
			error: function(model, xhr, options) {
				that.enable.call(that);

				var responseJSON = xhr.responseText;
				try {
					responseJSON = JSON.parse(xhr.responseText);
				} catch (e) {}

				if (that.options && that.options.error) {		// fire custom error callback if present
					that.options.error.call(that, model, responseJSON, options);
				} else if ($.isPlainObject(responseJSON)) {		// if response was OK, attempt to throw it as an API error
					that.handleAPIError(xhr, responseJSON, options);
				} else {										// otherwise throw up to global error handler
					that.handleUncaughtError(xhr, options);
				}
			}
		}, this.options);
	}

	/**
	 * Error handling
	 */
	form.prototype.handleUncaughtError = function(xhr, options)
	{
		// show notification of the error
		var that = this;
		require(['modal', 'text!templates/modals/error.html'],
			function (Modal, errorTemplate) {
				errorTemplate = Mustache.render(errorTemplate, {
					ajaxError : xhr
				});
				that.modal = Modal.create({
					content: errorTemplate
				});
			}
		);

		// don't duplicate the global logging performed in app.js
		if (xhr.status < 500 || xhr.status >= 600) {
			var responseJSON = xhr.responseText;
			try {
				responseJSON = JSON.parse(xhr.responseText);
			} catch (e) {}

			// log to server
			var error = new ErrorModel();
			error.save({
				"page": window.location.href,
				"context": this.model.url(),
				"code": xhr.status,
				"error": responseJSON,
				"payload": _.clone(that.model.attributes)
			}, {});
		}
	};
	form.prototype.handleAPIError = function(xhr, response, options)
	{
		if (!response.key) {
			this.handleUncaughtError(response, options);
			return;
		}

		var that = this, fields, errCode = response.key;

		if (this.options.errorMapping[errCode]) {
			fields = this.options.errorMapping[errCode];
			if (!$.isArray(fields)) {
				fields = [fields];
			}
			$.each(fields, function(k, fld) {
				if (!that.showError(fld, errCode)) {
					that.handleNonConfiguredError(fld, xhr, errCode, response);
				}
			});
		} else {
			if (!this.showError(null, errCode)) {
				this.handleNonConfiguredError(null, xhr, errCode, response);
			}
		}
	};
	form.prototype.showError = function(field, code)
	{
		var errorLbl;

		if (field && code) {
			$('[name=\'' + field + '\'], [id=\'' + field + '\']', this.element).addClass('error');
			if (code === true) {
				errorLbl = $('label.form-error[for=\'' + field + '\']', this.element);
			} else {
				errorLbl = $('label.form-error[for=\'' + field + '\'][data-errcode=\'' + code + '\']', this.element);
			}
		} else if (code) {
			errorLbl = $('label.form-error[data-errcode=\'' + code + '\']', this.element);
		}

		if (!errorLbl.length) {
			return false;
		}
		errorLbl.css('display', 'block');
		return true;
	};
	form.prototype.handleNonConfiguredError = function(field, xhr, code, response)
	{
		var that = this;
		require(['modal', 'text!templates/modals/error.html'],
			function (Modal, errorTemplate) {
				// show notification of the error
				var modal,
				errorHTML = Mustache.render(errorTemplate, {
					apiError : true,
					code : code,
					message : (response && response.message) ? response.message : "Unknown error code " + code
				});
				modal = Modal.create({
					content: errorHTML
				});

				// log to server
				if (xhr.status < 500 || xhr.status >= 600) {
					var error = new ErrorModel();
					error.save({
						"page": window.location.href,
						"context": that.model.url(),
						"code": xhr ? xhr.status : 0,
						"error": "Error key '" + code + "' is unhandled in the UI",
						"payload": {
							sent : _.clone(that.model.attributes),
							received : response
						}
					}, {});
				}
			}
		);
	};

	form.prototype.showSuccess = function(code)
	{
		var el;
		if (code) {
			el = $('label.form-ok[data-code=\'' + code + '\']', this.element);
		} else {
			el = $('label.form-ok', this.element);
		}
		el.hide().slideDown('fast').delay(this.options.flashTime).slideUp('slow');
	}

	/**
	 * Reset to default state (except for the values.. y'know..)
	 */
	form.prototype.resetUI = function()
	{
		this.enable();
		$('[name], [id]', this.element).removeClass('error');
		$('label.form-error, label.form-ok', this.element).css('display', '');
	};

	/**
	 * Disables the form when submitting - just the controls relevant to that.
	 */
	form.prototype.disable = function()
	{
		$('input[type="submit"]', this.element).attr('disabled', 'disabled');
	};
	form.prototype.enable = function()
	{
		$('input[type="submit"]', this.element).removeAttr('disabled');
	};

	return {
		create : function (el, Model, options) {
			return new form(el, Model, options);
		}
	};
});

