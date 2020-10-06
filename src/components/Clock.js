import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/id';

class Clock extends Component {
  
  state = {
    time: moment(),
    date: moment().format('dddd, LL'),
    location: []
  };
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    fetch('http://ip-api.com/json')
        .then( res => {
          if(res.status === 200)
          return res.json()
        })
        .then(response => {
          // console.log(response)
          this.setState({
            location: response
          })
        })
        .catch((data, status) => {
            console.log('Request failed');
        })
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      time: moment()
    });
  }
  
  render() {
    const localTime = this.state.time.format('LTS');
    const localDate = this.state.date;

    return(
      <div>
        <div className="header">
          <a href="#default" className="logo">Time</a>
          {/* <div className="header-right">
            <a href="#home">Home</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
          </div> */}
        </div>

        <div className="clock">
          <span className="location">{this.state.location.city}, {this.state.location.country}</span>
          <h1>{localTime}</h1>
          <span className="date">{localDate}</span>
        </div>
      </div>
    );
  }
 
}

// const Location = () => {
//     return(
      
//     )
// }

export default Clock;