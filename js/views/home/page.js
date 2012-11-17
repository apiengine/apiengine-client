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
  'animations/collaboration',
  'animations/framework',
  'animations/mobile',
  'animations/private',
  'animations/public',
  'animations/stylish'
], function($, _, Backbone, swiffy, Session, homeTemplate, AuthView, ApisList, exampleLoginTemplate, exampleLogoutTemplate, Modal, logint, acogs, acollaboration, aframework,amobile,aprivate,apublic,astylish){
  var ExamplePage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes

    },
    render: function () {
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
                "top": '70px',
              opacity: 1
              }, {
                duration: 750,
                easing: 'easeOutQuad'
              });



              $('.slide1 .tag').animate({
                "top": '190px',
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
                "top": '70px',
              opacity: 1
              }, {
                duration: 750,
                easing: 'easeOutQuad'
              });



              $('.slide2 .tag').animate({
                "top": '190px',
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
                "top": '70px',
              opacity: 1
              }, {
                duration: 750,
                easing: 'easeOutQuad'
              });



              $('.slide3 .tag').animate({
                "top": '190px',
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
        }, 7000);
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
          newSlide.onEnter(this.complete.bind(this));
        }
      };
      Slider.prototype.start = function () {
        this.changeSlide(null, this.currentSlide);

      }

      Slider.prototype.stop = function () {
        this.stopped = true;

      }
      this.slider = new Slider();
      this.slider.slides = slides;
      this.slider.start();
      $('body').on('click', '[data-slide]', function (ev) {
        that.slider.changeSlide(that.slider.currentSlide, $(ev.currentTarget).attr('data-slide')*1);
      });

      this.stage4 = new swiffy.Stage(document.getElementById('collaboration'),acollaboration);
      this.stage5 = new swiffy.Stage(document.getElementById('stylish'),astylish);
      this.stage6 = new swiffy.Stage(document.getElementById('framework'),aframework);
      this.stage7 = new swiffy.Stage(document.getElementById('cogs'),acogs);


      
      this.stage4.start();
      this.stage5.start();
      this.stage6.start();
      this.stage7.start();


        var apisList = new ApisList({is_public: true, el: '.public-container'});
        apisList.render();

    }, 
    clean: function () {
      this.slider.stop();
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
