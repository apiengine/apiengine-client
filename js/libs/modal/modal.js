define(['jquery', 'form'], function ($, FormFactory) {
  var defaultOptions = {

  };
  var modal = function (options) {
    var options = $.extend({}, defaultOptions, options),
    	that = this;


    this.overlay = $('<div>');
    this.overlay.addClass('overlay')
    $('body').append(this.overlay);

    this.el = $('<div>');
    this.el.html(options.content);
    this.el.addClass('modal')
    this.el.css({visibility: 'hidden'});

    $('body').append(this.el);



    if(options.inline) {
      var from = options.inline.from;
      var to = $(options.inline.to, this.el);
      var fromTop = $(from).offset().top;
      var fromLeft = $(from).offset().left;
      $(to).css({
        width: from.width(),
        height: from.height()
      });
      var toTop = $(this.el).offset().top - $(to).offset().top;
      var toLeft = $(this.el).offset().left - $(to).offset().left;
      $(this.el).css({
        top: fromTop + toTop,
        left: fromLeft + toLeft,
        position: 'absolute'
      })
    } else {
      $(this.el).css({
        'margin-left': -($(this.el).width() / 2) + 'px'
      });
    }

    this.el.css({visibility: 'visible'});

    // bind form controller if one is specified in options
    if (options.form) {
    	this.form = FormFactory.create($(options.form.element, this.el), options.form.model, options.form);
    }

  };

  modal.prototype.show = function () {
    this.el.addClass('shown')
  };

  modal.prototype.hide = function (animation) {
    var that = this;
    this.el.fadeOut(200);
    this.overlay.fadeOut(200, function () {

      that.el.remove();
      that.overlay.remove();
      delete that;
    });
  };



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

