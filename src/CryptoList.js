import React, {Component} from 'react';

class CryptoList extends Component {
    render(){
        const rates = this.props.rates;
        // console.log(rates);
        if(rates){
            // console.log(Object.keys(rates));
            return (
                <div className="CryptoList">
                    <h5>Crypto List</h5>
                    <ul className="list-group text-left">
                        {rates.map((rate) =>
                        <li className="list-group-item" key={rate.currency}>
                            Last rate:&nbsp;
                            <span className={rate.color}>
                                {rate.last}, 
                                <i className={rate.arrow} aria-hidden="true"></i>&nbsp;
                            </span> 
                            {rate.currency}[{rate.symbol}]</li>
                        )}
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="CryptoList">
                    <h3>Crypto List</h3>
                </div>
            )  
        }
    }
}
export default CryptoList;