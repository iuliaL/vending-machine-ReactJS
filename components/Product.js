import React from 'react';

export default (props) =>{
	const onSelect = () => props.onProduct(props.details.type);
	return (
		<div className="spacer">
		<button className={"btn "+ (props.details.type.toLowerCase()) + (!props.details.quantity ? ' disabled' : '')}
		        onClick={onSelect}>{props.details.type}</button>
		</div>
	)
}
