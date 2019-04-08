import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieInfo from '../seat/components/MovieInfo';
import SeatSelected from './components/SeatSelected';
import SeatSelector from "./contianer/SeatSelector";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import seatSelect from './reducers'
import '../../css/seat-index.css'


let store = createStore(seatSelect);

class Seat extends Component {
    // state = {
    //     selectSeat:[]
    // }

    // addSeat=(seat)=>{
    //     this.setState(prevState=>({
    //         selectSeat:[...prevState.selectSeat,seat]
    //     }));
    // }

    // removeSeat=(id)=>{
    //     this.setState({
    //         selectSeat:this.state.selectSeat.filter(seat => seat.id !==id)
    //     })
    // }

    render() {
        // const { selectSeat } = this.state;
        // console.log(selectSeat);
        return (
            <Provider store={store} >
                <div className="seat">
                    <div className="tOperator">
                        <i className="tOperator__icon tOperator__icon--blackBack "  onClick={() => { window.history.back(); }}></i>
                        万达影院
                    <i className="tOperator__icon tOperator__icon--blackShare"></i>
                    </div>
                    <MovieInfo />
                    <div className="seat__main">
                        <div className="seat__tip"></div>
                        <div className="seat__graph">
                            <div className="seat__screen">B13荧幕</div>
                            <div className="seat__map">
                                <SeatSelector />
                            </div>
                        </div>
                    </div>
                    <SeatSelected />
                </div>
            </Provider>

        );
    }
}

Seat.propTypes = {

};

export default Seat;