'use strict';

var stream = require('stream'),
    util = require('util'),
    typeOf = require('jstype').type;

module.exports = TransformExpected;

function TransformExpected (options, isExpected) {
	if (typeOf(options) !== 'object') {
		if (typeOf(options) === 'function' && typeOf(isExpected) !== 'function') {
			isExpected = options;
		}
		options = {};
	}

	stream.Transform.call(this, options);

	this.isExpected = TransformExpected.expect.any;

	if (typeOf(isExpected) === 'function') {
		this.isExpected = isExpected;
	}
}

util.inherits(TransformExpected, stream.Transform);

TransformExpected.prototype._transform = function(thing, encoding, done) {
	if (this.isExpected(thing)) {
		return this._expected(thing, encoding, done);
	} else {
		return this._unexpected(thing, encoding, done);
	}
};

TransformExpected.prototype._expected = function(thing, encoding, done) {
	this.push(thing, encoding);
	done();
};

TransformExpected.prototype._unexpected = function(thing, encoding, done) {
	this.push(thing, encoding);
	done();
};

TransformExpected.expect = require('./expectations');