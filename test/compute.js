

var tape = require('tape')
var o = require('..')
tape('basic', function (t) {
  var x = o.value(), _x = Math.random()
  var y = o.value(), _y = Math.random()

  var r = o.compute([x, y], function (x, y) {
    if(!x || !y) return
    t.equal(x, _x)
    t.equal(y, _y)
    t.end()
    return (x + y) / 2
  })

  x(_x)
  y(_y)

  r(function (r) {
    t.equal(r, (_x + _y)/2)
  })
})

