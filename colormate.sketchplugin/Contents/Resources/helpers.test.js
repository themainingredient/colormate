/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/app/helpers.test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/app/helpers.js":
/*!**********************************!*\
  !*** ./resources/app/helpers.js ***!
  \**********************************/
/*! exports provided: calcOpacityPercentage, calculateLuminance, calculateCombinedLuminance, calculateContrast, closeWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcOpacityPercentage", function() { return calcOpacityPercentage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateLuminance", function() { return calculateLuminance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateCombinedLuminance", function() { return calculateCombinedLuminance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateContrast", function() { return calculateContrast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeWindow", function() { return closeWindow; });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./resources/app/helpers.js");
 // eslint-disable-line import/no-self-import

var calcOpacityPercentage = function calcOpacityPercentage(hexColor) {
  var hexOpacity = hexColor.substr(-2);
  return Math.round(parseInt(hexOpacity, 16) / 2.55);
};
var calculateLuminance = function calculateLuminance(color) {
  // Rebasing the incoming hex color to a value between 0 and 1, 0 being 0% intensity, and 1 being 100% intensity
  var rebasedColor = parseInt(color, 16) / 255;
  /**
   * There are 2 different ways to calculate the Luminance of a color, depending on the input value.
   * When the color intensity is lower than 3.928%, meaning black or really dark grey, we use the first method.
   * When the color intensity is higher we use the second method.
   */

  if (rebasedColor <= 0.03928) {
    return rebasedColor / 12.92;
  }

  return Math.pow((rebasedColor + 0.055) / 1.055, 2.4); // eslint-disable-line no-restricted-properties
};
var calculateCombinedLuminance = function calculateCombinedLuminance(hexColor) {
  var cleanedColor = hexColor.substr(1); // Remove the # of the incoming hex color

  var R = cleanedColor.substr(0, 2); // Grab the first and second chars in the color, representing the red value

  var G = cleanedColor.substr(2, 2); // Grab the third and fourth chars in the color, representing the green value

  var B = cleanedColor.substr(4, 2); // Grab the fifth and sixth chars in the color, representing the blue value

  /**
   * Here we calculate the Luminance of a color in the RGB space
   * The numbers that we use to multiply the calculateLuminance of R, G, and B is how much the light contributes
   * to the intensity perceived by humans. Green light contributes the most, and blue the least.
   *
   * More info here: https://en.wikipedia.org/wiki/Relative_luminance
   */

  return 0.2126 * _helpers__WEBPACK_IMPORTED_MODULE_0__["calculateLuminance"](R) + 0.7152 * _helpers__WEBPACK_IMPORTED_MODULE_0__["calculateLuminance"](G) + 0.0722 * _helpers__WEBPACK_IMPORTED_MODULE_0__["calculateLuminance"](B);
};
var calculateContrast = function calculateContrast(color) {
  var colorLuminance = calculateCombinedLuminance(color);
  /**
   * The luminance of a color is represented by a color between 0 and 1.
   * Black has a luminosity of 0, meaning it reflects none of the light.
   * White has a luminosity of 1, meaning it reflects all the light the falls on it.
   */

  var whiteLuminance = 1;
  if (colorLuminance === whiteLuminance) return 0;
  return Number(((whiteLuminance + 0.05) / (colorLuminance + 0.05)).toFixed(2));
};
var closeWindow = function closeWindow() {
  window.postMessage('closeWindow');
};

/***/ }),

/***/ "./resources/app/helpers.test.js":
/*!***************************************!*\
  !*** ./resources/app/helpers.test.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./resources/app/helpers.js");

describe('React | Helpers', function () {
  describe('calcOpacityPercentage', function () {
    test('it returns the opacity percentage of a given hex color', function () {
      var color1 = '#ffffffff';
      var color2 = '#C2C2C2C2';
      expect(_helpers__WEBPACK_IMPORTED_MODULE_0__["calcOpacityPercentage"](color1)).toEqual(100);
      expect(_helpers__WEBPACK_IMPORTED_MODULE_0__["calcOpacityPercentage"](color2)).toEqual(76);
    });
  });
  describe('calculateCombinedLuminance', function () {
    test('it transforms a hex color to a relative luminance value', function () {
      var originalImplementation = _helpers__WEBPACK_IMPORTED_MODULE_0__["calculateLuminance"];
      _helpers__WEBPACK_IMPORTED_MODULE_0__["calculateLuminance"] = jest.fn().mockReturnValueOnce(0.730).mockReturnValueOnce(0.056).mockReturnValueOnce(0.246);
      expect(Number(_helpers__WEBPACK_IMPORTED_MODULE_0__["calculateCombinedLuminance"]('RANDOMVALUE').toFixed(4))).toEqual(0.213);
      _helpers__WEBPACK_IMPORTED_MODULE_0__["calculateLuminance"] = originalImplementation;
    });
  });
  describe('calculateLuminance', function () {
    test('it calculates the luminance of a single Hex', function () {
      expect(Number(_helpers__WEBPACK_IMPORTED_MODULE_0__["calculateLuminance"]('FF').toFixed(4))).toEqual(1);
      expect(Number(_helpers__WEBPACK_IMPORTED_MODULE_0__["calculateLuminance"]('AA').toFixed(4))).toEqual(0.4020);
      expect(Number(_helpers__WEBPACK_IMPORTED_MODULE_0__["calculateLuminance"]('11').toFixed(4))).toEqual(0.0056);
      expect(Number(_helpers__WEBPACK_IMPORTED_MODULE_0__["calculateLuminance"]('00').toFixed(4))).toEqual(0);
    });
  });
  describe('calculateContrast', function () {
    test('it returns the luminance of a color', function () {
      var color1 = '#EEEEEEFF';
      var color2 = '#DE438FFF';
      expect(_helpers__WEBPACK_IMPORTED_MODULE_0__["calculateContrast"](color1)).toEqual(1.16);
      expect(_helpers__WEBPACK_IMPORTED_MODULE_0__["calculateContrast"](color2)).toEqual(3.96);
    });
  });
  describe('closeWindow', function () {
    var spy;
    test('it posts a closeWindow message', function () {
      spy = jest.spyOn(window, 'postMessage').mockImplementation(function () {});
      _helpers__WEBPACK_IMPORTED_MODULE_0__["closeWindow"]();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('closeWindow');
    });
    afterEach(function () {
      spy.mockRestore();
    });
  });
});

/***/ })

/******/ });
//# sourceMappingURL=helpers.test.js.map