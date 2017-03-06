import React from 'react';

export default (props) =>{
	return (
		<div>
			<span>Insert coins</span>
			<div className="btn-group" style={{ marginLeft : 20 + 'px'}}>
				<button type="button" className="btn btn-success" onClick={() => props.onCash(0.5)}>€0.50</button>
				<button type="button" className="btn btn-success" onClick={() => props.onCash(1)}>€1.00</button>
				<button type="button" className="btn btn-success" onClick={() => props.onCash(2)}>€2.00</button>
			</div>
		</div>
	)
}