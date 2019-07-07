import React, {Component} from 'react';
import axios from 'axios';
import CryptoList from './CryptoList';
import CryptoFilter from './CryptoFilter';

class Crypto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: false,
            filterInitRates: []
        }
    }

    getData = () => {
        axios.get(`https://blockchain.info/pl/ticker`)
            .then(res => {
                const currentRates = [];

                // Create new array for store rate data (obj -> arr)
                Object.keys(res.data).forEach((key) => {
                    // Crate
                    const newRate = res.data[key];
                    newRate.currency = key;

                    // Compare
                    if(this.state.rates) {
                        const prevPropLast = this.state.rates.filter(obj => {
                            return obj.currency === key
                        })[0].last;
                        const currPropLast = newRate.last;
                        if(currPropLast > prevPropLast) {
                            newRate.color = 'green';
                            newRate.arrow = 'fa fa-arrow-up';
                        } else if (currPropLast < prevPropLast ){
                            newRate.color = 'red';
                            newRate.arrow = 'fa fa-arrow-down';
                        } else {
                            newRate.arrow = 'fa fa-arrows-h';
                        }
                    }

                    // Add
                    currentRates.push( newRate );
                });
                
                // Set Current Rate
                this.setState({ rates: currentRates});
                
                console.log('Rates updated');
            })
    }

    componentDidMount() {
        this.getData();
        window.setInterval( () => { 
            if(!this.state.filter){
                this.getData() 
            }
        }, 3000);
    }

    filterList = (e) => {
        const filterStr     = e.target.value.toUpperCase();
        const currentRates  = (this.state.filterInitRates.length > 0) ? this.state.filterInitRates : this.state.rates;
        const filteredRates = (filterStr.length > 0) ? currentRates.filter(obj => {
            return obj.currency.includes(filterStr);
        }) : [];
        console.log(`Find currency: ${filterStr} | Found: ${filteredRates.length} from all: ${currentRates.length} rates`);
        
        if(filteredRates.length > 0){
            if(this.state.filterInitRates.length === 0) {
                this.setState({
                    filterInitRates: currentRates
                })
            }
            console.log('Update list');
            this.setState({
                rates: filteredRates
            })
        } else {
            const initRates = this.state.filterInitRates;
            this.setState({
                rates: initRates
            });
        }
        // Turn filter on when input not empty
        if(filterStr.length > 0) {
            this.setState({ filter: true })
        } else {
            this.setState({ filter: false })
        }

    }

    render(){
        return (
            <div className="Crypto">
                <CryptoFilter onChange={this.filterList}/>
                <CryptoList rates={this.state.rates} />
            </div>
        )
    }
}
export default Crypto;