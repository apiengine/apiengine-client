 /*
 * Fallr v1.3.2 - jQuery Plugin
 * Simple & elegant modal box jQuery plugin
 *
 * Copyright 2011-2012 amatyr4n
 * http://codecanyon.net/user/amatyr4n?ref=amatyr4n
 *
 * licensed under Envato licenses
 * http://wiki.envato.com/support/legal-terms/licensing-terms/?ref=amatyr4n
 *
 * Any suggestions, bug report, or whatever feedback are welcome :)
 */

/*global jQuery:false, document:false, window:false */

;(function($){
       
    // define default properties
    var defaults =  {
                        buttons         : { 
                                            // object contains buttons definition
                                            button1 : {
                                                        text    : 'OK',                 // default button text
                                                        danger  : false,                // is the button trigger dangerous action?
                                                        onclick : function(){           // default button function 
                                                                    $.fallr('hide'); 
                                                                  }
                                            }
                                          },
                        icon            : 'check',          // [string] icon displayed
                        content         : 'Hello',          // [string] fallr content
                        position        : 'top',            // [string] top/center/bottom
                        closeKey        : true,            // [bool] close fallr with ESC key
                        closeOverlay    : false,            // [bool] close fallr on overlay click
                        useOverlay      : true,             // [bool] should overlay be shown
                        autoclose       : false,            // [int] autoclose duration in miliseconds, false to disable
                        easingDuration  : 300,              // [int] animation duration
                        overflowDuration  : 300,              // [int] animation duration
                        easingIn        : 'swing',          // [string] easing type when appear
                        easingOut       : 'swing',          // [string] easing type when disappear
                        height          : 'auto',           // [string] css value for exact height
                        width           : '360px',          // [string] css value for exact width
                        zIndex          : 100,              // [int] set z-index
                        bound           : window,           // [string/object] jQuery selector for costum boundary
                        afterHide       : function(){},     // [function] after hide callback, can be overrided by parameter
                        afterShow       : function(){}      // [function] after show callback, can be overrided by parameter
                    },
                    
        opts, // hold options settings. defined later
        timeoutId, // hold timeout id
        $w      = $(window),
        
        // public methods        
        methods = {
        
            hide    : function(options, callback, self){
                
                // is it present?
                if(methods.isActive()){
                
                    // stop from animating
                    $('#fallr-wrapper').stop(true, true);
              
                    var $f      = $('#fallr-wrapper'),                        
                        pos     = $f.css('position'),   // fixed/absolute
                        isFixed = (pos === 'fixed'),
                        yminpos = 0;
                        
                    switch(opts.position){
                        case 'bottom':
                        case 'center':
                            // get bottom of page coordinat
                            yminpos = (isFixed ? $w.height() : $f.offset().top + $f.outerHeight()) + 10;
                            break;
                        // case 'top':
                        default:
                            // get top of page coordinat
                            yminpos = (isFixed ? (-1) * ($f.outerHeight()) : $f.offset().top - $f.outerHeight()) - 10;
                    }
                    
                    // animate hide
                    $f.animate({
                            'top' : (yminpos),
                            'opacity' : isFixed ? 1 : 0
                        }, (opts.easingDuration || opts.duration), opts.easingOut,function(){
                            if($.browser.msie){
							    $('#fallr-overlay').css('display', 'none');
						    } else {
							    $('#fallr-overlay').fadeOut('fast');
						    }
                            
                            // remove element
                            $f.remove();
                            
                            // clear timeout
                            clearTimeout(timeoutId);
                            
                            // execute callback
                            callback = typeof callback === "function" ? callback : opts.afterHide;
                            callback.call(self);
                    });
                    
                    $(document)
                        .unbind('keydown', helpers.enterKeyHandler)
                        .unbind('keydown', helpers.closeKeyHandler)
                        .unbind('keydown', helpers.tabKeyHandler);
                }
            },
            
            resize  : function(options, callback, self){
            
                var $f          = $('#fallr-wrapper'),
                    newWidth    = parseInt(options.width, 10),
                    newHeight   = parseInt(options.height, 10),
                    diffWidth   = Math.abs($f.outerWidth() - newWidth),
                    diffHeight  = Math.abs($f.outerHeight() - newHeight);
            
                // only fire if present and have enough different size
                if(methods.isActive() && (diffWidth > 5 || diffHeight > 5)){
                            
                    $f.animate({
                                'width'     : newWidth
                        }, function(){
                            $(this).animate({
                                'height'    : newHeight
                            }, function(){
                                helpers.fixPos();                                                                  
                            });
                    });
                    
                    $('#fallr').animate({
                                'width'     : newWidth - 94    // 94 = padding
                        }, function(){
                            $(this).animate({
                                'height'    : newHeight - 116  // 116 = padding+buttons
                            }, function(){
                                // execute callback
                                if(typeof callback === "function"){
                                    callback.call(self);
                                }
                            });
                    });  
                }
            },
            
            show    : function(options, callback, self){
                
                // check whether fallr is still present
                if(methods.isActive()){
                    
                    $('body','html').animate({
                            scrollTop : $('#fallr').offset().top
                        }, function(){
                            $.fallr('shake');                           
                    });
                    $.error('Can\'t create new message with content: "' + options.content + '", past message with content "' + opts.content + '" is still active');
                    
                } else {
                
                    opts = $.extend({}, defaults, options);  
                    
                    // create fallr instance
                    $('<div id="fallr-wrapper"></div>').appendTo('body');
                    
                    opts.bound = $(opts.bound).length > 0 ? opts.bound : window;
                        
                    var $f      = $('#fallr-wrapper'),
                        $o      = $('#fallr-overlay'),
                        isWin   = (opts.bound === window);
                                
                    $f.css({
                              'width'       : opts.width,
                              'height'      : opts.height,                           
                              'position'    : 'absolute',
                              'top'         : '-9999px',
                              'left'        : '-9999px'     // show but don't display inside window
                        })
                        .html('<div id="fallr-icon"></div>'         // for icon
                                + '<div id="fallr"></div>'          // for content
                                + '<div id="fallr-buttons"></div>') // for buttons
                        .find('#fallr-icon')
                            .addClass('icon-' + opts.icon)
                            .end()
                        .find('#fallr')
                            .html(opts.content)
                            .css({
                                'height'      : (opts.height == 'auto') ? 'auto' : $f.height() - 116,       // 131 = padding+buttons
                                'width'       : $f.width() - 94                                             // 94 = padding
                            })
                            .end()
                        .find('#fallr-buttons')
                            .html(
                                (function(){
                                    var buttons = '';
                                    var i;
                                    for(i in opts.buttons){
                                        if(opts.buttons.hasOwnProperty(i)){
                                            buttons = buttons 
                                                        + '<a href="#" class="fallr-button ' 
                                                        + (opts.buttons[i].danger ? 'fallr-button-danger' : '') 
                                                        + '" id="fallr-button-' + i + '">' 
                                                        + opts.buttons[i].text + '</a>';
                                        }
                                    }
                                    return buttons;
                                }())
                             )
                            .find('.fallr-button')
                                //.addClass(opts.theme)
                                .bind('click', function(){
                                    var buttonId = $(this).attr('id').substring(13); // id="fallr-button-12345" -> buttonId="12345"
                                    if(typeof opts.buttons[buttonId].onclick === 'function' && opts.buttons[buttonId].onclick != false){
                                        var scope = $('#fallr'); // content holder
                                        opts.buttons[buttonId].onclick.apply(scope); // every function attached to buttons will have $(this) as $('#fallr')
                                    } else {
                                        methods.hide();
                                    }
                                    return false;
                                });

                    var showFallr = function(){

                            // must be shown somewhere to count it's size/position, but not inside window yet
                            $f.show();
                            
                            var xpos        = isWin 
                                                ? (($w.width() - $f.outerWidth()) / 2 + $w.scrollLeft()) 
                                                : (($(opts.bound).width() - $f.outerWidth()) / 2 + $(opts.bound).offset().left),
                                yminpos,
                                ymaxpos,
                                
                                // if message wider than window viewport make it absolute 
                                pos         = ($w.height() > $f.height() && $w.width() > $f.width() && isWin) ? 'fixed' : 'absolute',
                                isFixed     = (pos === 'fixed');

                            switch(opts.position){
                                case 'bottom':
                                    yminpos = isWin 
                                                ? (isFixed 
                                                    ? $w.height() 
                                                    : $w.scrollTop() + $w.height()) 
                                                : ($(opts.bound).offset().top + $(opts.bound).outerHeight());
                                    ymaxpos = yminpos - $f.outerHeight();
                                    break;
                                case 'center':
                                    yminpos = isWin 
                                                ? (isFixed 
                                                    ? (-1) * $f.outerHeight() 
                                                    : $o.offset().top - $f.outerHeight()) 
                                                : ($(opts.bound).offset().top + ($(opts.bound).height() / 2) - $f.outerHeight());
                                    ymaxpos = yminpos + $f.outerHeight() + (((isWin 
                                                ? $w.height() 
                                                : $f.outerHeight() / 2) 
                                                    - $f.outerHeight()) / 2);
                                    break;
                                // case 'top':
                                default:
                                    ymaxpos = isWin 
                                                ? (isFixed 
                                                    ? 0 
                                                    : $w.scrollTop()) 
                                                : $(opts.bound).offset().top;
                                    yminpos = ymaxpos - $f.outerHeight();
                            }

                            // animate show                            
                            $f.css({
                                    'left'      : xpos,
                                    'position'  : pos,
                                    'top'       : yminpos,
                                    'z-index'   : opts.zIndex + 1
                                })
                                .animate({
                                        'top'       : ymaxpos
                                    }, opts.easingDuration, opts.easingIn, function(){
                                    
                                        // execute callback
                                        callback = typeof callback === "function" ? callback : opts.afterShow;
                                        callback.call(self);

                                        if(opts.autoclose){
                                            timeoutId = setTimeout(methods.hide, opts.autoclose);
                                        }
                                });
                    };
                    
                    if(opts.useOverlay){
                        // show overlay
                        if($.browser.msie && $.browser.version < 9){
                            $o.css({
                                    'display' : 'block',
                                    'z-index' : opts.zIndex
                            });
                            showFallr();
                        } else {
                            $o.css({
                                        'z-index' : opts.zIndex
                                }).fadeIn(opts.overlayDuration, showFallr);
                        }
                    } else {
                        showFallr();
                    }                        
                    
                    // Keydown handler
                    $(document)
                        .bind('keydown', helpers.enterKeyHandler)
                        .bind('keydown', helpers.closeKeyHandler)
                        .bind('keydown', helpers.tabKeyHandler);
                        
                    $('#fallr-buttons').children().eq(-1).bind('focus', function(){
                        //console.log('tab pressed');
                        $(this).bind('keydown', helpers.tabKeyHandler);                        
                    });
                    
                    $f.find(':input').bind('keydown', function(e){
                        helpers.unbindKeyHandler();
                        if(e.keyCode === 13){
                            //$(this).parents('form').trigger('submit');
                            $('.fallr-button').eq(0).trigger('click');
                        }
                    });
                }
            },
            
            set : function(options, callback, self){
                for(var i in options){
                    if(defaults.hasOwnProperty(i)){
                        // change default props with given props
                        defaults[i] = options[i];
                        if(opts && opts[i]){
                            opts[i] = options[i];
                        }
                    }
                }
                // execute callback
                if(typeof callback === "function"){
                    callback.call(self);
                }
            },
            
            isActive : function(){
                return !!($('#fallr-wrapper').length > 0);
            },
            
            blink   : function(){
                $('#fallr-wrapper').fadeOut(100, function(){
                    $(this).fadeIn(100);
                });
            },
            
            shake   : function(){
                $('#fallr-wrapper').stop(true,true).animate({'left':'+=20px'}, 50, function(){
                    $(this).animate({'left':'-=40px'}, 50, function(){
                        $(this).animate({'left':'+=30px'}, 50, function(){
                            $(this).animate({'left':'-=20px'}, 50, function(){
                                $(this).animate({'left':'+=10px'}, 50);
                            });
                        });
                    });
                });
            }
        },
        
        helpers = {
            
            fixPos  : function(){
                var $f  = $('#fallr-wrapper'),
                    pos = $f.css('position');
                if($w.width() > $f.outerWidth() && $w.height() > $f.outerHeight()){
                    var newLeft = ($w.width() - $f.outerWidth()) / 2,
                        newTop = $w.height() - $f.outerHeight();
                    switch(opts.position){
                        case 'center':
                            newTop = newTop / 2;
                            break;
                        case 'bottom':
                            break;
                        default:
                            newTop = 0;
                    }
                    if(pos == 'fixed'){
                        $f.animate({
                                'left'  : newLeft
                        }, function(){
                            $(this).animate({
                                'top'   : newTop
                            });
                        });
                    } else {
                        $f.css({
                            'position'  : 'fixed',
                            'left'      : newLeft, 
                            'top'       : newTop
                        });
                    }
                } else {
                    var newLeft = ($w.width() - $f.outerWidth()) / 2 + $w.scrollLeft();
                    var newTop = $w.scrollTop();
                    if(pos != 'fixed'){
                        $f.animate({
                                'left'  : newLeft
                        }, function(){ 
                            $(this).animate({
                                'top'   : newTop
                            });
                        });
                    } else {
                        $f.css({
                            'position'  : 'absolute',
                            'top'       : newTop, 
                            'left'      : (newLeft > 0 ? newLeft : 0)
                        });
                    }
                }
            },
            
            enterKeyHandler : function(e){
                // get Enter key
                if(e.keyCode === 13){
                    $('#fallr-buttons').children().eq(0).focus();
                    helpers.unbindKeyHandler();
                }
            },
            
            tabKeyHandler : function(e){
                // get Tab key
                if(e.keyCode === 9){
                    $('#fallr-wrapper').find(':input, .fallr-button').eq(0).focus();
                    helpers.unbindKeyHandler();
                    e.preventDefault();
                }
            },
            
            closeKeyHandler : function(e){
                // get ESC key
                if(e.keyCode === 27 && opts.closeKey){
                    methods.hide();
                }            
            },
            
            unbindKeyHandler : function(){
                $(document)
                    .unbind('keydown', helpers.enterKeyHandler)
                    .unbind('keydown', helpers.tabKeyHandler);
            }
    };

    // wait until DOM ready
    $(document).ready(function(){
        $('body').append('<div id="fallr-overlay"></div>');

        $('#fallr-overlay').bind('click', function(){
            if(opts.closeOverlay){
                methods.hide();
            } else {
                methods.blink();
            }
        });
    });
    
    $(window).resize(function(){
        if(methods.isActive() && opts.bound === window){
            helpers.fixPos();
        }
    });
        
    // pollute jQuery global namespace
    $.fallr = function(method, options, callback){
        
        // set scope to window
        var self = window;
        
        if(typeof method === 'object'){
            options = method;
            method = 'show';
        }
        if(methods[method]){
            if(typeof options === 'function'){
                callback = options;
                options = null;
            }
            methods[method](options, callback, self);
        } else {
            $.error( 'Method "' +  method + '" does not exist in $.fallr');
        }
    };

}(jQuery));
