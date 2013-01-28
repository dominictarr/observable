# observable

A function as representation of a trackable mutable value.

An observable is a very simple idea, 
it is a `function` that can be called in 3 ways,
and represents a mutable value.

If an observable is called with no arguments, it returns the current value.
``` js
var observable = require('observable')
var o = observable()
>o()
undefined
```

If it is called with an argument, it set that as the value.
``` js
>o(true)
>o()
true
```

And, finally, if an observable is called with another function,
it _calls_ that function with the new value, whenever the value changes.

``` js
>o(function (v) {console.log('UPDATE', v)})
>o(true)
UPDATE true
>o('whatever')
UPDATE whatever
```

one of the useful things about functions in javascript is that you can wrap them in other
functions to change them into another function.

``` js
>var n = not(o)
>n(true)
>o()
false
>o(false)
>n()
true
```

The basic features of an `observable` are setting a value, getting a property,
and being notified about updates! There are lots of things that behave just
like that already, but without actually providing the simple `observable` api.

For example, a text `<input>` field.

``` js
/*
function input (in) {
  var _val = in.value
  return function (val) {
    if(val === undefined) {
      return 
    } else if ('function' !== val) {
      in.value = val
    } else {
      function onInput () { val(in.value) }
      in.addEventListener('input', onInput)
      //return a remove function - this will be important later.
      return function () {
        in.removeListener('input', onInput) 
      }
    }
  }
*/
hmm, so this is too wordy... maybe I should just show h...

```

let's use that to 


## License

MIT
