define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/home/page.html',
  'views/user/auth',
  'views/apis/list',
  'text!templates/example/login.html',
  'text!templates/example/logout.html',
  'modal',
  'text!templates/modals/login.html'
], function($, _, Backbone, Session, homeTemplate, AuthView, ApisList, exampleLoginTemplate, exampleLogoutTemplate, Modal, logint){
  var ExamplePage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    render: function () {
      $('body').addClass('grey');
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

      var firstslide = {
        onEnter: function (complete) {
                var stage = new swiffy.Stage(document.getElementById('swiffycontainer'),
                                   swiffyobject);
                stage.start();

            $('#swiffycontainer').css({
              right: "-500px",
              opacity: 1
            })
           $('.slide1 .heading-container').css({
              opacity: 1,
              top: "-300px"
            })
           $('.slide1 .tag').css({
              opacity: 1,
              top: "300px"
            })
          console.log('First slide enters');
              $('#swiffycontainer').animate({
                "right": '0',
              }, {
                duration: 750,
                easing: 'easeOutQuad',
                complete:complete
              });


              $('.slide1 .heading-container').animate({
                "top": '70px',
              }, {
                duration: 750,
                easing: 'easeOutQuad'
              });



              $('.slide1 .tag').animate({
                "top": '190px',
              }, {
                duration: 750,
                easing: 'easeOutQuad'
              });


        },
        onLeave: function () {
          console.log('First slide leaves');

         $('#swiffycontainer').animate({
           
            opacity: 0,
          }, {
                duration: 500,
                easing: 'easeOutQuad',
                complete: function (){
               $('#swiffycontainer').empty();

                }
              });



         $('.slide1 .heading-container').animate({
              
                 opacity: 0,
              }, {
                duration: 500,
                easing: 'easeOutQuad'
              });



              $('.slide1 .tag').animate({
               
                 opacity: 0
              }, {
                duration: 500,
                easing: 'easeOutQuad'
              });


        }

      }
      var secondslide = {
      onEnter: function (complete) {
               var stage1 = new swiffy.Stage(document.getElementById('swiffycontainer2'),
                                   swiffyobject2);
               stage1.start();
        $('#swiffycontainer2').css({
              right: "-500px",
              opacity: 1
            })
           $('.slide2 .heading-container').css({
              opacity: 1,
              top: "-300px"
            })
           $('.slide2 .tag').css({
              opacity: 1,
              top: "300px"
            })
          console.log('First slide enters');
              $('#swiffycontainer2').animate({
                "right": '0',
              }, {
                duration: 750,
                easing: 'easeOutQuad',
                complete:complete
              });


              $('.slide2 .heading-container').animate({
                "top": '70px',
              }, {
                duration: 750,
                easing: 'easeOutQuad'
              });



              $('.slide2 .tag').animate({
                "top": '190px',
              }, {
                duration: 750,
                easing: 'easeOutQuad'
              });


        },
        onLeave: function () {
          console.log('First slide leaves');

         $('#swiffycontainer2').animate({
            opacity: 0,
          }, {
                duration: 500,
                easing: 'easeOutQuad',
                complete: function (){
               $('#swiffycontainer2').empty();

                }
              });



         $('.slide2 .heading-container').animate({
                 opacity: 0,
              }, {
                duration: 500,
                easing: 'easeOutQuad'
              });



              $('.slide2 .tag').animate({
                opacity: 0,
              }, {
                duration: 500,
                easing: 'easeOutQuad'
              });


        }
      }
      var thirdslide = {
 onEnter: function (complete) {
               var stage3 = new swiffy.Stage(document.getElementById('swiffycontainer3'),
                                   swiffyobject3);
               stage3.start();
        $('#swiffycontainer3').css({
              right: "-500px",
              opacity: 1
            })
           $('.slide3 .heading-container').css({
              opacity: 1,
              top: "-300px"
            })
           $('.slide3 .tag').css({
              opacity: 1,
              top: "300px"
            })
          console.log('First slide enters');
              $('#swiffycontainer3').animate({
                "right": '0',
              }, {
                duration: 750,
                easing: 'easeOutQuad',
                complete:complete
              });


              $('.slide3 .heading-container').animate({
                "top": '70px',
              }, {
                duration: 750,
                easing: 'easeOutQuad'
              });



              $('.slide3 .tag').animate({
                "top": '190px',
              }, {
                duration: 750,
                easing: 'easeOutQuad'
              });


        },
        onLeave: function () {
          console.log('First slide leaves');

         $('#swiffycontainer3').animate({
            opacity: 0,
          }, {
                duration: 500,
                easing: 'easeOutQuad',
                complete: function (){
               $('#swiffycontainer3').empty();

                }
              });



         $('.slide3 .heading-container').animate({
                 opacity: 0,
              }, {
                duration: 500,
                easing: 'easeOutQuad'
              });



              $('.slide3 .tag').animate({
                opacity: 0,
              }, {
                duration: 500,
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
        setTimeout(function () {
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
        var lastSlide = slides[lastSlideIndex];
        var newSlide = slides[newSlideIndex];
        if(lastSlide) {
          lastSlide.onLeave();
        }
        this.currentSlide = newSlideIndex;
        newSlide.onEnter(this.complete.bind(this));
      };
      Slider.prototype.start = function () {
        this.changeSlide(null, this.currentSlide);

      }
      var slider = new Slider();
      slider.slides = slides;
      slider.start();


        var apisList = new ApisList({is_public: true, el: '.public-container'});
        apisList.render();

    }
  });
  return ExamplePage;
});
