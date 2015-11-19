// -------------------------------------------
// API: Delays the rendering of a component [delay=ms]
// -------------------------------------------
export default function delay(ripple){
  if (!client) return ripple;
  log('creating')
  
  var render = ripple.render

  ripple.render = function(el){
    var delay = attr('delay')(el)
    return delay != null
         ? ( el.setAttribute('inert', '')
           , el.removeAttribute('delay')
           , setTimeout(el.removeAttribute.bind(el, 'inert'), +delay))
         : render(el)
  }

  return ripple
}

import client from 'utilise/client'
import attr from 'utilise/attr'
var log = require('utilise/log')('[ri/delay]')
  , err = require('utilise/err')('[ri/delay]')