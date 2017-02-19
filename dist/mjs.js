/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = "<div id=\"mjs-wrapper\">\n    <div id=\"mjs-button\" class=\"mjs-button\">\n        <div id=\"mjs-icon-close\" class=\"mjs-icon\"></div>\n        <div id=\"mjs-icon-open\" class=\"mjs-icon\"></div>\n    </div>\n    <div id=\"mjs-toolbar\">\n        <div id=\"mjs-toolbar-input\" class=\"input-wrap\">\n            <input id=\"bin-id\" type=\"text\" placeholder=\"binId\">\n        </div>\n        <div id=\"mjs-apply\" class=\"mjs-toolbar-item mjs-button\">\n            <div id=\"mjs-icon-apply\" class=\"mjs-icon\"></div>\n        </div>\n        <div id=\"mjs-toolbar-help\" data-toggled-by=\"#mjs-help\" class=\"mjs-toolbar-item mjs-toolbar-item-extension input-wrap\">\n            <input type=\"text\" value=\"Copy and share with a friend, or paste a friend's bin, or delete to reset\" readonly placeholder=\"binId\">\n        </div>\n        <div id=\"mjs-help\" class=\"mjs-toolbar-item mjs-button\">\n            <div id=\"mjs-icon-help\" class=\"mjs-icon\"></div>\n        </div>\n    </div>\n</div>";

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./myjson-save.css", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./myjson-save.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, "#mjs-wrapper {\n    position:fixed;\n    bottom: 0;\n    right: 0;\n    margin: 35px;\n}\n\n\n/* buttons */\n\n#mjs-button {\n    background-color: #2e968c;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n    \n    transform: rotate(45deg);\n    transition-duration: 0.3s;\n    transition-delay: 0.2s; /* toolbar hide delay */\n}\n\n#mjs-button {\n    width: 50px;\n    height: 50px;\n}\n\n.mjs-button {\n    cursor: pointer;\n    background: none;\n    border: none;\n    position: relative;\n}\n\n#mjs-button:hover {\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n}\n\n/*rotate on active*/\n#mjs-wrapper.mjs-active #mjs-button {\n    transform: rotate(0deg);\n    transition-delay: 0s;\n}\n\n.mjs-icon {\n    border: none;\n    background: none;\n    transition-duration: 0.3s!important;\n    background-repeat: no-repeat;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    display: block;\n    transition: opacity .08s linear,-webkit-transform .16s linear;\n    transition: transform .16s linear,opacity .08s linear;\n    transition: transform .16s linear,opacity .08s linear,-webkit-transform .16s linear;\n    overflow: hidden;\n}\n\n@keyframes spin {\n    0% {\n        transform: rotate(0deg) scale(1);\n    }\n    50% {\n        transform: scale(0.5)\n    }\n    100% {\n        transform: rotate(90deg) scale(1);\n    }\n}\n\n.mjs-icon.mjs-loading {\n    pointer-events: none;\n    width: 40%;\n    height: 40%;\n    margin: 30%;\n    background: white;\n    animation: spin 1s ease-in-out;\n    animation-iteration-count: infinite;\n}\n\n#mjs-icon-close {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOBAMAAADtZjDiAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAG1BMVEUAAAD///////////////////////////8AAADr8xjQAAAAB3RSTlMAM7cPx7jIAE21/gAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAABESURBVAjXYxAyYGBgYFZkUHcG0ialDCYlBgzM7slA7MxgUgaUNCkzdgfJMbunlIDUMpiUg7hwGiYOVQfTBzMHZi7UHgCB3RAZ7HszogAAAABJRU5ErkJggg==);\n    background-size: 14px 14px;\n    background-position: 50%;\n}\n\n#mjs-icon-open {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA/CAYAAABZ9m6wAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAO0SURBVHic7dpJiBxlGMbxtzKjgVEUV4x4UEFCQJHgggQPooMHDSiCeDAHc9GLJqAHERQU9RBQRBAFl4MXPagHRVFEFJeTIIOSROMSFCYgboMxKpOY+XmoHmfssbuWrqqvwf6fuqu73/d5nq6ub6mOGANwDnam1jE24CUcxIbUWpKDLViS83RqPUnBOnxshaO4KLWuZOAWa3k3ta4k4Hgc+I9A4LrU+joHDw4IA77G+tQaOwNn4fchgcCdqXV2Bl4oCAMWcGpqra2Dy6wMs0U8kVpvqyDDRyXDgL9wfmrdrYGbK4SxzDupdbcG3q4RCFyTWnsr4CTVfjLLfI5jUutvBczgjRqh3J5ae2Nga9/zaTxXMZBfcEoqD42BzTiCzX3HM+yqGMpjqXw0Bt7vmXlzwOs75avcMhzGxq49NAZu7DM0O+B923pmy/Ba1z4aAcfiqz4zc1g34P2z+K1kKFd37WdkcM8AMzcN+cyl+LFEIHsw3aWfkcDp+HWAmf2GLO2xCd+VCOW2Lj2NBJ4pMHNHwefPxKcFNX7AiV15qg0ulC/KisycUFCnzKx2V1e+aqP8euWBErVm8PqQGos4rwtftcD1JcOAQ0rch8EUnh1S5+UuvFVGPszuqxAIPFWydob7h9S5qm1/lcFdFcMgv9ZsqtBj0Kx24PwmCTgZP9cIhIqnvMGz2u1t+asMnqwZxjJbKvabld8LXs33CkauTpBPpI6MGMgHNfpeIh++V/NQGx6rCntrxDCW2VrcbU3v/lntnzi7BZulBV3bUBjk24SV1yfY4N+z2hfb8FpGyDR2NxgINS+M8lnth70aS7i8ab9lROxoOAyYx0xNPevxSq/OJ7ochnvfyE8tBAJ3j6BrysrCcluTnosaP95SGOT3dGtvJluZ1c7juCZ9D2q4Ufntvro80oDOHbivCc9FjYatPptiEec2oPUGnNGE70ENruwgjGWeb0hzpaE8q1B4KiLmIuKCqqJqshQRF2dZNtdRv4iIqDI03RrdhRGRa3u4w37/NC1EvndZuMPVIIsRsTsi/sBpHfaNsr+veyOiDWELEbE/IvZGxJ5Vj7/IsuxoC/0KKbyG9K72eyOi7r8CD0fEfKw1/VmWZQdr1myNMmfIo1EujIVYa3pPRHybZdlSbYUdM/QMwRUR8d6qQ4sR8U2sNb0vy7JDLWnslKJAtkd+dnwZuekDnaiaMGHChAkTJvwfyPBqahHjRAapRYwT43PHfEyYBNLHJJA+JoH0MQmkj0kgffwNs2cQ/IAAmokAAAAASUVORK5CYII=);\n\n    background-size: 25px;\n    background-position: 47% 44%;\n}\n\n#mjs-wrapper:not(.mjs-active) #mjs-button #mjs-icon-close {\n    transform: rotate(30deg) scale(0);\n}\n\n#mjs-button #mjs-icon-open {\n    transition-duration: 0.5s;\n    transform: rotate(-45deg)  scale(1);\n}\n\n#mjs-wrapper.mjs-active #mjs-button #mjs-icon-open {\n    transition-duration: 0.5s;\n    transform: rotate(-45deg) scale(0);\n}\n\n#mjs-toolbar .mjs-button {\n    background-color: #2fab9f;\n    color: white;\n}\n#mjs-toolbar .mjs-button:hover {\n    background-color: #2fab9f;\n}\n\n#mjs-toolbar #mjs-apply {\n    background-color: #2fab9f;\n}\n\n#mjs-icon-apply {\n    background-image: url(data:image/png;base64,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);\n    background-repeat: no-repeat;\n    background-size: 18px 14px;\n    background-position: center;\n}\n\n#mjs-icon-help {\n    background-color: #2fab9f;\n}\n#mjs-icon-help {\n    background-image: url(http://flaticons.net/icons/Mobile%20Application/Help.png);\n    background-repeat: no-repeat;\n    background-size: 16px 17px;\n    background-position: center;\n}\n\n/* toolbar */\n\n#mjs-toolbar {\n    height: 50px;\n    /*width: 300px;*/\n    position: fixed;\n    right: 85px;\n    bottom: 35px;\n    transform: translateX(50%) scaleX(0);\n    transition-delay: 0s;\n    transition-duration: 0.2s;\n    \n    display: flex;\n    flex-direction: row;\n    justify-content: flex-end;\n}\n\n#mjs-wrapper.mjs-active #mjs-toolbar {\n    transform: translateX(0) scaleX(1);\n    transition-delay: 0.3s; /* button rotate delay */\n    transition-duration: 0.2s;\n}\n\n.mjs-toolbar-item-extension.mjs-active {\n    flex-grow: 1;\n}\n\n#mjs-toolbar .mjs-toolbar-item.mjs-button {\n    width: 50px;\n    flex: 0 0 50px;\n}\n\n\n.input-wrap {\n    background-color: #83a17a;\n}\n\n.input-wrap input, .input-wrap label {\n    font-family: Century Gothic,CenturyGothic,AppleGothic,sans-serif;\n    font-size: 16px;\n    padding: 11px 10px 10px 10px;\n    width: calc(100% - 20px);\n    height: calc(100% - 20px);\n    margin:auto;\n    color: white;\n    border: none;\n    background: transparent;\n}\n\n.input-wrap label {\n    line-height: 50px;\n}\n\n/* toolbar extensions */\n\n\n.mjs-toolbar-item-extension {\n    flex-basis: 0px;\n    flex-grow: 0;\n    transition-duration: 0.2s;\n}\n\n.mjs-toolbar-item-extension:not(.mjs-active) input {\n    transition-delay: 0.1s;\n    padding: 10px 0px;\n}\n\n#mjs-toolbar-help {\n    background-color: #2fab9f;\n    width: 550px;\n}\n\n#mjs-toolbar-input {\n    background-color: #3c9a8d;\n}\n\n::-webkit-input-placeholder { /* Chrome/Opera/Safari */\n  color: #bad4d0;\n}\n::-moz-placeholder { /* Firefox 19+ */\n  color: #bad4d0;\n}\n:-ms-input-placeholder { /* IE 10+ */\n  color: #bad4d0;\n}\n\n/* global */\ninput {\n    outline: none;\n    text-align: center;\n}", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

(function($, window) {
    
    'use strict';
    
    var config  = {
        data: {},
        binId: null,
        authorId: null,
        options: {
            autosave: 30,       // frequency of autosaving data, in seconds
            remote: true,       // set to false to disable saving in remote myjson bin
            ui: true,           // set to false to hide ui
        },
    };

    /**
     * Initializes MJS
     * 
     * @returns {undefined}
     */
    MJS.init = function(data, userConfig) {
        $.extend(true, config.options, userConfig);
        
        config.data = data;
        
        MJS._init();
        MJS._initEvents();
        MJS._render();
        MJS._loadData();
    };
    

    /**
     * Initializes MJS
     * 
     * @returns {undefined}
     */
    MJS._init = function() {
        if (!config.options.remote) {
            config.options.ui = false;
        }
    };

    /**
     * Initializes MJS events
     * 
     * @returns {undefined}
     */
    MJS._initEvents = function() {
        $(window.document.body).one('load.mjs', function(evt) {
            MJS._autosave();
        });
    };
    
    /**
     * 
     * @returns {undefined}
     */
    MJS._autosave = function() {
        var timeout = config.options.autosave;
        if (timeout) {
            setTimeout(function() {
                MJS.save();
                MJS._autosave();
            }, timeout * 1000);
        }
    };
    
    /**
     * Stores changes.
     * 
     * @returns {undefined}
     */
    MJS.save = function() {
        MJS._persist(); // save locally
        if (config.options.remote) {
            MJS._update(); // save in remote
        }
    };
    
    
    /**
     * Initializes MJS
     * 
     * @returns {undefined}
     */
    MJS._loadData = function() {
        var configJson = window.localStorage.getItem('MJS.config');
        
        if (configJson !== null) {
            var loadedConfig = JSON.parse(configJson);
            delete loadedConfig.options;
            $.extend(true, config, loadedConfig);
        }
        
        if (config.authorId === null) {
            MJS._generateAuthorId();
        }
        
        if (config.binId === null) {
            MJS._generateBin();
        }
        else if (config.options.remote) {
            MJS._load();
        }
        else {
            $(window.document.body).trigger('ready.mjs', config.data);
        }
    };
    
    /**
     * 
     * @returns {undefined}
     */
    MJS._render = function() {
        
        if (!config.options.ui) {
            return;
        }
        
        __webpack_require__(1);
        var $mjs = $( __webpack_require__(0) );
        
        $mjs.find('#bin-id').val(config.binId);
        
        $mjs.on('click', '#mjs-button', function(evt) {
            $mjs.toggleClass('mjs-active');
            $mjs.trigger('toggle.mjs', [$mjs.hasClass('mjs-active')]);
        });
        
        $mjs.find('.mjs-toolbar-item-extension').each(function() {
            var $extension = $(this);
            
            var trigger = $(this).data('toggled-by');
            if (trigger) {
                $mjs.find(trigger).on('click', function(evt) {
                    $extension.toggleClass('mjs-active');
                });
                // close timeout?
            }
        });
        
        $mjs.on('click', '#mjs-apply', function(evt) {
            var request = MJS._updateBin($mjs.find('#bin-id').val());
            MJS._bindProgress(request, '#mjs-icon-apply');
        });
        
        var fillBinIdInput = function(event) {
            $mjs.find('#bin-id').val(config.binId);
        };
        $(window.document.body).on('toggle.mjs', fillBinIdInput);
        $(window.document.body).on('load.mjs', fillBinIdInput);
        
        $mjs.appendTo(window.document.body);
    };
    
    MJS._updateBin = function(newBinId) {
        if (newBinId === "") {
            return MJS._generateBin();
        }
        
        config.binId = newBinId;
        var request = MJS._load();
        request.done(function(result) {
            MJS._persist();
        });
        return request;
    };
    
    /**
     * Creates a new Myjson bin
     * 
     * @returns {undefined}
     */
    MJS._generateBin = function() {
        return MJS._request(null, {}, {
            type: "POST",
            success: function(result) {
                config.binId = result.uri.split('/').pop();
                MJS._persist();
                
                $(window.document.body).trigger('load.mjs', config.data);
            }
        });
    };
    
    /**
     * Creates a new Myjson bin
     * 
     * @returns {undefined}
     */
    MJS._generateBin = function() {
        return MJS._request(null, {}, {
            type: "POST",
            success: function(result) {
                config.binId = result.uri.split('/').pop();
                MJS._persist();
                
                $(window.document.body).trigger('load.mjs', config.data);
            }
        });
    };
    
    /**
     * Generates authorId string
     * 
     * @returns {undefined}
     */
    MJS._generateAuthorId = function() {
        config.authorId = MJS._randomString(3);
        MJS._persist();
    };
    
    /**
     * Creates a random string
     * 
     * @param {type} length
     * @returns {String}
     */
    MJS._randomString = function(length) {
        return Math.random().toString(36).substr(2, length);
    };
    
    /**
     * Loads data from Myjson bin
     * 
     * @returns {undefined}
     */
    MJS._load = function() {
        return MJS._request(config.binId, null, {
            type: "GET",
            success: function(data) {
                $.extend(true, config.data, data);
                $(window.document.body).trigger('load.mjs', config.data);
            }
        });
    };
    
    /**
     * Updates Myjson bin
     * @returns {jqXHR}
     */
    MJS._update = function() {
        return MJS._request(config.binId, config.data, {type: "PUT"});
    };
    
    /**
     * Myjson request wrapper
     * 
     * @param {type} path   see http://myjson.com/api
     * @param {type} data   data to save. not necessary when reading
     * @param {type} config additional config
     * @returns {jqXHR}
     */
    MJS._request = function(path, data, config) {
        var url = "https://api.myjson.com/bins" + (path ? '/' + path : '');
        var requestData = {
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        };
        var request = $.ajax($.extend(true, requestData, config));
        MJS._bindProgress(request, '#mjs-icon-apply');
        return request;
    };

    
    MJS._bindProgress = function(request, element) {
        var $element = $(element);
        $element.addClass('mjs-loading').prop('disabled', true);
        
        var minimumDuration = 100;
        var disableSpin = function() {
            $element.removeClass('mjs-loading').prop('disabled', false);
        };
        
        var start = new Date();
        request.done(function() {
            var elapsed     = new Date() - start;
            var remaining   = Math.max(0, minimumDuration - elapsed);
            setTimeout(disableSpin, remaining);
        });
    };
    
    /**
     * Stores MJS config locally
     * 
     * @returns {undefined}
     */
    MJS._persist = function() {
        window.localStorage.setItem('MJS.config', JSON.stringify(config));
    };
    
    function MJS() {}
    
    /**
     * Export
     */
    window.MJS = MJS;
    
    
})($, window);

/***/ })
/******/ ]);