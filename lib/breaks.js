(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'jquery', 'string2mediaquery', 'lodash.remove'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('jquery'), require('string2mediaquery'), require('lodash.remove'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.jQuery, global.string2mediaquery, global.remove);
    global.breaks = mod.exports;
  }
})(this, function (exports, module, _jquery, _string2mediaquery, _lodashRemove) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _jQuery = _interopRequireDefault(_jquery);

  var _string2mediaquery2 = _interopRequireDefault(_string2mediaquery);

  var _remove = _interopRequireDefault(_lodashRemove);

  var $WINDOW = _jQuery['default'](window);
  var $TARGET = _jQuery['default']('head');

  var DIRECTION = { EXIT: 0, ENTER: 1 };

  var breaks = {};
  var callbacks = [];

  breaks.get = function (breakpoint_name) {
    if (breaks.data.hasOwnProperty(breakpoint_name)) {
      return breaks.data[breakpoint_name];
    }
    return false;
  };

  // ex: breaks.is('>=mobile <960px')
  breaks.is = function (query) {
    return window.matchMedia(_string2mediaquery2['default'](query, breaks.data)).matches;
  };

  breaks.enter = function (query, cb) {
    callbacks.push({ query: query, cb: cb, direction: DIRECTION.ENTER, active: false });
    return breaks;
  };

  breaks.exit = function (query, cb) {
    callbacks.push({ query: query, cb: cb, direction: DIRECTION.EXIT, active: false });
    return breaks;
  };

  breaks.on = function (query, enter_callback) {
    var exit_callback = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    breaks.enter(query, enter_callback);
    if (exit_callback !== false) {
      breaks.exit(query, exit_callback);
    }
    return breaks;
  };

  breaks.remove = function (cb) {
    callbacks = _remove['default'](callbacks, function (obj) {
      return obj.callback === cb;
    });
    return breaks;
  };

  var onResize = function onResize() {
    var WIDTH = $WINDOW.width();
    callbacks.forEach(function (element) {
      var matches = breaks.is(element.query);
      if (matches && !element.active && element.direction == DIRECTION.ENTER || !matches && element.active && element.direction == DIRECTION.EXIT) {
        element.cb(WIDTH);
      }
      element.active = matches;
    });
  };

  breaks.getData = function ($target) {
    if (!$target || !$target.length || !($target instanceof _jQuery['default'])) {
      return false;
    }

    var font_family = $target.css('font-family');
    font_family = font_family.replace(/^['"]+|\\|(;\s?)+|['"]$/g, '');

    try {
      return _jQuery['default'].parseJSON(font_family);
    } catch (e) {}
    return false;
  };

  breaks.resize = onResize;
  breaks.data = breaks.getData($TARGET);
  $WINDOW.on('resize.breaks orientationchange.breaks', onResize);

  module.exports = breaks;
});
