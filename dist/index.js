"use strict";

/* istanbul ignore next */
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// -------------------------------------------
// API: Delays the rendering of a component [delay=ms]
// -------------------------------------------
module.exports = delay;

function delay(ripple) {
  if (!client) {
    return ripple;
  }log("creating");

  var render = ripple.render;

  ripple.render = function (el) {
    var delay = attr(el, "delay");
    return delay != null ? (el.setAttribute("inert", ""), el.removeAttribute("delay"), setTimeout(el.removeAttribute.bind(el, "inert"), +delay)) : render.apply(this, arguments);
  };

  return ripple;
}

var client = _interopRequire(require("utilise/client"));

var attr = _interopRequire(require("utilise/attr"));

var log = _interopRequire(require("utilise/log"));

var err = _interopRequire(require("utilise/err"));

log = log("[ri/delay]");
err = err("[ri/delay]");