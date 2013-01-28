var tape = require('tape')
var observable = require('..')
tape('basic', function (t) {
  var v = observable.value()

  t.equal('function', typeof v)
  var r1 = Math.random(), r2 = Math.random(), r3 = Math.random()
  var updated = 0

  v(r1)
  console.log('v()', r1, v())
  t.equal(v(), r1)

  var remove = v(function (val) {
    t.equal(val, r2)
    updated ++
  })

  t.equal(updated, 0)
  v(r2)
  t.equal('function', typeof remove)
  t.equal(updated, 1)
  t.equal(v(), r2)
  remove()
  v(r3)
  //we removed the listener, so updated is not updated...
  t.equal(updated, 1)
  t.equal(v(), r3)

  t.end()
})

tape('boolean', function (t) {
  var o = observable()
  var b = observable.boolean(o, 'Yes', 'No')

  o(true)
  t.equal(b(), 'Yes')

  o(false)
  t.equal(b(), 'No')

  b('Yes')
  t.equal(o(), true)

  b('No')
  t.equal(o(), false)

  t.end()
})
