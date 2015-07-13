var expect     = require('chai').expect
  , components = require('components')
  , core       = require('core')
  , fn         = require('fn')
  , delay      = require('../')
  , container  = document.createElement('div')
  , el1, el2

describe('Delay Render', function() {
  
  before(function(){
    document.body.appendChild(container)
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