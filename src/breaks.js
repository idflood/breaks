'use strict';

import jQuery from 'jquery';
import string2mediaquery from 'string2mediaquery';
import remove from 'lodash.remove';

const $WINDOW = jQuery(window);
const $TARGET = jQuery('head');

const DIRECTION = {EXIT: 0, ENTER: 1};

var breaks = {};
let callbacks = [];

breaks.get = function(breakpoint_name) {
  if (breaks.data.hasOwnProperty(breakpoint_name)) {
    return breaks.data[breakpoint_name];
  }
  return false;
};

// ex: breaks.is('>=mobile <960px')
breaks.is = function(query) {
  return window.matchMedia(string2mediaquery(query, breaks.data)).matches;
};

breaks.enter = function(query, cb) {
  callbacks.push({query: query, cb: cb, direction: DIRECTION.ENTER, active: false});
  return breaks;
};

breaks.exit = function(query, cb) {
  callbacks.push({query: query, cb: cb, direction: DIRECTION.EXIT, active: false});
  return breaks;
};

breaks.on = function(query, enter_callback, exit_callback = false) {
  breaks.enter(query, enter_callback);
  if (exit_callback !== false) {
    breaks.exit(query, exit_callback);
  }
  return breaks;
};

breaks.remove = function(cb) {
  callbacks = remove(callbacks, function(obj) {
    return (obj.callback === cb);
  });
  return breaks;
};

const onResize = function() {
  const WIDTH = $WINDOW.width();
  callbacks.forEach(function(element) {
    let matches = breaks.is(element.query);
    if ((matches && !element.active && element.direction == DIRECTION.ENTER) ||
       (!matches && element.active && element.direction == DIRECTION.EXIT)) {
      element.cb(WIDTH);
    }
    element.active = matches;
  });
};

breaks.getData = function($target) {
  if (!$target || !$target.length || !($target instanceof jQuery)) {
    return false;
  }

  let font_family = $target.css('font-family');
  font_family = font_family.replace(/^['"]+|\\|(;\s?)+|['"]$/g, '');

  try {
    return jQuery.parseJSON(font_family);
  }
  catch(e) {

  }
  return false;
};

breaks.resize = onResize;
breaks.data = breaks.getData($TARGET);
$WINDOW.on('resize.breaks orientationchange.breaks', onResize);

export default breaks;
