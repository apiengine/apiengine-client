define([
  'jquery',
  'underscore',
  'backbone',
  'libs/swiffy/swiffy',
  'models/session',
  'text!templates/home/page.html',
  'views/user/auth',
  'views/apis/list',
  'text!templates/example/login.html',
  'text!templates/example/logout.html',
  'modal',
  'text!templates/modals/login.html',
  'animations/cogs',
  'animations/mobile',
  'animations/private',
  'animations/public'
], function($, _, Backbone, swiffy, Session, homeTemplate, AuthView, ApisList, exampleLoginTemplate, exampleLogoutTemplate, Modal, logint, acogs, amobile,aprivate,apublic){
  var ExamplePage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    render: function () {
      if(Session.get('auth')) {
        Backbone.history.navigate(Session.get('login'), {trigger: true});
      } else {
        var that = this;
        this.$el.hide().fadeIn(250);
        
        // Simply choose which template to choose depending on
        // our Session models auth attribute      
        $('.top-bar-menu li a.active').removeClass('active');
        $('.top-bar-menu li a.home-button').addClass('active');
        if(Session.get('auth')){
          this.$el.html(_.template(homeTemplate, {username: Session.get('login')}));




          var apisList = new ApisList({is_public: false, el: '.private-container'});
          apisList.render();
        } else {
          this.$el.html(_.template(homeTemplate, {username: false, errors: Session.get('errors'), _: _})); 
          var authView = new AuthView();
          authView.render();
        }




  jQuery.easing.def = "easeInBounce";
      var stage, stage2, stage3; 
        var firstslide = {
          onEnter: function (complete) {
              that.stage = new swiffy.Stage(document.getElementById('swiffycontainer'),
                                     amobile);
                  that.stage.start();

              $('#swiffycontainer').css({
                right: "-100px",
                opacity: 0
              })
             $('.slide1 .heading-container').css({
                opacity: 0,
                top: "-30px"
              })
             $('.slide1 .tag').css({
                opacity: 0,
                top: "290px"
              })
                $('#swiffycontainer').animate({
                  "right": '0',
                opacity: 1
                }, {
                  duration: 750,
                  easing: 'easeOutQuad',
                  complete:complete
                });


                $('.slide1 .heading-container').animate({
                  "top": '50px',
                opacity: 1
                }, {
                  duration: 750,
                  easing: 'easeOutQuad'
                });



                $('.slide1 .tag').animate({
                  "top": '170px',
                opacity: 1
                }, {
                  duration: 750,
                  easing: 'easeOutQuad'
                });


          },
          onLeave: function () {

           $('#swiffycontainer').animate({
             
              opacity: 0,
            }, {
                  duration: 0,
                  easing: 'easeOutQuad',
                  complete: function (){
              that.stage.destroy();
                  }
                });



           $('.slide1 .heading-container').animate({
                
                   opacity: 0,
                }, {
                  duration: 0,
                  easing: 'easeOutQuad'
                });



                $('.slide1 .tag').animate({
                 
                   opacity: 0
                }, {
                  duration: 0,
                  easing: 'easeOutQuad'
                });


          }

        }
        var secondslide = {
        onEnter: function (complete) {
                 that.stage1 = new swiffy.Stage(document.getElementById('swiffycontainer2'),
                                     aprivate);
                 that.stage1.start();
                      $('#swiffycontainer2').css({
                right: "-100px",
                opacity: 0
              })
             $('.slide2 .heading-container').css({
                opacity: 0,
                top: "-30px"
              })
             $('.slide2 .tag').css({
                opacity: 0,
                top: "290px"
              })
                $('#swiffycontainer2').animate({
                  "right": '0',
                opacity: 1
                }, {
                  duration: 750,
                  easing: 'easeOutQuad',
                  complete:complete
                });


                $('.slide2 .heading-container').animate({
                  "top": '50px',
                opacity: 1
                }, {
                  duration: 750,
                  easing: 'easeOutQuad'
                });



                $('.slide2 .tag').animate({
                  "top": '170px',
                opacity: 1
                }, {
                  duration: 750,
                  easing: 'easeOutQuad'
                });

          },
          onLeave: function () {

           $('#swiffycontainer2').animate({
              opacity: 0,
            }, {
                  duration: 0,
                  easing: 'easeOutQuad',
                  complete: function (){
                 that.stage1.destroy();

                  }
                });



           $('.slide2 .heading-container').animate({
                   opacity: 0,
                }, {
                  duration: 0,
                  easing: 'easeOutQuad'
                });



                $('.slide2 .tag').animate({
                  opacity: 0,
                }, {
                  duration: 0,
                  easing: 'easeOutQuad'
                });


          }
        }
        var thirdslide = {
   onEnter: function (complete) {
                that.stage3 = new swiffy.Stage(document.getElementById('swiffycontainer3'),
                                     apublic);
                 that.stage3.start();
          $('#swiffycontainer3').css({
                right: "-100px",
                opacity: 0
              })
             $('.slide3 .heading-container').css({
                opacity: 0,
                top: "-30px"
              })
             $('.slide3 .tag').css({
                opacity: 0,
                top: "290px"
              })
                $('#swiffycontainer3').animate({
                  "right": '0',
                opacity: 1
                }, {
                  duration: 750,
                  easing: 'easeOutQuad',
                  complete:complete
                });


                $('.slide3 .heading-container').animate({
                  "top": '50px',
                opacity: 1
                }, {
                  duration: 750,
                  easing: 'easeOutQuad'
                });



                $('.slide3 .tag').animate({
                  "top": '170px',
                opacity: 1
                }, {
                  duration: 750,
                  easing: 'easeOutQuad'
                });

          },
          onLeave: function () {

           $('#swiffycontainer3').animate({
              opacity: 0,
            }, {
                  duration: 0,
                  easing: 'easeOutQuad',
                  complete: function (){
                 that.stage3.destroy();

                  }
                });



           $('.slide3 .heading-container').animate({
                   opacity: 0,
                }, {
                  duration: 0,
                  easing: 'easeOutQuad'
                });



                $('.slide3 .tag').animate({
                  opacity: 0,
                }, {
                  duration: 0,
                  easing: 'easeOutQuad'
                });


          }
        }

        var slides = [firstslide, secondslide, thirdslide];

  (function ($) {
      'use strict';
      
      var DEFAULT_VALUE = 360;
      
      var DEFAULT_SETTINGS = {
          seconds: 10,
          color: 'rgba(255, 255, 255, 0.8)',
          height: null,
          width: null
      };

      // Internal constants
      var PIE_TIMER_INTERVAL = 40;
      
      var TIMER_CSS_CLASS = 'pie_timer';
      
      var PIE_TIMER_DATA_NAME = 'pie_timer';
      
      // Math constants
      var THREE_PI_BY_TWO = 3 * Math.PI / 2;
      
      var PI_BY_180 = Math.PI / 180;
      
      var PieTimer = function (jquery_object, settings, callback) {
          if (settings.width === null) {
              settings.width = jquery_object.width();
          }
          if (settings.height === null) {
              settings.height = jquery_object.height();
          }
          
          this.settings = settings;
          this.jquery_object = jquery_object;
          this.interval_id = null;
          this.current_value = DEFAULT_VALUE;
          this.callback = callback;
          this.is_paused = true;
          this.jquery_object.html('<canvas class="' + TIMER_CSS_CLASS + '" width="' + settings.width + '" height="' + settings.height + '"></canvas>');
          this.canvas = this.jquery_object.children('.' + TIMER_CSS_CLASS)[0];
                      var ctx = this.canvas.getContext('2d');

                      ctx.fillStyle = "#fff";
                      ctx.beginPath();
                      ctx.arc(5, 5, 5, 0, Math.PI*2, true);
                      ctx.closePath();
                      ctx.fill();

      };
      
      PieTimer.prototype = {
          start: function () {
              if (this.is_paused) {
                  if (this.current_value <= 0) {
                      this.current_value = DEFAULT_VALUE;
                  }
                  this.interval_id = setInterval($.proxy(this.run_timer, this), PIE_TIMER_INTERVAL);
                  this.is_paused = false;
              }
          },
          
          reseta: function () {
                      var ctx = this.canvas.getContext('2d');
                      this.canvas.width = this.settings.width;
                      this.current_value = DEFAULT_VALUE;
                  clearInterval(this.interval_id);
                  this.is_paused = true;
                        ctx.fillStyle = "#fff";
                      ctx.beginPath();
                      ctx.arc(5, 5, 5, 0, Math.PI*2, true);
                      ctx.closePath();
                      ctx.fill();
          },
          pause: function () {
              if (!this.is_paused) {
                  clearInterval(this.interval_id);
                  this.is_paused = true;
              }
          },

          run_timer: function () {
              if (this.canvas.getContext) {

                  this.current_value -= (DEFAULT_VALUE / this.settings.seconds) / 24;

                  if (this.current_value <= 0) {
                      clearInterval(this.interval_id);
                      
                      // This is a total hack to clear the canvas. It would be 
                      // better to fill the canvas with the background color
                      //this.canvas.width = this.settings.width;
                      
                      if ($.isFunction(this.callback)) {
                          this.callback.call();
                      }
                      this.is_paused = true;

                  } else {
                      // This is a total hack to clear the canvas. It would be 
                      // better to fill the canvas with the background color
                      this.canvas.width = this.settings.width;

                      var ctx = this.canvas.getContext('2d');

                      var canvas_size = [this.canvas.width, this.canvas.height];
                      var radius = Math.min(canvas_size[0], canvas_size[1]) / 2;
                      var center = [canvas_size[0] / 2, canvas_size[1] / 2];

                        ctx.fillStyle = "#fff";
                      ctx.beginPath();
                      ctx.arc(6, 6, 5, 0, Math.PI*2, true);
                      ctx.closePath();
                      ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "ea2452";
  ctx.stroke();
                      ctx.beginPath();
                      ctx.moveTo(center[0], center[1]);
                      var start = THREE_PI_BY_TWO;
                      ctx.arc(
                          6,
                          6,
                          5,
                          start - this.current_value * PI_BY_180,
                          start,
                          false
                      );

                      ctx.closePath();
                      ctx.fillStyle = '#ea2452';
                      ctx.fill();
                  }
              }
          }
      };
      
      var create_timer = function (options, callback) {
          var settings = $.extend({}, DEFAULT_SETTINGS, options);
          
          return this.each(function () {
              var $element = $(this);
              var pie_timer = new PieTimer($element, settings, callback);
              $element.data(PIE_TIMER_DATA_NAME, pie_timer);
          });
      };
      
      var call_timer_method = function (method_name) {
          if (!(method_name in PieTimer.prototype)) {
              $.error('Method ' + method_name + ' does not exist on jQuery.pietimer');
          }
          var sliced_arguments = Array.prototype.slice.call(arguments, 1);
          
          return this.each(function () {
              var $element = $(this);
              var pie_timer = $element.data(PIE_TIMER_DATA_NAME);
              
              if (!pie_timer) {
                  // This element hasn't had pie timer constructed yet, so skip it
                  return true;
              }
              console.log(method_name);
              pie_timer[method_name].apply(pie_timer, sliced_arguments);
          });
      };

      $.fn.pietimer = function (method) {
          
          if (typeof method === 'object' || ! method) {
              return create_timer.apply(this, arguments);
          } else {
              return call_timer_method.apply(this, arguments);
          }
      };

  })($);
        var Slider = function () {
          this.slides = [];
          this.currentSlide = 0;
        }
        Slider.prototype.complete = function () {
          var that = this;
          if(this.completeTimer) {
            clearTimeout(this.completeTimer);
          }
          this.completeTimer = setTimeout(function () {
            var oldIndex = that.currentSlide;
            if(that.currentSlide + 1 === that.slides.length) {
              that.currentSlide = 0;
            } else {
              that.currentSlide = that.currentSlide + 1;
            }
            that.changeSlide(oldIndex, that.currentSlide)
          }, 8000);
        };
        Slider.prototype.changeSlide = function (lastSlideIndex, newSlideIndex) {
          if(!this.stopped) {
            var lastSlide = slides[lastSlideIndex];
            var newSlide = slides[newSlideIndex];
            if(lastSlide) {
              lastSlide.onLeave();
            }
            this.currentSlide = newSlideIndex;

            $('.slider-buttons li.active').removeClass('active');
            $('.slider-buttons li[data-slide="'+this.currentSlide+'"]').addClass('active');

    $('.slider-buttons li[data-slide="'+lastSlideIndex+'"]').pietimer('reseta');

   $('.slider-buttons li[data-slide="'+this.currentSlide+'"]').pietimer('start');

            newSlide.onEnter(this.complete.bind(this));
          }
        };
        Slider.prototype.start = function () {
          this.changeSlide(null, this.currentSlide);

        }

        Slider.prototype.stop = function () {
          this.stopped = true;

        }


         $('.slider-buttons li').pietimer({
            seconds: 7.5,
            color: '#000',
        },
        function(){
            //Do something
        });

        this.slider = new Slider();
        this.slider.slides = slides;
        this.slider.start();
        $('body').on('click', '[data-slide]', function (ev) {
          that.slider.changeSlide(that.slider.currentSlide, $(ev.currentTarget).attr('data-slide')*1);
        });

        this.stage7 = new swiffy.Stage(document.getElementById('cogs'),acogs);


        
        this.stage7.start();


          var apisList = new ApisList({is_public: true, el: '.public-container'});
          apisList.render();
        }
    }, 
    clean: function () {
      this.slider && this.slider.stop();
      this.stage && this.stage.destroy();
      this.stage1 && this.stage1.destroy();
      this.stage3 && this.stage3.destroy();
      this.stage4 && this.stage4.destroy();
      this.stage5 && this.stage5.destroy();
      this.stage6 && this.stage6.destroy();
      this.stage7 && this.stage7.destroy();
    }
  });
  return ExamplePage;
});
