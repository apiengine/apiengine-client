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
    $('body').append(this.el);


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