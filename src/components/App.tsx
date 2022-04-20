import React, { useState, useCallback } from 'react';
import DisplayResult from './DisplayResult';
import InputForm from './InputForm';
import Header from './Header';
import Modal from './Modal';
import '../styles/App.scss';


export default function App() {

  const [inputs, setInputs] = useState({
    airspeed: 0,
    altitude: 0,
    battV: 0,
    feetPerSecond: 0,
    machNumber: 0,
    metersPerSecond: 0,
    motorKv: 0,
    propDiaIn: 0,
    propDiaMm: 0,
    units: 'imperial',
    valueMetric: 0,
    valueImperial: 0
  });


  const [conditions, setConditions] = useState({
    cityZip: '',
    condition: '',
    humidity: 0,
    localMach1Km: 0,
    localMach1Mi: 0,
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


  const handleUnits = (units: string) => {

    // select the propDia numeric input element
    const propDiameter: HTMLInputElement | null = document.querySelector('.propDia');

    // update the value in propDia input when units radio value changes
    if (propDiameter && (inputs.propDiaIn || inputs.propDiaMm)) {
      propDiameter.valueAsNumber = (units === 'imperial')
      ? inputs.propDiaIn
      : inputs.propDiaMm;
    }

    // update units in state
    setInputs({
      ...inputs,
      units: units
    });
  }


  const handlePropDia = (propDiameter: number) => {
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


  const calculate = useCallback((e: React.FormEvent<HTMLFormElement>) => {
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

    // validation rules / alert modals
    if (!inputs.propDiaIn || !inputs.propDiaMm) {
      setModalState({
        ...modalState, modalDisplay: true, modalMessage: 'Please enter propeller diameter!'
      });
      return;
    }
    else if (!inputs.battV) {
      setModalState({
        ...modalState, modalDisplay: true, modalMessage: 'Please enter battery voltage!'
      });
      return;
    }
    else if (!inputs.motorKv) {
      setModalState({
        ...modalState, modalDisplay: true, modalMessage: 'Please enter motor power rating!'
      });
      return;
    }

    // initialize values for calculations
    const inches: number = inputs.propDiaIn;
    const millimeters: number = inputs.propDiaMm;
    const volts: number = inputs.battV;
    const kilovolts: number = inputs.motorKv;
    const inPerMile: number = 63360;
    const mmPerKm: number = 1e6;
    const minPerHour: number = 60;

    // initialize variables to calculated prop tip speeds
    const MPH: number = parseFloat(((inches * Math.PI) * (volts * kilovolts) / inPerMile * minPerHour).toFixed(1)) + inputs.airspeed;
    const KPH: number = parseFloat(((millimeters * Math.PI) * (volts * kilovolts) / mmPerKm * minPerHour).toFixed(1)) + inputs.airspeed;
    const feetPerSecond: number = parseFloat(((((inches * Math.PI) * (volts * kilovolts)) / 12) / 60).toFixed(2)) + inputs.airspeed;
    const metersPerSecond: number = parseFloat(((((millimeters * Math.PI) * (volts * kilovolts)) / 1000) / 60).toFixed(2)) + inputs.airspeed;
    const machNumber: number = (conditions.localMach1Km) ? parseFloat((KPH / conditions.localMach1Km).toFixed(2)) : 0;

    /*
      TODO: airspeed in knots or kph / tip speed in fps or mps
      add knots to FPS and add KPH to MPS
      state variables: knots, fps, mps
    */

    setInputs({
      ...inputs,
      feetPerSecond: feetPerSecond,
      machNumber: machNumber,
      metersPerSecond: metersPerSecond,
      valueImperial: MPH,
      valueMetric: KPH
    });

  }, [inputs, modalState, conditions.localMach1Km]);


  const getConditions = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    // call to weatherapi.com to get local weather conditions
    // build query string using api key and user input zip code

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
    // const wxQueryString: string = `https://dronetools.dev/.netlify/functions/fetch-weather?cityZip=${conditions.cityZip}`;
    const wxQueryString: string = `http://localhost:8888/.netlify/functions/fetch-weather?cityZip=${conditions.cityZip}`;

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
      // calculate local Mach 1 KPH using metric values
      const localMach1Km: number = parseFloat(((331.3 + (0.6 * localTemp_c)) / 1e3 * 3600).toFixed(1));
      // calculate local Mach 1 KPH -> MPH conversion
      const localMach1Mi: number = parseFloat((localMach1Km * 0.621371).toFixed(1));

      setConditions({
        ...conditions,
        condition: wx.current.condition.text,
        humidity: wx.current.humidity,
        localMach1Km: localMach1Km,
        localMach1Mi: localMach1Mi,
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
        localMach1Mi={conditions.localMach1Mi}
        localMach1Km={conditions.localMach1Km}
        valueImperial={inputs.valueImperial}
        valueMetric={inputs.valueMetric}
        machNumber={inputs.machNumber}
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
        handleNumericInput={handleNumericInput}
        handleZip={handleCityZip}
        calculate={calculate}
        getConditions={getConditions}
        blur={modalState.modalDisplay}
      />

    </div>
  );

}
