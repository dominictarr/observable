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
    if(updated == 0) {
      t.equal(val, r1)
    } else {
      t.equal(val, r2)
    }
    updated ++
  })

  t.equal(updated, 1)
  v(r2)
  t.equal('function', typeof remove)
  t.equal(updated, 2)
  t.equal(v(), r2)
  remove()
  v(r3)
  //we removed the listener, so updated is not updated...
  t.equal(updated, 2)
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

tape('signal', function (t) {
  var s = observable.signal()
  var mutableSideEffect = "initialVal"

  s("someVal")
  s(function () { mutableSideEffect = "mutated" })
  var mutableSideEffect = "initialVal" //reset
  s("someVal")

  t.equal(mutableSideEffect, "initialVal")

  s("someOtherVal")

  t.equal(mutableSideEffect, "mutated")

  t.end()
})
