# Transform-Expected

Apply a stream transformation to objects that meet some `expectation` and pass objects that **do not** meet that expectation unchanged.

**Note**: I have only used this for streams with `objectMode` set to `true` and the expectation functions are currently geared for that particular use-case. This probably won't work as-is on Buffer or string-based streams.

[![Build Status](https://travis-ci.org/imbcmdth/transform-expected.png)](https://travis-ci.org/imbcmdth/transform-expected)

## Installation

### Node.js

For *Node.js*, use `npm`:

````console
npm install transform-expected
````

..then `require` Transform-Expected:

````javascript
var TransformExpected = require('transform-expected');
````

## Quick Example

````javascript
var expect = TransformExpected.expect;

var myTransform = new TransformExpected(
    { objectMode: true },
    expect.withProperty('val',
        expect.typeOf('string')));

myTransform._expected = function(obj, encoding, done) {
    obj.val = obj.val.toUpperCase();
    this.push(obj);
    done();
};

myTransform.write({ val: 12345 });
myTransform.write({ val: "testing" });
myTransform.write("testing");
myTransform.write([ 1, 2, 3 ]);
````

Assuming you had `myTransform `piped into another stream, that stream would receive:

````javascript
{ val: 12345 }
{ val: "TESTING" }
"TESTING"
[ 1, 2, 3 ]
````

As you can see, only the second object passed in meets our expectation *(has property 'val' that is of type 'string')* so only that object is transformed while all other objects pass-through unchanged.

## API

`Transform-Expected` is a simple extension to node's built in `stream.Transform` interface.

### new TransformExpected([options][, expectation])

* `options` Object passed along to the internal `stream.Transform` constructor.

* `expectation` Function Returns `true` if the current object or buffer is "expected".

Options can be omitted and the expected function can be passed in as the first argument. If both are omitted, then a general "expect everything" function is used so that this will act exactly like a regular `stream.Transform` object.

### transformExpected._expected(chunk, encoding, callback)

* `chunk` Buffer | String | Object The chunk to be transformed. Will always be a buffer unless the decodeStrings option was set to false.

* `encoding` String If the chunk is a string, then this is the encoding type. (Ignore if decodeStrings chunk is a buffer.)

* `callback` Function Call this function (optionally with an error argument) when you are done processing the supplied chunk.

Note: **This function MUST NOT be called directly.** It should be implemented by child classes, and called by the internal Transform-Expected class methods only.


### transformExpected._unexpected(chunk, encoding, callback)

* `chunk` Buffer | String | Object The chunk to be transformed. Will always be a buffer unless the decodeStrings option was set to false.

* `encoding` String If the chunk is a string, then this is the encoding type. (Ignore if decodeStrings chunk is a buffer.)

* `callback` Function Call this function (optionally with an error argument) when you are done processing the supplied chunk.

Note: **This function MUST NOT be called directly.** It should be implemented by child classes, and called by the internal Transform-Expected class methods only.

## Expectations

All `expectations` are properties of the object `TransformExpected.expect`.

### expect.any

Always returns true.

### expect.none

Always returns false.

### expect.equals(value)

* `value` any JavaScript value

Returns an expectation function that returns true if the stream is equal to `value`.

### expect.hasProperty(propertyName)

* `propertyName` String

Returns an expectation function that returns true if `propertyName` was found inside of the current stream.

### expect.withProperty(propertyName, expectation)

* `propertyName` String

* `expectation` Function

Returns an expectation function that returns true if `propertyName` was found inside of the current stream and the expectation function evaluates to true when called against the value of property referred to in `propertyName`.

### expect.propertyEquals(propertyName, value)

* `propertyName` String

* `value` Any JavaScript value

Returns an expectation function that returns true if `propertyName` was found inside of the current stream and is equal to `value`.

### expect.typeOf(typeOf)

* `typeOf` String

Returns an expectation function that returns true if the stream is of type `typeOf`.

### expect.not(expectation)

* `expectation` Function

Returns an expectation function that returns true if the expectation function evaluates to false.

## Expectation Iterators

### expect.every(expectation_1, expectation_2, ... expectation_N)

* `expectation` Functions

Returns an expectation function that returns true if **all** the expectation functions evaluate to true.

### expect.some(expectation_1, expectation_2, ... expectation_N)

* `expectation` Functions

Returns an expectation function that returns true if *any* of the expectation functions evaluate to true.

## License - MIT

> Copyright (C) 2013 Jon-Carlos Rivera
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
