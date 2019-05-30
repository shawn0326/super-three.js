// @THREE-Modification
// for material strategy
function MaterialManager() {

	var _strategies = new Map();

	this.$mode = 0;

	var _this = this;

	this.setMode = function ( mode ) {

		_this.$mode = mode;

	};

	this.getMode = function ( ) {

		return _this.$mode;

	};

	this.addStrategy = function ( mode, method ) {

		_strategies.set( mode, method );

	};

	this.getStrategy = function () {

		return _strategies.get( _this.$mode );

	};

	this.hasStrategy = function ( mode ) {

		return _strategies.has( mode );

	};

}

export { MaterialManager };
