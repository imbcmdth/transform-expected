'use strict';

var typeOf = require('jstype').type,
    slice = Array.prototype.slice,
    call = Function.prototype.call;

function toArray () {
	return call.apply(slice, arguments);
}

function any (thing) { return true; }

function none (thing) { return false; }

function every () {
	var functions = toArray(arguments);
	return function (thing) {
		return functions.every(function (fn) {
			return fn(thing);
		});
	};
	// NOTE: Array's every returns true on an empty array
}

function some () {
	var functions = toArray(arguments);
	return function (thing) {
		return functions.some(function (fn) {
			return fn(thing);
		});
	};
	// NOTE: Array's some returns false on an empty array
}

function not (expectFn) { 
	return function (thing) {
		return !expectFn(thing);
	};
}

function hasProperty (property) {
	return function (thing) {
		return (thing && thing[property] != null);
	};
}

function withProperty (property, expectation) {
	return function (thing) {
		return (thing && thing[property] != null && expectation(thing[property]));
	};
}

function isTypeOf (type) {
	return function (thing) {
		return (typeOf(thing) === type);
	};
}

function propertyEquals (property, value) {
	return function (thing) {
		return (thing && thing[property] === value);
	};
}

module.exports = {
	any: any,
	none: none,
	every: every,
	some: some,
	not: not,
	hasProperty: hasProperty,
	withProperty: withProperty,
	typeOf: isTypeOf,
	propertyEquals: propertyEquals
};
