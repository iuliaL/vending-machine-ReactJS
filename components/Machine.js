'use strict';

import React from 'react';

// Components
import Display from './Display';
import Product from './Product';

// Functions
import service from '../service';

export default class Machine extends React.Component{
	constructor (props) {
		super();
		this.state =  {
			products: [],
			display : '0.00',
			busy: false,
			paid: false,
			productType: null
		};
		this.getAll = this.getAll.bind(this);
		this.get = this.get.bind(this);
		this.pay = this.pay.bind(this);
		this.deliver = debounce(this.deliver,1500).bind(this);
		this.reset = debounce(this.reset,2000).bind(this);
	}
	getAll(){
		this.setState({ busy : true });
		service.products.then((res) => {
			//console.log('Stock is',res);
			this.setState({
				products: res
			});
		}).catch((e) => console.log(e));
		//.finally(()=> this.setState({ busy : false }))
	}
    get(value) {
	    //console.log('got value',value);
	    this.setState({ paid : false, productType : value});
        service.product(value)
	        .then((product)=> {
	        	//console.log('product',product);
	        	this.setState({ display: product.price });
	        }).catch((e)=> console.log(e));
    }
    componentDidMount() {
    	this.getAll();
    }
    pay(){
    	service.updateStock(this.state.productType)
		    .then((res) => {
		    	//console.log('Stock updated', res);
			    this.setState({ products: res, display: '0.00', paid: true, busy: true});
			    this.deliver();
        }).catch((e)=>console.log(e));
    	
    }
    deliver(){
    	this.setState({paid: true, busy: false});
	    this.state.productType = null; // reset machine;
	    this.reset();
    }
    reset(){
	    this.setState({paid: false});
    }
	render() {
		let products = this.state.products.map((p)=>
			<div className="col-xs-4" key={p.uid}>
				<Product details={p} onProduct={this.get}/>
			</div>);
		return (
			<div className="panel panel-danger text-center">
				<div className="panel-heading">
					<h4 className="panel-title">ENERGIZER</h4>
				</div>
			 	<div className="panel-body">
				    <Display text={this.state.display} />
				    <div className="row">
					    {products}
				    </div>
			    </div>
				<div className="panel-footer">
					{!this.state.productType && !this.state.busy && <p className="status">Select Product</p>}
					{this.state.productType && !this.state.paid && <button className="btn btn-default" onClick={this.pay}>Pay amount</button>}
					{this.state.busy && <p className="status"><span>Delivering...</span><img src="../ajax-loader.gif" className="loader"/></p>}
					{this.state.paid && !this.state.busy && <p className="status">Enjoy!</p>}
				</div>
			</div>
		)
	}
}

function debounce(callback, seconds) {
	let timer = null;
	return function () {
		let context = this;
		let args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			callback.apply(context, args);
		}, seconds);
	};
}
