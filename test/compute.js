

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

tape('computed observable', function (t) {
  var v1 = o()
  var v2 = o()

  v1("one")
  v2("two")
  var v3 = o.compute([v1, v2], function (v1, v2) {
      return v1 + v2
  })
  var values = []

  v3(function onchange(value) {
      values.push(value)
  })

  t.equal(v3(), "onetwo")

  v1("three")

  t.equal(v3(), "threetwo")

  v2("four")

  t.equal(v3(), "threefour")
  t.deepEqual(values, ["onetwo", "threetwo", "threefour"])

  t.end()
})
