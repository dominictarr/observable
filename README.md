# observable

A function as representation of a trackable mutable value.

[Interactive Demo](http://dominictarr.github.com/observable)

It's basically just a `function` that can be called in 3 ways,
If an observable is called with no arguments `f()`, it returns the current value.
If it is called with an argument `f(value)`, it set that as the value.
``` js
var o = require('observable')
var v = o()

//set the value
v(Math.random())

//get the value
v()
```

And, finally, if an observable is called with another function, `f(function (v) {...})`,
it _calls_ that function with the new value, whenever the value changes.

``` js
var o = require('observable')
var v = o()

v(0)

setInterval(function () {
  v(v() + 1)
}, 500)

v
```

How is this demo updating in real-time like that?
It's becasue `observable` is integrated into 
[hyperscript](https://github.com/dominictarr/hyperscript)!

``` js
var o = require('observable')
var h = require('hyperscript')
var yourName
  
h('div', 
  h('h3', 'hello, what is your name?',
    yourName = h('input', {placeholder: 'enter name'})
  ),
  h('h2', o.transform(o.input(yourName), function (v) {
    return v ? 'Happy Birthday ' + v.toUpperCase() + ' !!!': ''
  }), {style: {'font-family': 'Comic Sans MS'}})
)
```

Oh, wow! wasn't that easy! and we did a lot of things there!

* made hyper text that updated in realtime
* read from an input as you typed
* transformed user input

And there is many other cool things we can do to!

Here is a simpler example

``` js
var o = require('observable')
var h = require('hyperscript')
var _i, i
h('div',
  _i = h('input', {type: 'checkbox'}),
  'checked:', i = o.input(_i, 'checked', 'change'),
  ' !checked:', o.not(i)
)
```

Hmm, I wonder if we could couple two things interms of each other?

``` js
var o = require('observable')
var h = require('hyperscript')
var _i = h('input', {type: 'checkbox'})
var _j = h('input', {type: 'checkbox'})
var i = o.input(_i, 'checked', 'change')
var j = o.input(_j, 'checked', 'change')

//just make i != j & j != i
j(o.not(i)); i(o.not(j)); j(Math.random() > 0.5)

h('div', _i, _j)
```

## License

MIT
