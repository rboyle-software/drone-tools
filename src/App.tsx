import React, { useState, useCallback } from 'react';
import DisplayResult from './DisplayResult';
import InputForm from './InputForm';
import env from 'react-dotenv';
import logo from './logo.png';
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
    valueDisplay: 0,
    valueMetric: 0,
    valueImperial: 0,
  });

  const [conditions, setConditions] = useState({
    condition: '',
    humidity: 0,
    icon: '',
    location:'',
    pressure_in: 0,
    pressure_mb: 0,
    temp_c: 0,
    temp_f: 0,
    zip: ''
  })


  const getConditions = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const wxQueryString = `https://api.weatherapi.com/v1/current.json?key=${env.WEATHER_KEY}&q=${conditions.zip}&aqi=no`;

    if (conditions.zip === '') alert('Please enter a postal code!')

    conditions.zip && fetch(wxQueryString)
    .then(res => res.json())
    .then(wx => {
      setConditions({
        ...conditions,
        condition: wx.current.condition.text,
        humidity: wx.current.humidity,
        icon: wx.current.condition.icon,
        location: wx.location.name,
        pressure_in: wx.current.pressure_in,
        pressure_mb: wx.current.pressure_mb,
        temp_c: wx.current.temp_c,
        temp_f: wx.current.temp_f,
      })
    })
    .catch(err => console.error(err))
  }, [conditions])


  const handleUnits = (units: string) => {
    setState({
      ...state,
      units: units
    });
  }

  const handlePropDia = (propDiameter: number) => {

    // TODO: update text in field when units are updated

    let propDiaIn = 0;
    let propDiaMm = 0;
    if (state.units === 'imperial') {
      propDiaIn = propDiameter;
      propDiaMm = parseFloat((propDiameter * 25.4).toFixed(0))
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

  const handleBattV = (battV: number) => {
    setState({
      ...state,
      battV: battV
    });
  }

  const handleMotorKv = (motorKv: number) => {
    setState({
      ...state,
      motorKv: motorKv
    });
  }

  const handleAirspeed = (airspeed: number) => {
    setState({
      ...state,
      airspeed: airspeed
    })
  }

  const handleAltitude = (altitude: number) => {
    setState({
      ...state,
      altitude: altitude
    })
  }

  const handleZip = (zipCode: string) => {
    setConditions({
      ...conditions,
      zip: zipCode
    })
  }


  const calculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state.propDiaIn === 0 || state.propDiaMm === 0) alert('Please enter propeller diameter!')
    else if (state.battV === 0) alert('Please enter battery voltage!')
    else if (state.motorKv === 0) alert('Please enter motor power rating!')

    const inches: number = state.propDiaIn;
    const millimeters: number = state.propDiaIn * 25.4;
    const volts: number = state.battV;
    const killavolts: number = state.motorKv;
    const inPerMile: number = 63360;
    const mmPerKm: number = 1000000;
    const minPerHour: number = 60;
    const airspeed = state.airspeed || 0;

    const MPH: number = parseFloat(((inches * Math.PI) * (volts * killavolts) / inPerMile * minPerHour).toFixed(2)) + airspeed;
    const KPH: number = parseFloat(((millimeters * Math.PI) * (volts * killavolts) / mmPerKm * minPerHour).toFixed(2)) + airspeed;
    const displayVal = (state.units === 'imperial') ? MPH : KPH;

    const localTemp_c = (state.altitude) ? conditions.temp_c - (state.altitude / 500) : conditions.temp_c;
    const localMach1Km = parseInt(((331.3 + (0.6 * localTemp_c)) / 1000 * 3600).toFixed(1));
    const localMach1Mi = parseInt((localMach1Km * 0.621371).toFixed(1));

    /*
    TODO: calculate local Mach 1 based on estimated air temp at altitude
    meters/second = 331.3 + (0.6 * {temp c})
    source: http://www.sengpielaudio.com/calculator-speedsound.htm
    */

    setState({ 
      ...state,
      airspeed: airspeed,
      valueDisplay: displayVal,
      valueImperial: MPH,
      valueMetric: KPH,
    });

    if (conditions.zip) {
      setState({
        ...state,
        localMach1Km: localMach1Km,
        localMach1Mi: localMach1Mi
      });
    }

  }


  return (
    <div className="App">

      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <p>PROP TIP SPEED CALC</p>

      </header>

      <DisplayResult
        units={state.units}
        valueImperial={state.valueImperial}
        valueMetric={state.valueMetric}
        location={conditions.location}
        mach1Km={state.localMach1Km}
        mach1Mi={state.localMach1Mi}
        wxConditions={conditions.condition}
        wxTempC={conditions.temp_c}
        wxTempF={conditions.temp_f}
        wxHumidity={conditions.humidity}
        wxPressureMb={conditions.pressure_mb}
        wxPressureIn={conditions.pressure_in}
        />

      <InputForm
        units={state.units}
        handleUnits={handleUnits}
        handlePropDia={handlePropDia}
        handleBattV={handleBattV}
        handleMotorKv={handleMotorKv}
        handleAirspeed={handleAirspeed}
        handleAltitude={handleAltitude}
        handleZip={handleZip}
        calculate={calculate}
        getConditions={getConditions}
      />

    </div>

  );

}
