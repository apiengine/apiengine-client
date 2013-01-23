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
 * :TODO:
 * - success flash messages
 *
 * @package	APIEngine Client
 * @author	Sam Pospischil <pospi@spadgos.com>
 * @since	23/1/13
 */
define(['jquery'], function ($) {
	var defaultOptions = {
		onPreValidate : null,
		onPreSend : null,
		validate : null,

		skipSubmitEvent : false
	};

	var form = function(el, Model, options) {
		var options = $.extend({}, defaultOptions, options),
			that = this;

		this.model = Model;
		this.options = options;

		// bind DOM events
		this.element = $(el);

		if (!options.skipSubmitEvent) {
			this.element.on('submit', function(ev) {
				var attributes = that.element.serializeObject();
				attributes = that.presend(attributes);
				if (attributes === false) {
					return false;
				}
				that.resetUI();
				that.save(attributes);
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
						that.showError(fldName, errCode);
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
	form.prototype.save = function(attributes, options)
	{
		this.disable();
		this.model.save(attributes, this.extendOptions(options));
	};

	form.prototype.fetch = function(options)
	{
		this.disable();
		this.model.fetch(this.extendOptions(options));
	};

	form.prototype.destroy = function(options)
	{
		this.disable();
		this.model.destroy(this.extendOptions(options));
	};

	// bind default callbacks for request actions
	form.prototype.extendOptions = function(options)
	{
		var that = this;
		return $.extend({
			success: function(model, response, options) {
				that.enable.call(that);

				console.log(response);
			},
			error: function(model, xhr, options) {
				that.enable.call(that);
				that.handleUncaughtError();		// :TODO:

				console.log(xhr);
			}
		}, options);
	}

	/**
	 * Error handling
	 */
	form.prototype.handleUncaughtError = function()
	{
		// :TODO:
	};
	form.prototype.handleAPIError = function()
	{

	};
	form.prototype.showError = function(field, code)
	{
		$('input[name=\'' + field + '\'], input[id=\'' + field + '\']', this.element).addClass('error');
		if (code === true) {
			$('label.form-error[for=\'' + field + '\']', this.element).css('display', 'block');
		} else {
			$('label.form-error[for=\'' + field + '\'][data-errcode=\'' + code + '\']', this.element).css('display', 'block');
		}
	};

	/**
	 * Reset to default state (except for the values.. y'know..)
	 */
	form.prototype.resetUI = function()
	{
		this.enable();
		$('input', this.element).removeClass('error');
		$('label.form-error', this.element).css('display', '');
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

