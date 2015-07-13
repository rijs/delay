// -------------------------------------------
// API: Delays the rendering of a component [delay=ms]
// -------------------------------------------
export default function delay(ripple){
  if (!client) return ripple;
  log('creating')
  
  var render = ripple.render

  ripple.render = function(el){
    var delay = attr(el, 'delay')
    return delay != null
         ? ( el.setAttribute('inert', '')
           , el.removeAttribute('delay')
           , setTimeout(el.removeAttribute.bind(el, 'inert'), +delay))
         : render.apply(this, arguments)
  }

  return ripple
}

import client from 'utilise/client'
import attr from 'utilise/attr'
import log from 'utilise/log'
import err from 'utilise/err'
log = log('[ri/delay]')
err = err('[ri/delay]')