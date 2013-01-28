;(function () {

//---util-funtions------

function all(ary, val) {
  for(var k in ary)
    ary[k](val)
}

function remove(ary, item) {
  delete ary[ary.indexOf(item)]  
}

/*
##value
An observable that stores a value.
*/

function value () {
  var _val, listeners = []
  return function (val) {
    return (
      get(val) ? _val
    : set(val) ? all(listeners, _val = val)
    : (listeners.push(val), function () {
        remove(listeners, val)
      })
  )}}

/*
##property
observe a property of an object, works with scuttlebutt.
could change this to work with backbone Model - but it would become ugly.
*/

function get(val) {
  //void(0) is a trick to get a true undefined value, even if user has overwrit
  return undefined === val
}

/*
### set(val) _(private)_
return true if this call is a set (a non function is supplied)
set(val) assumes you have already checked get(val)
if the call is neither a get or a set, a function is passed, it's a listen.
*/

function set(val) {
  return 'function' !== typeof val
}

/*
now, lets rewrite our first example
*/

function property (model, key) {
  return function (val) {
    return (
      get(val) ? model.get(key) :
      set(val) ? model.set(key, val) :
      (model.on('change:'+key, val), function () {
        model.removeListener('change:'+key, val)
      })
    )}}
    //^ if written in this style, always ends )}}

/*
note the use of the elvis operator `?:` in chained else-if formation,
and also the comma operator `,` which evaluates each part and then
returns the last value.

only 8 lines! that isn't much for what this baby can do!
*/

function transform (observable, down, up) {
  return function (val) {
    return (
      get(val) ? down(observable())
    : set(val) ? observable((up || down)(val))
    : observable(function (_val) { val(down(_val)) })
    )}}

function not(observable) {
  return transform(observable, function (v) { return !v })
}

function listen (element, event, attr, listener) {
  function onEvent () {
    listener(element[attr])
  }
  element.addEventListener(event, onEvent, false)
  return function () {
    element.removeEventListener(event, onEvent, false)
  }
}

function attribute(element, attr, event) {
  attr = attr || 'value'; event = event || 'input'
  return function (val) {
    return (
      get(val) ? element[attr]
    : set(val) ? element[attr] = val
    : listen(element, event, attr, val)
    )}}


function html (element) {
  return attribute(element, 'innerHTML', false) //read only
}

function error (message) {
  throw new Error(message)
}

function compute (observables, compute) {
  function getAll() {
    return compute.apply(null, observables.map(function (e) {return e()}))
  }
  return function (val) {
    return (
      get(val) ? getAll()
    : set(val) ? error('read-only')
    : observables.forEach(function (obs) {
        obs(function () { val(getAll()) })
      })
    )}}

function boolean (observable, truthy, falsey) {
  return transform(observable, function (val) {
      return val ? truthy : falsey
    }, function (val) {
      return val == truthy ? true : false
    })
  }

var exports = value

exports.value     = value
exports.not       = not
exports.input     =
exports.attribute = attribute
exports.html      = html
exports.compute   = compute
exports.transform = transform
exports.boolean   = boolean

if('object' === typeof module) module.exports = exports
else                           this.observable = exports
})()
