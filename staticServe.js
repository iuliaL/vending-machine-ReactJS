/* Added for serving static files */

const express = require('express');
const app = require('express')();

app.use('/', express.static( 'public'));

app.listen( 4000, () => {
	console.log("Server running on port ", 4000);
});
