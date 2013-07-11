'use strict';

var typeOf = require('jstype').type,
    slice = Array.prototype.slice,
    call = Function.prototype.call,
    hasOwnProperty = Object.prototype.hasOwnProperty;

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

function equals (value) {
	return function (thing) {
		return (thing === value);
	};
}

function hasProperty (property) {
	return withProperty(property, any);
}

function withProperty (property, expectation) {
	return function (thing) {
		return (thing != null && hasOwnProperty.call(thing, property) && expectation(thing[property]));
	};
}

function isTypeOf (type) {
	return function (thing) {
		return (typeOf(thing) === type);
	};
}

function propertyEquals (property, value) {
	return withProperty(property, equals(value));
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
	equals: equals,
	propertyEquals: propertyEquals
};
