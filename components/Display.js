import React from 'react';

export default (props) => {
    return (
        <div className="input-group">
            <span className="input-group-addon">€</span>
            <input type="text" className="form-control"
                   placeholder="0.00" value={ props.text } readOnly/>
        </div>
    )
}

