'use strict';

import React from 'react';

// Components
import Display from './Display';
import Product from './Product';
import Wallet from './Wallet';

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
		this.price = 0;
		this.balance = 0;
		this.getAll = this.getAll.bind(this);
		this.getPrice = this.getPrice.bind(this);
		this.pay = this.pay.bind(this);
		this.deliver = debounce(this.deliver,1500).bind(this);
		this.reset = debounce(this.reset,2000).bind(this);
		this.gotCash =  this.gotCash.bind(this);
	}
	getAll(){
		service.products.then((res) => {
			this.setState({
				products: res
			});
		}).catch((e) => console.log(e));
	}
	/* GET product price */
    getPrice(value) {
	    this.setState({ paid : false, productType : value});
        service.product(value)
	        .then((product)=> {
		        this.price = product.price;
	        	this.setState({ display: this.price });
		        this.checkAffordable();
	        }).catch((e)=> console.log(e));
    }
    /* update display after inserting cash */
    updateDisplay(due){
    	this.setState({ display: due});
    }
    /* check if enough money */
    gotCash(cash){
    	this.balance += cash;
	    this.updateDisplay(Math.abs(this.checkBalance()));
	    this.checkAffordable()
    }
    checkAffordable () {
	    if(this.checkBalance() >= 0 ){
		    this.pay();
	    }
    }
	checkBalance (){
		return +(this.balance - this.price).toFixed(2);
	}
    componentDidMount() {
    	this.getAll();
    }
    pay(){
	    service.updateStock(this.state.productType)
		    .then((res) => {
			    // extract the price from balance
			    this.balance = this.checkBalance();
			    // reset price to zero
			    this.price = 0;
			    //display balance
			    this.setState({products: res, display: this.balance, paid: true, busy: true});
			    this.deliver();
		    }).catch((e)=>console.log(e));
    }
    deliver(){
    	this.setState({paid: true, busy: false});
	    this.state.productType = null; // reset machine;
	    this.reset();
    }
    reset(){
	    this.setState({ paid: false });
    }
	render() {
		let products = this.state.products.map((p)=>
			<div className="col-xs-4" key={p.uid}>
				<Product details={p} onProduct={this.getPrice}/>
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
					{ this.state.productType && !this.state.paid &&
						<Wallet onCash = {this.gotCash }/>
					}
					{this.state.busy && <p className="status"><span>Delivering...</span><img src="/ajax-loader.gif" className="loader"/></p>}
					{this.state.paid && !this.state.busy && <p className="status">ENJOY!</p>}
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
