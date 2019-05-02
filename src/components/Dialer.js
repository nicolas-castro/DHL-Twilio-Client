import React, { Component } from 'react';
import axios from 'axios';


class DialerApp extends Component {
  constructor(props){
    super(props);
    this.state ={
      muted: false,
      log: 'Connecting...',
      onPhone: false,
      countryCode: '1',
      currentNumber: '',
      isValidNumber: false,
      countries: [
        { name: 'United States', cc: '1', code: 'us' },
        { name: 'Great Britain', cc: '44', code: 'gb' },
        { name: 'Colombia', cc: '57', code: 'co' },
        { name: 'Ecuador', cc: '593', code: 'ec' },
        { name: 'Estonia', cc: '372', code: 'ee' },
        { name: 'Germany', cc: '49', code: 'de' },
        { name: 'Hong Kong', cc: '852', code: 'hk' },
        { name: 'Ireland', cc: '353', code: 'ie' },
        { name: 'Singapore', cc: '65', code: 'sg' },
        { name: 'Spain', cc: '34', code: 'es' },
        { name: 'Brazil', cc: '55', code: 'br' },
      ]
    }
  }

  componentDidMount() {
    this.self();
  }
    // Configure event handlers for Twilio Device
    disconnect = () => {
      self.setState({
        onPhone: false,
        log: 'Call ended.'
      });
    });

    Twilio.Device.ready(function() {
      self.log = 'Connected';
    });
  };

  // Handle country code selection
  handleChangeCountryCode(countryCode) {
    this.setState({countryCode: countryCode});
  };

  // Handle number input
  handleChangeNumber(e) {
    this.setState({
      currentNumber: e.target.value,
      isValidNumber: /^([0-9]|#|\*)+$/.test(e.target.value.replace(/[-()\s]/g,''))
    });
  };

  // Handle muting
  handleToggleMute() {
    const muted = !this.state.muted;

    this.setState({muted: muted});
    Twilio.Device.activeConnection().mute(muted);
  };

  // Make an outbound call with the current number,
  // or hang up the current call
  handleToggleCall() {
    if (!this.state.onPhone) {
      this.setState({
        muted: false,
        onPhone: true
      })
      // make outbound call with current number
      const n = '+' + this.state.countryCode + this.state.currentNumber.replace(/\D/g, '');
      Twilio.Device.connect({ number: n });
      this.setState({log: 'Calling ' + n})
    } else {
      // hang up call in progress
      Twilio.Device.disconnectAll();
    }
  };


  render(){
    return(
      <div>

      </div>
    )
  }
}



export default DialerApp;