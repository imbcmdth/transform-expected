# Transform-Expected

Apply a stream transformation to objects or buffers that meet some `expectation` and pass objects that **do not** meet that expectation unchanged.

Note: I have only used this for streams with `objectMode` set to true and the expectation functions are currently geared for that particular use-case.

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

## API

`Transform-Expected` is a simple extension of node's built in `stream.Transform` interface.

### new TransformExpected([options][, expectation])

* `options` Object passed along to the internal `stream.Transform` constructor.

* `expectation` Function Returns `true` if the current object or buffer is "expected".

Options can be omitted and the expected function can be passed in as the first argument. If both are omitted, then a general "expect everything" function is used so that this will act exactly like a regular `stream.Transform` object.

### transformExpected._expected(chunk, encoding, callback)

* `chunk` Buffer | String The chunk to be transformed. Will always be a buffer unless the decodeStrings option was set to false.

* `encoding` String If the chunk is a string, then this is the encoding type. (Ignore if decodeStrings chunk is a buffer.)

* `callback` Function Call this function (optionally with an error argument) when you are done processing the supplied chunk.

Note: **This function MUST NOT be called directly.** It should be implemented by child classes, and called by the internal Transform-Expected class methods only.


### transformExpected._unexpected(chunk, encoding, callback)

* `chunk` Buffer | String The chunk to be transformed. Will always be a buffer unless the decodeStrings option was set to false.

* `encoding` String If the chunk is a string, then this is the encoding type. (Ignore if decodeStrings chunk is a buffer.)

* `callback` Function Call this function (optionally with an error argument) when you are done processing the supplied chunk.

Note: **This function MUST NOT be called directly.** It should be implemented by child classes, and called by the internal Transform-Expected class methods only.

### Transform.expectProperty(propertyName)

* `propertyName` String Returns an expectation function that returns true if `propertyName` was found inside of the current stream.

### Transform.expectTypeOf(typeOf)

* `typeOf` String Returns an expectation function that returns true if the stream is of type `typeOf`.

## Quick Example

````javascript
var myTransform = new TransformExpected({ objectMode: true }, TransformExpected.expectTypeOf("string"));

myTransform._expected = function(str, encoding, done) {
    this.push(str.toUpperCase());
    done();
};

myTransform.write({val: "testing"});
myTransform.write("testing");
myTransform.write([1, 2, 3]);
````

Assuming you had `myTransform `piped into another stream, that stream would receive:

````javascript
{val:"testing"}
"TESTING"
[1, 2, 3]
````
