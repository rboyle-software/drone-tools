import React, { useState, useCallback } from 'react';
import DisplayResult from './DisplayResult';
import InputForm from './InputForm';
import Header from './Header';
import Modal from './Modal';
import '../styles/App.scss';

import { calculate } from '../utilities/calculate';


export default function App() {



  const [inputs, setInputs] = useState({
    airspeedKnots: 0,
    airspeedKph: 0,
    altitude: 0,
    battV: 0,
    feetPerSecond: 0,
    machNumber: 0,
    metersPerSecond: 0,
    motorKv: 0,
    propDiaIn: 0,
    propDiaMm: 0,
    units: 'imperial',
  });


  const [conditions, setConditions] = useState({
    cityZip: '',
    condition: '',
    humidity: 0,
    localMach1Mps: 0,
    localMach1Fps: 0,
    location:'',
    pressure_in: 0,
    pressure_mb: 0,
    temp_c: 0,
    temp_f: 0
  });


  const [modalState, setModalState] = useState({
    modalDisplay: false,
    modalMessage: '',
  });


  const handleUnits = useCallback((units: string) => {

    // select the propDia numeric input element
    const propDiameter: HTMLInputElement | null = document.querySelector('.propDia');
    const airspeed: HTMLInputElement | null = document.querySelector('#airspeed');

    // update the value in propDia input when units radio value changes
    if (propDiameter && (inputs.propDiaIn || inputs.propDiaMm)) {
      propDiameter.valueAsNumber = (units === 'imperial')
      ? inputs.propDiaIn
      : inputs.propDiaMm;
    }

    // update the value in airspeed input when units radio value changes
    if (airspeed) {
      airspeed.classList.toggle('airspeedKnots');
      airspeed.classList.toggle('airspeedKph');
      if (inputs.airspeedKnots || inputs.airspeedKph) {
        airspeed.valueAsNumber = (units === 'imperial')
        ? inputs.airspeedKnots
        : inputs.airspeedKph;
      }
    }

    // update units in state
    setInputs({
      ...inputs,
      units: units
    });
  }, [inputs]);


  const handlePropDia = useCallback((propDiameter: number) => {
    // if Imperial is selected, propDiaIn is user input value and propDiaMm is calculated
    // if Metric is selected, propDiaMm is user input value and propDiaIn is calculated
    // update propDiaIn and propDiaMm in state

    let propDiaIn: number = 0;
    let propDiaMm: number = 0;
    if (inputs.units === 'imperial') {
      propDiaIn = propDiameter;
      propDiaMm = parseFloat((propDiameter * 25.4).toFixed(1));
    }
    if (inputs.units === 'metric') {
      propDiaIn = parseFloat((propDiameter / 25.4).toFixed(1));
      propDiaMm = propDiameter;
    }
    setInputs({
      ...inputs,
      propDiaIn: propDiaIn,
      propDiaMm: propDiaMm
    });
  }, [inputs]);


  const handleAirspeed = (airspeed: number) => {
    // similar to handlePropDia

    let airspeedKnots: number = 0;
    let airspeedKph: number = 0;
    if (inputs.units === 'imperial') {
      airspeedKnots = airspeed;
      airspeedKph = parseFloat((airspeed * 1.852).toFixed(1));
    }
    if (inputs.units === 'metric') {
      airspeedKnots = parseFloat((airspeed * 0.539957).toFixed(1));
      airspeedKph = airspeed;
    }
    setInputs({
      ...inputs,
      airspeedKnots: airspeedKnots,
      airspeedKph: airspeedKph
    });
  }


  // handles all numeric inputs to the 'inputs' object
  const handleNumericInput = (e: React.BaseSyntheticEvent) => {
    const property: string = e.target.className;
    const value: number = Math.round(e.target.valueAsNumber * 100) / 100 || 0;
    setInputs({
      ...inputs,
      [property]: value
    });
  }


  const handleCityZip = (cityZip: string) => {
    setConditions({
      ...conditions,
      cityZip: cityZip
    });
  }


  const handleDismiss = () => {
    setModalState({
      ...modalState,
      modalDisplay: false,
      modalMessage: ''
    })
  }


  const calculateMachNumber = useCallback((e: React.FormEvent<HTMLFormElement>) => {

    /*
      1. calculate motor unloaded RPM based on battery voltage and motor rating
         source: https://www.rcdronegood.com/brushless-motor-kv-to-rpm/

      2. calculate prop tip speed based on prop diameter and RPM
         speed = (2πr) * RPM - circumference = distance tip distance per revolution
    */

    // prevent page reload on form submit
    e.preventDefault();

    // validation rules / alert modals
    if (!inputs.propDiaIn || !inputs.propDiaMm) {
      setModalState({
        ...modalState,
        modalDisplay: true,
        modalMessage: 'Please enter propeller diameter!'
      });
      return;
    }
    else if (!inputs.battV) {
      setModalState({
        ...modalState,
        modalDisplay: true,
        modalMessage: 'Please enter battery voltage!'
      });
      return;
    }
    else if (!inputs.motorKv) {
      setModalState({
        ...modalState,
        modalDisplay: true,
        modalMessage: 'Please enter motor power rating!'
      });
      return;
    }

    // initialize values for calculations
    const inches: number = inputs.propDiaIn;
    const millimeters: number = inputs.propDiaMm;
    const volts: number = inputs.battV;
    const kilovolts: number = inputs.motorKv;
    const airspeedKnots: number = inputs.airspeedKnots;
    const airspeedKph: number = inputs.airspeedKph;

    interface inputsUD {
      feetPerSecond: number,
      machNumber: number,
      metersPerSecond: number
    }

    const inputsUpdate: inputsUD = calculate(inches, millimeters, volts, kilovolts, airspeedKnots, airspeedKph, conditions.localMach1Mps);

    setInputs({
      ...inputs,
      feetPerSecond: inputsUpdate.feetPerSecond,
      machNumber: inputsUpdate.machNumber,
      metersPerSecond: inputsUpdate.metersPerSecond
    });

  }, [inputs, modalState, conditions.localMach1Mps]);


  const getConditions = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    /*
      1. build query string using api key and user input zip code
    
      2. call to weatherapi.com to get local weather conditions

      3. calculate local Mach 1 based on estimated air temp at altitude
         meters/second = 331.3 + (0.6 * {temp c})
         source: http://www.sengpielaudio.com/calculator-speedsound.htm
    */

    e.preventDefault();

    if (conditions.cityZip === '') {
      setModalState({
        ...modalState,
        modalDisplay: true,
        modalMessage: 'Please enter a city or postal code!'
      });
      return;
    }

    // 'fetch-weather' serverless function to mask API key
    const wxQueryString: string = `https://dronetools.dev/.netlify/functions/fetch-weather?cityZip=${conditions.cityZip}`;
    // const wxQueryString: string = `http://localhost:8888/.netlify/functions/fetch-weather?cityZip=${conditions.cityZip}`;

    conditions.cityZip && fetch(wxQueryString, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(wx => {
      // calculate temperature at user input altitude
      const localTemp_c: number = wx.current.temp_c - (inputs.altitude / 500);
      // calculate local Mach 1 MPS accounting for temp
      const localMach1Mps: number = parseFloat(331.3 + (0.6 * localTemp_c).toFixed(1));
      // calculate local Mach 1 MPS -> FPS conversion
      const localMach1Fps: number = parseFloat((localMach1Mps * 3.28084).toFixed(1));

      setConditions({
        ...conditions,
        condition: wx.current.condition.text,
        humidity: wx.current.humidity,
        localMach1Mps: localMach1Mps,
        localMach1Fps: localMach1Fps,
        location: wx.location.name,
        pressure_in: wx.current.pressure_in,
        pressure_mb: wx.current.pressure_mb,
        temp_c: wx.current.temp_c,
        temp_f: wx.current.temp_f,
      })
    })
    .catch(err => console.error(err))
    
  }, [inputs.altitude, conditions, modalState]);


  return (
    <div className="App">

      {modalState.modalDisplay &&
      <Modal
      dismissModal={handleDismiss}
      message={modalState.modalMessage}
      blur={modalState.modalDisplay}
      />}

      <Header
        modalDisplay={modalState.modalDisplay}
      />

      <DisplayResult
        units={inputs.units}
        feetPerSecond={inputs.feetPerSecond}
        metersPerSecond={inputs.metersPerSecond}
        machNumber={inputs.machNumber}
        localMach1Fps={conditions.localMach1Fps}
        localMach1Mps={conditions.localMach1Mps}
        wxConditions={conditions.condition}
        wxHumidity={conditions.humidity}
        location={conditions.location}
        wxPressureIn={conditions.pressure_in}
        wxPressureMb={conditions.pressure_mb}
        wxTempC={conditions.temp_c}
        wxTempF={conditions.temp_f}
        blur={modalState.modalDisplay}
        />

      <InputForm
        units={inputs.units}
        handleUnits={handleUnits}
        handlePropDia={handlePropDia}
        handleAirspeed={handleAirspeed}
        handleNumericInput={handleNumericInput}
        handleZip={handleCityZip}
        calculate={calculateMachNumber}
        getConditions={getConditions}
        blur={modalState.modalDisplay}
      />

    </div>
  );

}
