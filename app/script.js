import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off', //tree options off, work and rest
    time: 0, //in seconds
    timer: null //intervale
  }
  pad = (number) => {
    let numberStr = number.toString();
    if (numberStr.length < 2) {
      numberStr = '0' + numberStr;
    }
    return numberStr;
  };
  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      time: 0,
      status: 'off'
    })
  };
  formatTime = (time) => {
    return this.pad(Math.floor((time / 60))) + ":" + this.pad(time % 60);
  }
  step = () => {
    this.setState((prevState) => ({
      ...prevState,
      time: prevState.time - 1
    }));
    if(this.state.time === 0){
     this.playBell();
     switch(this.state.status){
       case 'work': {
         this.setState({
           status: 'rest',
           time: 20
         })
         break;
       }
       case 'rest': {
         this.setState({
           status: 'work',
           time: 11
         })
       }
     } 
    }
  };
  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };
  closeApp = () => {
    window.close();
  }
  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      status: 'work',
      time: 1200,
    });
  };
  render() {
    return (
      <div>
        {
          this.state.status === 'off' ?
            <div>
              <h1>Protect your eyes</h1>
              <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
              <p>This app will help you track your time and inform you when it's time to rest.</p>
            </div>
            : ''
        }
        {(this.state.status === 'work') && <img src="./images/work.png" />}
        {(this.state.status === 'rest') && <img src="./images/rest.png" />}
        {(this.state.status != 'off') && <div className="timer">
          {this.formatTime(this.state.time)}
        </div>}
        {(this.state.status === 'off') && <button className="btn" 
          onClick={this.startTimer}>Start</button>
        }
        {(this.state.status != 'off') && <button className="btn"
          onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close"
          onClick={this.closeApp}
        >X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
