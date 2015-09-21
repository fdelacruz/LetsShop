var React = require('react');
var AppStore = require('../stores/app-store');

var StoreWatchMixin = function (cb) {
	return {
		getInitialState: function () {
			return cb(this);
		},
		componentWillMount: function () {
			console.log("Mounted..");
			AppStore.addChangeListener(this._onChange);
		},
		componentWillUnMount: function () {
			console.log("Umounted..");
			AppStore.removeChangeListener(this._onChange);
		},
		_onChange: function () {
			this.setState(cb(this));
		}
	};
};

module.exports = StoreWatchMixin;
