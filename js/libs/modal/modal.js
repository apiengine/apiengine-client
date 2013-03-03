define(['jquery', 'autogrow', 'mustache', 'form', 'text!templates/modals/inlineedit.html'], function ($, nothing, Mustache, FormFactory, inlineEditTpl) {
  var defaultOptions = {
  // inline : {
  // 	from : $(ev.currentTarget),					required. element to inline edit
  //   	model : this.options.model,					required. model to run the update on
  //   	field : 'description',						required. field to update in the model
  // 	value : 'value to prefill with',			defaults to value of element to inline, or its text contents
  //	errordef : string							A block of markup to inflate into the dialog's error handler div for handling of serverside errors.
  //												Edits which could result in any kind of client error should provide this field to avoid having the global error handler called.
  //   	title : 'Edit description',					title for inline edit dialog. Defaults to 'data-inline-title' attribute of 'from' element.
  // 	savetext : 'text for OK button',			default 'Save'
  // 	canceltext : 'text for cancel button'		default 'Cancel'
  //
  //	cloneDOM : false							if true, take the whole DOM node for 'from' element, instead of putting its value inside the edit field
  // }
  	startHidden : false
  };

  //----------------------------------------------------------------------------
  // INITIAL RENDERING
  //----------------------------------------------------------------------------

  var modal = function (options) {
    var options = $.extend({}, defaultOptions, options),
    	that = this;

    // add overlay
    this.overlay = $('<div>');
    this.overlay.addClass('overlay')
    $('body').append(this.overlay);

    // create container element
    this.el = $('<div>');
    this.el.addClass('modal');

    // set contents as appropriate
    if (options.content) {
	    this.el.html(options.content);
	} else if (options.inline) {
		var from = $(options.inline.from);
		this.el.html(Mustache.render(inlineEditTpl, {
			title : options.inline.title || from.attr('data-inline-title') || 'Edit field',
			value : options.inline.cloneDOM ? '' : ($.trim(options.inline.value || from.val() || from.text())),
			savetext : options.inline.savetext || 'Save',
			canceltext : options.inline.canceltext || 'Cancel'
		}, {
			errordef : options.inline.errordef || ''
		}));
	}

    // append to DOM
    $('body').append(this.el);

    // position onscreen depending on modal type
    if (!options.inline) {
		// REGULAR CENTERED MODALS
		$(this.el).css({
			'margin-left': -($(this.el).width() / 2) + 'px'
		});
    } else if (!options.inline.cloneDOM) {
    	// INLINE EDIT MODALS
        var to = $(".inline-field", this.el);

        matchPosition.call(this, from, to);

      	to.css({
	      fontSize : from.css('font-size'),
	      fontFamily : from.css('font-family')
	    });

        to.autogrow();
    } else {
    	// INLINE COMPLEX MODALS
    	var to = $(options.inline.from).clone();

		this.el.find('.inline-field').replaceWith(to);

        matchPosition.call(this, from, to);
    }

    // bind form controller if one is specified in options
    if (options.form) {
    	this.form = FormFactory.create($(options.form.element || 'form.inline-edit', this.el), options.form.model, options.form);
    }
    // otherwise, bind submit event for inline modals
    else if (options.inline && options.inline.model && options.inline.field) {
    	this.inline = true;

    	this.form = FormFactory.create($('form.inline-edit', this.el), options.inline.model, $.extend({
    		onPreValidate : function(attribs) {
    			attribs[options.inline.field] = attribs.field;
    			delete attribs.field;

    			if (options.inline.form && options.inline.form.onPreValidate) {
    				attribs = options.inline.form.onPreValidate.call(that.form, attribs);
    			}

    			return attribs;
    		},
    		success : function(model, response, options) {
    			try {
    				from.val(model.get(options.inline.field));
    			} catch(e) {
    				from.text(model.get(options.inline.field));
    			}
    			if (options.inline.form && options.inline.form.success) {
    				options.inline.form.success.call(this, model, response, options);
    			}
    			that.hide();
    		}
    	}, options.inline.form || {}));
    }

    if (!options.startHidden) {
    	this.show();
    }
  };

  //----------------------------------------------------------------------------
  // INTERNALS
  //----------------------------------------------------------------------------

  function matchPosition(from, to)
  {
	fromTop = from.offset().top,
  	fromLeft = from.offset().left,
  	toTop = this.el.offset().top - to.offset().top -
  			parseInt(to.css('padding-top')) + parseInt(from.css('padding-top')) -
  			(parseInt(to.css('border-top-width')) - parseInt(from.css('border-top-width'))),
  	toLeft = this.el.offset().left - to.offset().left -
  			parseInt(to.css('padding-left')) + parseInt(from.css('padding-left')) -
  			(parseInt(to.css('border-left-width')) - parseInt(from.css('border-left-width')));

    to.css({
      width: from.width(),
      height: from.height()
    });

    this.el.css({
      top: fromTop + toTop,
      left: fromLeft + toLeft,
      position: 'absolute'
    });
  }

  //----------------------------------------------------------------------------
  // OBJECT METHODS
  //----------------------------------------------------------------------------

  modal.prototype.show = function () {
    this.el.addClass('shown');
    if (this.inline) {
		$(".inline-field", this.el).focus().select();
    }
  };

  modal.prototype.hide = function (animation) {
    var that = this,
    	els = $().add(this.el).add(this.overlay);
    els.fadeOut(200, function () {
      that.el.remove();
      that.overlay.remove();
      delete that.form;
      delete that;
    });
  };

  //----------------------------------------------------------------------------
  // FACTORY
  //----------------------------------------------------------------------------

  var create = function (options) {
    var Modal = new modal(options);
    $('.js-close-modal', Modal.el).on('click', function (){
      Modal.hide();
    });

    $(document).on('keydown', function (ev){
      if(ev.which == 27){

       Modal.hide();
      }
    })
    return Modal;
  };


  return {
    create: create
  };

});

