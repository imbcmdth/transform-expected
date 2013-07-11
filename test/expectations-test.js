var expect = require('../').expect;

var a = require('assert');
var noPrototype = Object.create(null);

describe('expectation `any` -', function(){
	it('always returns true', function(){
		var any = expect.any;

		a.equal( any(0),			true);
		a.equal( any(1),			true);
		a.equal( any(false),		true);
		a.equal( any(true),			true);
		a.equal( any(""),			true);
		a.equal( any("foo"),		true);
		a.equal( any(null),			true);
		a.equal( any(undefined),	true);
		a.equal( any([]),			true);
		a.equal( any([1]),			true);
		a.equal( any({}),			true);
		a.equal( any(noPrototype),	true);

	});
});

describe('expectation `none` -', function(){
	it('always returns false', function(){
		var none = expect.none;

		a.equal( none(0),			false);
		a.equal( none(1),			false);
		a.equal( none(false),		false);
		a.equal( none(true),		false);
		a.equal( none(""),			false);
		a.equal( none("foo"),		false);
		a.equal( none(null),		false);
		a.equal( none(undefined),	false);
		a.equal( none([]),			false);
		a.equal( none([1]),			false);
		a.equal( none({}),			false);
		a.equal( none(noPrototype),	false);
	});
});

describe('expectation `hasProperty` -', function(){
	it('objects without the specified property return false', function(){
		var hasFoo = expect.hasProperty('foo');

		a.equal( hasFoo(0),				false);
		a.equal( hasFoo(1),				false);
		a.equal( hasFoo(false),			false);
		a.equal( hasFoo(true),			false);
		a.equal( hasFoo(""),			false);
		a.equal( hasFoo("foo"),			false);
		a.equal( hasFoo(null),			false);
		a.equal( hasFoo(undefined),		false);
		a.equal( hasFoo([]),			false);
		a.equal( hasFoo([1]),			false);
		a.equal( hasFoo({}),			false);
		a.equal( hasFoo(noPrototype),	false);
	});

	it('objects with the specified property return true', function(){
		var hasFoo = expect.hasProperty('foo');

		a.equal( hasFoo({ foo: 0 }),			true);
		a.equal( hasFoo({ foo: 1 }),			true);
		a.equal( hasFoo({ foo: false }),		true);
		a.equal( hasFoo({ foo: true }),			true);
		a.equal( hasFoo({ foo: "" }),			true);
		a.equal( hasFoo({ foo: "foo" }),		true);
		a.equal( hasFoo({ foo: null }),			true);
		a.equal( hasFoo({ foo: undefined }),	true);
		a.equal( hasFoo({ foo: [] }),			true);
		a.equal( hasFoo({ foo: [1] }),			true);
		a.equal( hasFoo({ foo: {} }),			true);
		a.equal( hasFoo({ foo: noPrototype }),	true);
	});

	it('primitives without the specified property return false', function(){
		var hasLength = expect.hasProperty('length');

		a.equal( hasLength(0),				false);
		a.equal( hasLength(1),				false);
		a.equal( hasLength(false),			false);
		a.equal( hasLength(true),			false);
		a.equal( hasLength(null),			false);
		a.equal( hasLength(undefined),		false);
	});

	it('primitives with the specified property return true', function(){
		var hasLength = expect.hasProperty('length');

		a.equal( hasLength(""),				true);
		a.equal( hasLength("foo"),			true);
	});
});

describe('expectation `propertyEquals` -', function(){
	it('objects without the specified property return false', function(){
		var fooIsBar = expect.propertyEquals('foo', 'bar');

		a.equal( fooIsBar([]),				false);
		a.equal( fooIsBar([1]),				false);
		a.equal( fooIsBar({}),				false);
		a.equal( fooIsBar(noPrototype),		false);
	});

	it('objects with the specified property but wrong value return false', function(){
		var fooIsBar = expect.propertyEquals('foo', 'bar');

		a.equal(fooIsBar({ foo: 0 }),			false);
		a.equal(fooIsBar({ foo: 1 }),			false);
		a.equal(fooIsBar({ foo: false }),		false);
		a.equal(fooIsBar({ foo: true }),		false);
		a.equal(fooIsBar({ foo: "" }),			false);
		a.equal(fooIsBar({ foo: null }),		false);
		a.equal(fooIsBar({ foo: undefined }),	false);
		a.equal(fooIsBar({ foo: [] }),			false);
		a.equal(fooIsBar({ foo: [1] }),			false);
		a.equal(fooIsBar({ foo: {} }),			false);
		a.equal(fooIsBar({ foo: noPrototype }),	false);
	});

	it('objects with the specified property and value return true', function(){
		var fooIsBar = expect.propertyEquals('foo', 'bar');
		var arr = [];
		arr.foo = 'bar';

		a.equal(fooIsBar({ foo: "bar" }),	true);
		a.equal(fooIsBar(arr),				true);
	});

	it('objects with the specified property return true even if value is `undefined`', function(){
		var fooIsUndefined = expect.propertyEquals('foo', undefined);

		a.equal( fooIsUndefined({ foo: undefined }),	true);
	});

	it('objects with the specified property return true even if value is `null`', function(){
		var fooIsUndefined = expect.propertyEquals('foo', null);

		a.equal( fooIsUndefined({ foo: null }),			true);
	});

	it('primitives without the specified property return false', function(){
		var fooIsBar = expect.propertyEquals('foo', 'bar');

		a.equal( fooIsBar(0),				false);
		a.equal( fooIsBar(1),				false);
		a.equal( fooIsBar(false),			false);
		a.equal( fooIsBar(true),			false);
		a.equal( fooIsBar(""),				false);
		a.equal( fooIsBar("foo"),			false);
		a.equal( fooIsBar(null),			false);
		a.equal( fooIsBar(undefined),		false);
	});

	it('primitives with the specified property and value return true', function(){
		var fooIsBar = expect.propertyEquals('length', 0);

		a.equal( fooIsBar(""),				true);
	});
});

describe('expectation `isTypeOf` -', function(){
	it('objects and primitives without the specified type return false', function(){
		var fooIsString = expect.typeOf('string');
		a.equal( fooIsString(0),			false);
		a.equal( fooIsString(1),			false);
		a.equal( fooIsString(false),		false);
		a.equal( fooIsString(true),			false);
		a.equal( fooIsString(null),			false);
		a.equal( fooIsString(undefined),	false);
		a.equal( fooIsString([]),			false);
		a.equal( fooIsString([1]),			false);
		a.equal( fooIsString({}),			false);
		a.equal( fooIsString(noPrototype),	false);
	});

	it('objects and primitives with the specified type return true', function(){
		var isString = expect.typeOf('string');
		a.equal( isString(""),		true);
		a.equal( isString("foo"),	true);

		var isNumber = expect.typeOf('number');
		a.equal( isNumber(0),		true);
		a.equal( isNumber(1),		true);

		var isBoolean = expect.typeOf('boolean');
		a.equal( isBoolean(false),	true);
		a.equal( isBoolean(true),	true);

		var isNull = expect.typeOf('null');
		a.equal( isNull(null),		true);

		var isUndefined = expect.typeOf('undefined');
		a.equal( isUndefined(undefined),	true);

		var isArray = expect.typeOf('array');
		a.equal( isArray([]),		true);
		a.equal( isArray([1]),		true);

		var isObj = expect.typeOf('object');
		a.equal( isObj({}),				true);
		a.equal( isObj(noPrototype),	true);
	});
});


describe('expectation `equals` -', function(){
	it('objects without the specified value return false', function(){
		var equalsFoo = expect.equals('foo');

		a.equal( equalsFoo(0),				false);
		a.equal( equalsFoo(1),				false);
		a.equal( equalsFoo(false),			false);
		a.equal( equalsFoo(true),			false);
		a.equal( equalsFoo(""),				false);
		a.equal( equalsFoo(null),			false);
		a.equal( equalsFoo(undefined),		false);
		a.equal( equalsFoo([]),				false);
		a.equal( equalsFoo([1]),			false);
		a.equal( equalsFoo({}),				false);
		a.equal( equalsFoo(noPrototype),	false);
	});

	it('objects with the specified value return true', function(){
		var equalsFoo = expect.equals('foo');
		a.equal( equalsFoo("foo"),		true);

		var equalsOne = expect.equals(1);
		a.equal( equalsOne(1),			true);
	});
});

describe('expectation `every` -', function(){
	it('if any expectation is false it returns false', function(){
		var everyFalse = expect.every(
			expect.any,
			expect.none
		);

		a.equal( everyFalse(0),		false);
	});

	it('if all expectations are true it returns true', function(){
		var everyTrue = expect.every(
			expect.any,
			expect.any
		);

		a.equal( everyTrue(0),		true);
	});

	it('if there are no expectations returns true', function(){
		var everyTrue = expect.every();

		a.equal( everyTrue(0),		true);
	});
});

describe('expectation `some` -', function(){
	it('if any expectation is true it returns true', function(){
		var someTrue = expect.some(
			expect.none,
			expect.any
		);

		a.equal( someTrue(0),		true);
	});

	it('if all expectations are false it returns false', function(){
		var someFalse = expect.some(
			expect.none,
			expect.none
		);

		a.equal( someFalse(0),		false);
	});

	it('if there are no expectations returns false', function(){
		var someFalse = expect.some();

		a.equal( someFalse(0),		false);
	});
});
