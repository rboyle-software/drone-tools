import React, { useState, useCallback } from 'react';
import DisplayResult from './DisplayResult';
import InputForm from './InputForm';
import logo from './logo.png';
import Modal from './Modal';
import './styles/App.css';


export default function App() {


  const [state, setState] = useState({
    airspeed: 0,
    altitude: 0,
    battV: 0,
    localMach1Km: 0,
    localMach1Mi: 0,
    motorKv: 0,
    propDiaIn: 0,
    propDiaMm: 0,
    units: 'imperial',
    valueMetric: 0,
    valueImperial: 0
  });

  const [conditions, setConditions] = useState({
    condition: '',
    humidity: 0,
    location:'',
    pressure_in: 0,
    pressure_mb: 0,
    temp_c: 0,
    temp_f: 0,
    zip: ''
  });

  const [modal, setModal] = useState({
    modalDisplay: false,
    modalMessage: '',
  });


  const getConditions = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    // call to weatherapi.com to get local weather conditions
    // build query string using api key and user input zip code (or city)
    // if no user location input, alert
    // if user location input, make the call
    // conditions state object is a dependency

    e.preventDefault();

    if (conditions.zip === '') {
      // alert('Please enter a postal code!');
      setModal({
        ...modal, modalDisplay: true, modalMessage: 'Please enter a postal code!'
      });
      return;
    }

    const wxQueryString: string = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${conditions.zip}&aqi=no`;

    conditions.zip && fetch(wxQueryString)
    .then(res => res.json())
    .then(wx => {
      setConditions({
        ...conditions,
        condition: wx.current.condition.text,
        humidity: wx.current.humidity,
        location: wx.location.name,
        pressure_in: wx.current.pressure_in,
        pressure_mb: wx.current.pressure_mb,
        temp_c: wx.current.temp_c,
        temp_f: wx.current.temp_f,
      })
    })
    .catch(err => console.error(err))
  }, [conditions, modal]);


  const handleUnits = (units: string) => {
    // update Prop Dia value in form input field when units change
    const propDiameter: HTMLInputElement | null = document.querySelector('.propDia');
    if (propDiameter) propDiameter.valueAsNumber = (units === 'imperial')
      ? state.propDiaIn
      : state.propDiaMm
    // update units in state
    setState({
      ...state,
      units: units
    });
  }

  const handlePropDia = (propDiameter: number) => {
    // if MPH is selected, propDiaIn is user input value and propDiaMm is calculated
    // if KPH is selected, propDiaMm is user input value and propDiaIn is calculated
    // update propDiaIn and propDiaMm in state

    let propDiaIn: number = 0;
    let propDiaMm: number = 0;
    if (state.units === 'imperial') {
      propDiaIn = propDiameter;
      propDiaMm = parseFloat((propDiameter * 25.4).toFixed(1))
    }
    if (state.units === 'metric') {
      propDiaIn = parseFloat((propDiameter / 25.4).toFixed(1));
      propDiaMm = propDiameter;
    }
    setState({
      ...state,
      propDiaIn: propDiaIn,
      propDiaMm: propDiaMm
    });
  }

  // handles all numeric inputs to the 'state' object
  const handleNumericInput = (e: any) => {
    const property: string = e.target.className;
    const value: number = Math.round(e.target.valueAsNumber * 100) / 100 || 0;
    setState({
      ...state,
      [property]: value
    });
  }

  const handleZip = (zipCode: string) => {
    setConditions({
      ...conditions,
      zip: zipCode
    });
  }

  const handleDismiss = () => {
    setModal({
      ...modal,
      modalDisplay: false,
      modalMessage: ''
    })
  }


  const calculate = (e: React.FormEvent<HTMLFormElement>) => {
    /*
    1. calculate motor unloaded RPM based on battery voltage and motor rating
    source: https://www.rcdronegood.com/brushless-motor-kv-to-rpm/

    2. calculate prop tip speed based on prop diameter and RPM
    speed = (2πr) * RPM - circumference = distance tip distance per revolution

    3. calculate local Mach 1 based on estimated air temp at altitude
    meters/second = 331.3 + (0.6 * {temp c})
    source: http://www.sengpielaudio.com/calculator-speedsound.htm
    */

    // prevent page reload on form submit
    e.preventDefault();

    // validation rules / alerts
    if (!state.propDiaIn || !state.propDiaMm) {
      // alert('Please enter propeller diameter!');
      setModal({
        ...modal, modalDisplay: true, modalMessage: 'Please enter propeller diameter!'
      });
      return;
    }
    else if (!state.battV) {
      // alert('Please enter battery voltage!');
      setModal({
        ...modal, modalDisplay: true, modalMessage: 'Please enter battery voltage!'
      });
      return;
    }
    else if (!state.motorKv) {
      // alert('Please enter motor power rating!');
      setModal({
        ...modal, modalDisplay: true, modalMessage: 'Please enter motor power rating!'
      });
      return;
    }

    // initialize values for calculations
    const inches: number = state.propDiaIn;
    const millimeters: number = state.propDiaIn * 25.4;
    const volts: number = state.battV;
    const killavolts: number = state.motorKv;
    const inPerMile: number = 63360;
    const mmPerKm: number = 1e6;
    const minPerHour: number = 60;

    // initialize variables to calculated prop tip speeds
    const MPH: number = parseFloat(((inches * Math.PI) * (volts * killavolts) / inPerMile * minPerHour).toFixed(1)) + state.airspeed;
    const KPH: number = parseFloat(((millimeters * Math.PI) * (volts * killavolts) / mmPerKm * minPerHour).toFixed(1)) + state.airspeed;

    // calculate temperature at user input altitude OR local temp from API call
    const localTemp_c: number = (state.altitude)
      ? conditions.temp_c - (state.altitude / 500)
      : conditions.temp_c;
    // calculate local Mach 1 KPH using metric values
    const localMach1Km: number = parseFloat(((331.3 + (0.6 * localTemp_c)) / 1e3 * 3600).toFixed(1));
    // calculate local Mach 1 MPH using KPH -> MPH conversion
    const localMach1Mi: number = parseFloat((localMach1Km * 0.621371).toFixed(1));

    setState({ 
      ...state,
      valueImperial: MPH,
      valueMetric: KPH,
      localMach1Km: localMach1Km,
      localMach1Mi: localMach1Mi
    });

  }


  return (
    <div className="App">

      <header
        className={`App-header ${modal.modalDisplay
          ? 'modal-blur'
          : 'no-blur'}`}
      >
        <img src={logo} className="App-logo" alt="spinning-logo" />
        <p>DRONE TOOLS</p>
      </header>

      {modal.modalDisplay &&
      <Modal
        dismissModal={handleDismiss}
        message={modal.modalMessage}
        blur={modal.modalDisplay}
      />}

      <DisplayResult
        mach1Mi={state.localMach1Mi}
        mach1Km={state.localMach1Km}
        units={state.units}
        valueImperial={state.valueImperial}
        valueMetric={state.valueMetric}
        wxConditions={conditions.condition}
        wxHumidity={conditions.humidity}
        location={conditions.location}
        wxPressureIn={conditions.pressure_in}
        wxPressureMb={conditions.pressure_mb}
        wxTempC={conditions.temp_c}
        wxTempF={conditions.temp_f}
        blur={modal.modalDisplay}
        />

      <InputForm
        units={state.units}
        handleUnits={handleUnits}
        handlePropDia={handlePropDia}
        handleNumericInput={handleNumericInput}
        handleZip={handleZip}
        calculate={calculate}
        getConditions={getConditions}
        blur={modal.modalDisplay}
      />

    </div>

  );

}
