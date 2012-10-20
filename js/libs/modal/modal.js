define(['jquery'], function ($) {
  var defaultOptions = {

  };
  var modal = function (options) {
    var options = $.extend(defaultOptions, options);

    
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
        height: from.height(),
        outline: '1px solid #000'
      });
      var toTop = $(this.el).offset().top - $(to).offset().top;
      var toLeft = $(this.el).offset().left - $(to).offset().left;
      console.log($(this.el).offset().top, $(to).offset().top);
      $(this.el).css({
        top: fromTop + toTop,
        left: fromLeft + toLeft,
        position: 'absolute'
      })
    };

    this.el.css({visibility: 'visible'});



  };

  modal.prototype.show = function () {
    this.addClass('shown')
  };
  
  modal.prototype.hide = function () {
    this.el.remove();
    this.overlay.remove();
    delete this;
  };


  var create = function (options) {
    var Modal = new modal(options);
    $('.js-close-modal', Modal.el).on('click', function (){
      Modal.hide();
    })
    return Modal;
  };


  return {
    create: create
  };

});

// GAVE UP