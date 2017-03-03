'use strict';

import mocks from './mocks';

/* GET all products */
const products = new Promise((resolve, reject) => resolve(mocks));

/* GET specified product */
const product = (type) => new Promise((resolve, reject) => {
	return products.then( (res) => {
		let found = res.find((p) => p.type == type);
		resolve(found);
	}).catch((e) => reject(e));
});

const updateStock = (type) => new Promise((resolve, reject) => {
	return products.then( (products) => {
		products.forEach((p) => {
			if(p.type == type){
				p.quantity--}
		});
		resolve(products);
	}).catch((e) => reject(e));
});

export default {
	products: products,
	product: product,
	updateStock
}
