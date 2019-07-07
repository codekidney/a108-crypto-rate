import React from 'react';

const CryptoFilter = (props) => {
    return (
        <div className="CryptoFilter">
            <h5>Crypto Filter</h5>
            <div className="form-group">
                <label>Filter</label>
                <input className="form-control" onChange={props.onChange} type="text" placeholder="Enter currency name"/>
            </div>
        </div>
    )
}
export default CryptoFilter;