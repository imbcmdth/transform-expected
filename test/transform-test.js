var TransformExpected = require('../');
var Writable = require('stream').Writable;

var options = { objectMode: true };

var a = require('assert');

describe('transform-expected', function(){
	it('defaults to a null tranform without any functions overridden', function (test_done) {
		var transform = new TransformExpected(options);

		var testStream = [];

		var endPoint = new Writable({ objectMode: true });

		endPoint._write = function (data, format, done) {
			testStream.push(data);
			done();
		};

		endPoint.on("finish", function(){
			a.deepEqual(testStream, testObjs);
			test_done();
		});

		var testObjs = [
			"a string",
			12345,
			{ foo: "bar" },
			[1, 2, 3, 4, 5]
		];

		transform.pipe(endPoint);

		testObjs.forEach(function(o){
			transform.write(o);
		});
		transform.end();
	});

	it('defaults to a plain tranform without expectations', function (test_done) {
		var transform = new TransformExpected(options);
		transform._expected = function(object, mode, done) {
			this.push('changed');
			done();
		};

		var testStream = [];

		var endPoint = new Writable({ objectMode: true });

		endPoint._write = function (data, format, done) {
			testStream.push(data);
			done();
		};

		endPoint.on("finish", function(){
			a.deepEqual(testStream, ['changed','changed','changed','changed']);
			test_done();
		});

		var testObjs = [
			"a string",
			12345,
			{ foo: "bar" },
			[1, 2, 3, 4, 5]
		];

		transform.pipe(endPoint);

		testObjs.forEach(function(o){
			transform.write(o);
		});
		transform.end();
	});

	it('transforms based on `typeOf` expectation', function (test_done) {
		var transform = new TransformExpected(options, TransformExpected.expect.typeOf('string'));
		transform._expected = function(object, mode, done) {
			this.push('changed');
			done();
		};

		var testStream = [];
		var endPoint = new Writable({ objectMode: true });

		endPoint._write = function (data, format, done) {
			testStream.push(data);
			done();
		};

		endPoint.on("finish", function(){
			a.deepEqual(testStream, ['changed'].concat(testObjs.slice(1)));
			test_done();
		});

		var testObjs = [
			"a string",
			12345,
			{ foo: "bar" },
			[1, 2, 3, 4, 5]
		];

		transform.pipe(endPoint);

		testObjs.forEach(function(o){
			transform.write(o);
		});
		transform.end();
	});

	it('transforms based on `hasProperty` expectation', function (test_done) {
		var transform = new TransformExpected(options, TransformExpected.expect.hasProperty('foo'));
		transform._expected = function(object, mode, done) {
			this.push({ foo: 'changed' });
			done();
		};

		var testStream = [];
		var endPoint = new Writable({ objectMode: true });

		endPoint._write = function (data, format, done) {
			testStream.push(data);
			done();
		};

		endPoint.on("finish", function(){
			testObjs.splice(2, 1, { foo: 'changed' });
			a.deepEqual(testStream, testObjs);
			test_done();
		});

		var testObjs = [
			"a string",
			12345,
			{ foo: "bar" },
			[1, 2, 3, 4, 5]
		];

		transform.pipe(endPoint);

		testObjs.forEach(function(o){
			transform.write(o);
		});
		transform.end();
	});
});
