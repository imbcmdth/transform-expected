var stream = require('stream'),
    util = require('util');

module.exports = TransformExpected;

function TransformExpected (options, isExpected) {
	stream.Transform.call(this, options);

	this.isExpected = expectAll;

	if (typeof options === 'function') {
		isExpected = options;
	}

	if (typeof isExpected === 'function') {
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

function expectAll() { return true; };

TransformExpected.expectProperty = function (property) {
	return function (thing) {
		return (thing && thing[property]);
	};
};

TransformExpected.expectTypeOf = function (typeOf) {
	return function (thing) {
		return (thing && typeof thing === typeOf);
	};
};