var React = require('react');
var Catalog = require('./catalog/app-catalog');
var Cart = require('./cart/app-cart');

var APP  = React.createClass({
		render: function() {
			return (
					<div>
						<h1>Let's Shop</h1>
						<Catalog />
						<h1>Cart</h1>
						<Cart />
					</div>
		  )
		}
});

module.exports = APP;
