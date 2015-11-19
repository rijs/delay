'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = delay;

var _client = require('utilise/client');

var _client2 = _interopRequireDefault(_client);

var _attr = require('utilise/attr');

var _attr2 = _interopRequireDefault(_attr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -------------------------------------------
// API: Delays the rendering of a component [delay=ms]
// -------------------------------------------
function delay(ripple) {
  if (!_client2.default) return ripple;
  log('creating');

  var render = ripple.render;

  ripple.render = function (el) {
    var delay = (0, _attr2.default)('delay')(el);
    return delay != null ? (el.setAttribute('inert', ''), el.removeAttribute('delay'), setTimeout(el.removeAttribute.bind(el, 'inert'), +delay)) : render(el);
  };

  return ripple;
}

var log = require('utilise/log')('[ri/delay]'),
    err = require('utilise/err')('[ri/delay]');