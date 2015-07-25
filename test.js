var expect     = require('chai').expect
  , client     = require('client')
  , shim       = !client && polyfill()
  , components = require('rijs.components')
  , core       = require('rijs.core')
  , fn         = require('rijs.fn')
  , delay      = require('./')
  , container
  , el1, el2

describe('Delay Render', function() {

  before(function(){
    /* istanbul ignore next */
    container = !client
      ? document.body.firstElementChild
      : document.body.appendChild(document.createElement('div'))
  })

  beforeEach(function(done){
    container.innerHTML  = ''
    container.innerHTML += '<no-delay>'
    container.innerHTML += '<ye-delay delay="300">'
    el1 = container.children[0]
    el2 = container.children[1]
    setTimeout(done, 30)
  })

  after(function(){
    document.body.removeChild(container)
  })  
  
  it('should postpone rendering by specified time', function(done) {
    var ripple = delay(components(fn(core())))
    ripple('ye-delay', function(){ this.innerHTML = 'done' })
    expect(el2.innerHTML).to.eql('')
    setTimeout(function(){ expect(el2.innerHTML).to.eql('') }, 200)
    setTimeout(function(){ expect(el2.innerHTML).to.eql('done') }, 400)
    setTimeout(done, 500)
  })

  it('should not affect delay-less components', function(done) {
    var ripple = delay(components(fn(core())))
    ripple('no-delay', function(){ this.innerHTML = 'done' })
    setTimeout(function(){ expect(el1.innerHTML).to.eql('done') }, 40)
    setTimeout(done, 100)
  })

})

function polyfill(){
  window = require("jsdom").jsdom('<div>').defaultView
  global.document = window.document
  global.Element = window.Element
  global.requestAnimationFrame = function(fn){
    return setTimeout(fn, 16)
  }
}