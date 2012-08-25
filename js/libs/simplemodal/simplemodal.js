define(function () {
	/*
---
description: SIMPLE MODAL is a small plugin to create modal windows. It can be used to generate alert or confirm messages with few lines of code. Confirm configuration involves the use of callbacks to be applied to affirmative action;i t can work in asynchronous mode and retrieve content from external pages or getting the inline content. SIMPLE MODAL is not a lightbox although the possibility to hide parts of its layout may partially make it similar.

license: MIT-style

authors:
- Marco Dell'Anna

requires:
- core/1.3: '*'

provides:
- SimpleModal
...

* Mootools Simple Modal
* Version 1.0
* Copyright (c) 2011 Marco Dell'Anna - http://www.plasm.it
*
* Requires:
* MooTools http://mootools.net
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*
* Log:
* 1.0 - Inizio implementazione release stabile [Tested on: ie7/ie8/ie9/Chrome/Firefox7/Safari]
*/
/*
---
MooTools: the javascript framework

web build:
 - http://mootools.net/core/653562957b1fc1cd3a994ffa5f31c888

packager build:
 - packager build Core/Core

...
*/

/*
---

name: Core

description: The heart of MooTools.

license: MIT-style license.

copyright: Copyright (c) 2006-2012 [Valerio Proietti](http://mad4milk.net/).

authors: The MooTools production team (http://mootools.net/developers/)

inspiration:
  - Class implementation inspired by [Base.js](http://dean.edwards.name/weblog/2006/03/base/) Copyright (c) 2006 Dean Edwards, [GNU Lesser General Public License](http://opensource.org/licenses/lgpl-license.php)
  - Some functionality inspired by [Prototype.js](http://prototypejs.org) Copyright (c) 2005-2007 Sam Stephenson, [MIT License](http://opensource.org/licenses/mit-license.php)

provides: [Core, MooTools, Type, typeOf, instanceOf, Native]

...
*/

(function(){

this.MooTools = {
	version: '1.4.5',
	build: 'ab8ea8824dc3b24b6666867a2c4ed58ebb762cf0'
};

// typeOf, instanceOf

var typeOf = this.typeOf = function(item){
	if (item == null) return 'null';
	if (item.$family != null) return item.$family();

	if (item.nodeName){
		if (item.nodeType == 1) return 'element';
		if (item.nodeType == 3) return (/\S/).test(item.nodeValue) ? 'textnode' : 'whitespace';
	} else if (typeof item.length == 'number'){
		if (item.callee) return 'arguments';
		if ('item' in item) return 'collection';
	}

	return typeof item;
};

var instanceOf = this.instanceOf = function(item, object){
	if (item == null) return false;
	var constructor = item.$constructor || item.constructor;
	while (constructor){
		if (constructor === object) return true;
		constructor = constructor.parent;
	}
	/*<ltIE8>*/
	if (!item.hasOwnProperty) return false;
	/*</ltIE8>*/
	return item instanceof object;
};

// Function overloading

var Function = this.Function;

var enumerables = true;
for (var i in {toString: 1}) enumerables = null;
if (enumerables) enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];

Function.prototype.overloadSetter = function(usePlural){
	var self = this;
	return function(a, b){
		if (a == null) return this;
		if (usePlural || typeof a != 'string'){
			for (var k in a) self.call(this, k, a[k]);
			if (enumerables) for (var i = enumerables.length; i--;){
				k = enumerables[i];
				if (a.hasOwnProperty(k)) self.call(this, k, a[k]);
			}
		} else {
			self.call(this, a, b);
		}
		return this;
	};
};

Function.prototype.overloadGetter = function(usePlural){
	var self = this;
	return function(a){
		var args, result;
		if (typeof a != 'string') args = a;
		else if (arguments.length > 1) args = arguments;
		else if (usePlural) args = [a];
		if (args){
			result = {};
			for (var i = 0; i < args.length; i++) result[args[i]] = self.call(this, args[i]);
		} else {
			result = self.call(this, a);
		}
		return result;
	};
};

Function.prototype.extend = function(key, value){
	this[key] = value;
}.overloadSetter();

Function.prototype.implement = function(key, value){
	this.prototype[key] = value;
}.overloadSetter();

// From

var slice = Array.prototype.slice;

Function.from = function(item){
	return (typeOf(item) == 'function') ? item : function(){
		return item;
	};
};

Array.from = function(item){
	if (item == null) return [];
	return (Type.isEnumerable(item) && typeof item != 'string') ? (typeOf(item) == 'array') ? item : slice.call(item) : [item];
};

Number.from = function(item){
	var number = parseFloat(item);
	return isFinite(number) ? number : null;
};

String.from = function(item){
	return item + '';
};

// hide, protect

Function.implement({

	hide: function(){
		this.$hidden = true;
		return this;
	},

	protect: function(){
		this.$protected = true;
		return this;
	}

});

// Type

var Type = this.Type = function(name, object){
	if (name){
		var lower = name.toLowerCase();
		var typeCheck = function(item){
			return (typeOf(item) == lower);
		};

		Type['is' + name] = typeCheck;
		if (object != null){
			object.prototype.$family = (function(){
				return lower;
			}).hide();
			
		}
	}

	if (object == null) return null;

	object.extend(this);
	object.$constructor = Type;
	object.prototype.$constructor = object;

	return object;
};

var toString = Object.prototype.toString;

Type.isEnumerable = function(item){
	return (item != null && typeof item.length == 'number' && toString.call(item) != '[object Function]' );
};

var hooks = {};

var hooksOf = function(object){
	var type = typeOf(object.prototype);
	return hooks[type] || (hooks[type] = []);
};

var implement = function(name, method){
	if (method && method.$hidden) return;

	var hooks = hooksOf(this);

	for (var i = 0; i < hooks.length; i++){
		var hook = hooks[i];
		if (typeOf(hook) == 'type') implement.call(hook, name, method);
		else hook.call(this, name, method);
	}

	var previous = this.prototype[name];
	if (previous == null || !previous.$protected) this.prototype[name] = method;

	if (this[name] == null && typeOf(method) == 'function') extend.call(this, name, function(item){
		return method.apply(item, slice.call(arguments, 1));
	});
};

var extend = function(name, method){
	if (method && method.$hidden) return;
	var previous = this[name];
	if (previous == null || !previous.$protected) this[name] = method;
};

Type.implement({

	implement: implement.overloadSetter(),

	extend: extend.overloadSetter(),

	alias: function(name, existing){
		implement.call(this, name, this.prototype[existing]);
	}.overloadSetter(),

	mirror: function(hook){
		hooksOf(this).push(hook);
		return this;
	}

});

new Type('Type', Type);

// Default Types

var force = function(name, object, methods){
	var isType = (object != Object),
		prototype = object.prototype;

	if (isType) object = new Type(name, object);

	for (var i = 0, l = methods.length; i < l; i++){
		var key = methods[i],
			generic = object[key],
			proto = prototype[key];

		if (generic) generic.protect();
		if (isType && proto) object.implement(key, proto.protect());
	}

	if (isType){
		var methodsEnumerable = prototype.propertyIsEnumerable(methods[0]);
		object.forEachMethod = function(fn){
			if (!methodsEnumerable) for (var i = 0, l = methods.length; i < l; i++){
				fn.call(prototype, prototype[methods[i]], methods[i]);
			}
			for (var key in prototype) fn.call(prototype, prototype[key], key)
		};
	}

	return force;
};

force('String', String, [
	'charAt', 'charCodeAt', 'concat', 'indexOf', 'lastIndexOf', 'match', 'quote', 'replace', 'search',
	'slice', 'split', 'substr', 'substring', 'trim', 'toLowerCase', 'toUpperCase'
])('Array', Array, [
	'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'concat', 'join', 'slice',
	'indexOf', 'lastIndexOf', 'filter', 'forEach', 'every', 'map', 'some', 'reduce', 'reduceRight'
])('Number', Number, [
	'toExponential', 'toFixed', 'toLocaleString', 'toPrecision'
])('Function', Function, [
	'apply', 'call', 'bind'
])('RegExp', RegExp, [
	'exec', 'test'
])('Object', Object, [
	'create', 'defineProperty', 'defineProperties', 'keys',
	'getPrototypeOf', 'getOwnPropertyDescriptor', 'getOwnPropertyNames',
	'preventExtensions', 'isExtensible', 'seal', 'isSealed', 'freeze', 'isFrozen'
])('Date', Date, ['now']);

Object.extend = extend.overloadSetter();

Date.extend('now', function(){
	return +(new Date);
});

new Type('Boolean', Boolean);

// fixes NaN returning as Number

Number.prototype.$family = function(){
	return isFinite(this) ? 'number' : 'null';
}.hide();

// Number.random

Number.extend('random', function(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
});

// forEach, each

var hasOwnProperty = Object.prototype.hasOwnProperty;
Object.extend('forEach', function(object, fn, bind){
	for (var key in object){
		if (hasOwnProperty.call(object, key)) fn.call(bind, object[key], key, object);
	}
});

Object.each = Object.forEach;

Array.implement({

	forEach: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++){
			if (i in this) fn.call(bind, this[i], i, this);
		}
	},

	each: function(fn, bind){
		Array.forEach(this, fn, bind);
		return this;
	}

});

// Array & Object cloning, Object merging and appending

var cloneOf = function(item){
	switch (typeOf(item)){
		case 'array': return item.clone();
		case 'object': return Object.clone(item);
		default: return item;
	}
};

Array.implement('clone', function(){
	var i = this.length, clone = new Array(i);
	while (i--) clone[i] = cloneOf(this[i]);
	return clone;
});

var mergeOne = function(source, key, current){
	switch (typeOf(current)){
		case 'object':
			if (typeOf(source[key]) == 'object') Object.merge(source[key], current);
			else source[key] = Object.clone(current);
		break;
		case 'array': source[key] = current.clone(); break;
		default: source[key] = current;
	}
	return source;
};

Object.extend({

	merge: function(source, k, v){
		if (typeOf(k) == 'string') return mergeOne(source, k, v);
		for (var i = 1, l = arguments.length; i < l; i++){
			var object = arguments[i];
			for (var key in object) mergeOne(source, key, object[key]);
		}
		return source;
	},

	clone: function(object){
		var clone = {};
		for (var key in object) clone[key] = cloneOf(object[key]);
		return clone;
	},

	append: function(original){
		for (var i = 1, l = arguments.length; i < l; i++){
			var extended = arguments[i] || {};
			for (var key in extended) original[key] = extended[key];
		}
		return original;
	}

});

// Object-less types

['Object', 'WhiteSpace', 'TextNode', 'Collection', 'Arguments'].each(function(name){
	new Type(name);
});

// Unique ID

var UID = Date.now();

String.extend('uniqueID', function(){
	return (UID++).toString(36);
});



})();


var SimpleModal = new Class({
    // Implements
    Implements: [Options],
    request:null,
    buttons:[],
    // Options
    options: {
        onAppend:      Function, // callback inject in DOM
        offsetTop:     40,
        overlayOpacity:.3,
        overlayColor:  "#000000",
        width:         400,
        draggable:     true,
        keyEsc:        true,
        overlayClick:  true,
        closeButton:   true, // X close button
        hideHeader:    false, 
        hideFooter:    false,
        lightboxExcessWidth:40,  // Only for Modal Image (excess pixels created from skin)
        lightboxExcessHeight:120, // Only for Modal Image (excess pixels created from skin)
        btn_ok:        "OK", // Label
        btn_cancel:    "Cancel", // Label
        template:"<div class=\"simple-modal-header\"> \
            <h1>{_TITLE_}</h1> \
          </div> \
          <div class=\"simple-modal-body\"> \
            <div class=\"contents\">{_CONTENTS_}</div> \
          </div> \
          <div class=\"simple-modal-footer\"></div>"
    },

    /**
     * Initialization
     */
    initialize: function(options) {
        //set options
        this.setOptions(options);
    },
    
    /**
    * public method show
    * Open Modal
    * @options: param to rewrite
    * @return node HTML
    */
    show: function(options){
      if(!options) options = {};
      // Inserisce Overlay
      this._overlay("show");
      // Switch different modal
      switch( options.model ){
        // Require title && contents && callback
        case "confirm":
          // Add button confirm
          this.addButton(this.options.btn_ok, "btn primary btn-margin", function(){
              try{ options.callback() } catch(err){};
              this.hide();
          })
          // Add button cancel
          this.addButton(this.options.btn_cancel, "btn secondary");
					// Rendering
					var node = this._drawWindow(options);
					// Add Esc Behaviour
					this._addEscBehaviour();
        break;
        // Require title && contents (define the action buttons externally)
        case "modal":
					// Rendering
					var node = this._drawWindow(options);
					// Add Esc Behaviour
					this._addEscBehaviour();
        break;
        // Require title && url contents (define the action buttons externally)
        case "modal-ajax":
					// Rendering
					var node = this._drawWindow(options);
          this._loadContents({
            "url":options.param.url || "",
            "onRequestComplete":options.param.onRequestComplete||Function
          })
        break;
        // Require title && contents
        default:
					// Alert
          // Add button
          this.addButton(this.options.btn_ok, "btn primary");
					// Rendering
					var node = this._drawWindow(options);
					// Add Esc Behaviour
					this._addEscBehaviour();
        break;
      }
			   
      // Custom size Modal
      node.setStyles({width:this.options.width});
      
      // Hide Header &&/|| Footer
      if( this.options.hideHeader ) node.addClass("hide-header");
      if( this.options.hideFooter ) node.addClass("hide-footer");

      // Add Button X
      if( this.options.closeButton ) this._addCloseButton();
      
      // Enabled Drag Window
      if( this.options.draggable ){
        var headDrag = node.getElement(".simple-modal-header");
          new Drag(node, { handle:headDrag });
          // Set handle cursor
          headDrag.setStyle("cursor", "move")
          node.addClass("draggable");
      }
      // Resize Stage
      this._display();
    },
    
    /**
    * public method hide
    * Close model window
    * return
    */
    hide: function(){
			try{
				if( typeof(this.request) == "object" )  this.request.cancel();
			}catch(err){}
		 this._overlay('hide');
     return;
    },
    
    /**
    * private method _drawWindow
    * Rendering window
    * return node SM
    */
		_drawWindow:function(options){
			// Add Node in DOM
      var node = new Element("div#simple-modal", {"class":"simple-modal"});
          node.inject( $$("body")[0] );
			// Set Contents
			var html = this._template(this.options.template, {"_TITLE_":options.title || "Untitled", "_CONTENTS_":options.contents || ""});
		      node.set("html", html);
					// Add all buttons
		      this._injectAllButtons();
		      // Callback append
		      this.options.onAppend();
			return node;
		},

    /**
    * public method addButton
    * Add button to Modal button array
    * require @label:string, @classe:string, @clickEvent:event
    * @return node HTML
    */
     addButton: function(label, classe, clickEvent){
         var bt = new Element('a',{
                                     "title" : label,
                                     "text"  : label,
                                     "class" : classe,
                                     "events": {
                                         click: (clickEvent || this.hide).bind(this)
                                     }
                               });
         this.buttons.push(bt);
 		     return bt;
     },
     
    /**
    * private method _injectAllButtons
    * Inject all buttons in simple-modal-footer
    * @return
    */
    _injectAllButtons: function(){
      this.buttons.each( function(e, i){
        e.inject( $("simple-modal").getElement(".simple-modal-footer") );
      });
		return;
    },

    /**
    * private method _addCloseButton
    * Inject Close botton (X button)
    * @return node HTML
    */
    _addCloseButton: function(){
      var b = new Element("a", {"class":"close", "href":"#", "html":"x"});
          b.inject($("simple-modal"), "top");
          // Aggiunge bottome X Close
          b.addEvent("click", function(e){
            if(e) e.stop();
            this.hide();
          }.bind( this ))
      return b;
    },

    /**
    * private method _overlay
    * Create/Destroy overlay and Modal
    * @return
    */
    _overlay: function(status) {
       switch( status ) {
           case 'show':
               this._overlay('hide');
               var overlay = new Element("div", {"id":"simple-modal-overlay"});
                   overlay.inject( $$("body")[0] );
                   overlay.setStyle("background-color", this.options.overlayColor);
                   overlay.fade("hide").fade(this.options.overlayOpacity);
                // Behaviour
                if( this.options.overlayClick){
                  overlay.addEvent("click", function(e){
                    if(e) e.stop();
                    this.hide();
                  }.bind(this))
                }
               // Add Control Resize
               this.__resize = this._display.bind(this);
               window.addEvent("resize", this.__resize );
           break;
           case 'hide':
               // Remove Event Resize
               window.removeEvent("resize", this._display);
               // Remove Event Resize
               if(this.options.keyEsc){
                 var fixEV = Browser.name != 'ie' ? "keydown" : "onkeydown";
                 window.removeEvent(fixEV, this._removeSM);
               }
               
               // Remove Overlay
               try{
                 $('simple-modal-overlay').destroy();
               }
               catch(err){}
               // Remove Modal
               try{
                 $('simple-modal').destroy();
               }
               catch(err){}
           break;
       }
       return;
    },

    /**
    * private method _loadContents
    * Async request for modal ajax
    * @return
    */
    _loadContents: function(param){
			// Set Loading
			$('simple-modal').addClass("loading");
			// Match image file
			var re = new RegExp( /([^\/\\]+)\.(jpg|png|gif)$/i );
			if( param.url.match(re) ){
				// Hide Header/Footer
	      $('simple-modal').addClass("hide-footer");
				// Remove All Event on Overlay
				$("simple-modal-overlay").removeEvents(); // Prevent Abort
				// Immagine
				var images = [param.url];
				new Asset.images(images, {
							onProgress: function(i) {
								immagine = this;
							},
							onComplete: function() {
								try{
									// Remove loading
									$('simple-modal').removeClass("loading");
									// Imposta dimensioni
									var content = $('simple-modal').getElement(".contents");
									var padding = content.getStyle("padding").split(" ");
									var width   = (immagine.get("width").toInt()) + (padding[1].toInt()+padding[3].toInt())
									var height  = immagine.get("height").toInt();
									// Porportional scale
                  var ns = this._scaleImage(width, height);
                  width   = ns.width					
									height  = ns.height
									
									// Width
									var myFx1 = new Fx.Tween($("simple-modal"), {
									    duration: 'normal',
									    transition: 'sine:out',
									    link: 'cancel',
									    property: 'width'
									}).start($("simple-modal").getCoordinates().width, width);
									// Height
									var myFx2 = new Fx.Tween(content, {
									    duration: 'normal',
									    transition: 'sine:out',
									    link: 'cancel',
									    property: 'height'
									}).start(content.getCoordinates().height, height).chain(function(){
										// Inject
										immagine.inject( $('simple-modal').getElement(".contents").empty() ).fade("hide").setStyles({"width":width, "height":height}).fade("in");
		                this._display();
		                // Add Esc Behaviour
  									this._addEscBehaviour();
									}.bind(this));
									// Left
									var myFx3 = new Fx.Tween($("simple-modal"), {
									    duration: 'normal',
									    transition: 'sine:out',
									    link: 'cancel',
									    property: 'left'
									}).start($("simple-modal").getCoordinates().left, (window.getCoordinates().width - width)/2);
								}catch(err){}
							}.bind(this)
						});
						
			}else{
				// Request HTML
	      this.request = new Request.HTML({
	          evalScripts:false,
	          url: param.url,
	          method: 'get',
	          onRequest: function(){
	          },
	          onSuccess: function(responseTree, responseElements, responseHTML, responseJavaScript){
	            $('simple-modal').removeClass("loading");
	            $('simple-modal').getElement(".contents").set("html", responseHTML);
	            param.onRequestComplete();
	            // Execute script page loaded
	            eval(responseJavaScript)
	            // Resize
	            this._display();
	            // Add Esc Behaviour
							this._addEscBehaviour();
	          }.bind(this),
	          onFailure: function(){
	            $('simple-modal').removeClass("loading");
	            $('simple-modal').getElement(".contents").set("html", "loading failed")
	          }
	      }).send();
			}
    },
    
    /**
    * private method _scaleImage
    * Calculate scale image proportional
    * @return {width, height}
    */
    _scaleImage: function(w, h){
      var removeH = this.options.lightboxExcessHeight + this.options.offsetTop;
      var removeW = this.options.lightboxExcessWidth;
      var width  = w ;
      var height = h ;
      var newWidth  = window.getSize().x - removeW;
      var newHeight = window.getSize().y - removeH;
      ratio = (width <= height) ? height / newHeight : width / newWidth;
			// Ratio
			ratio      = Math.max(ratio, 1.0);
			// New sizes
			w = parseInt(width / ratio);
			h = parseInt(height / ratio);
			return {"width":w, "height":h}
    },
    
    /**
    * private method _display
    * Move interface
    * @return
    */
     _display: function(){
      // Update overlay
      try{
        $("simple-modal-overlay").setStyles({
          height: window.getCoordinates().height //$$("body")[0].getScrollSize().y
        });
      } catch(err){}
         
      // Update position popup
      try{
        var offsetTop = this.options.offsetTop || 0; //this.options.offsetTop != null ? this.options.offsetTop : window.getScroll().y;
        $("simple-modal").setStyles({
          top: offsetTop,
          left: ((window.getCoordinates().width - $("simple-modal").getCoordinates().width)/2 )
        });
      } catch(err){}
 		  return;
     },
     
     /**
     * private method _addEscBehaviour
     * add Event ESC
     * @return
     */
     _addEscBehaviour: function(){
       if(this.options.keyEsc){
         this._removeSM = function(e){
           if( e.key == "esc" ) this.hide();
         }.bind(this)
          // Remove Event Resize
         if(this.options.keyEsc){
           var fixEV = Browser.name != 'ie' ? "keydown" : "onkeydown";
           window.addEvent(fixEV, this._removeSM );
         }
  		  }
     },
      
    /**
    * private method _template
    * simple template by Thomas Fuchs
    * @return
    */
    _template:function(s,d){
     for(var p in d)
       s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
     return s;
    }
});
	return SimpleModal;
})