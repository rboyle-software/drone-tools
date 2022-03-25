import React, { useState } from 'react';
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
    latitude: 0,
    localMach1: 0,
    locationName:'',
    longitude: 0,
    motorKv: 0,
    propDiaIn: 0,
    propDiaMm: 0,
    units: 'MPH',
    valueDisplay: 0,
    valueMetric: 0,
    valueImperial: 0,
    wxConditions: '',
    wxHumidity: 0,
    wxPressure: 0,
    wxTemperature: 0,
    zip: '',
  });

  console.log('STATE', state.zip);

  const getLocation = () => {
    const zipQuery = `https://api.openweathermap.org/geo/1.0/zip?zip=${state.zip},US&appid=${env.WEATHER_KEY}`;

    state.zip && fetch(zipQuery)
    .then(res => res.json())
    .then(location => {
      setState({
        ...state,
        latitude: location.lat,
        locationName: location.name,
        longitude: location.lon
      })
    })
  }

  const getWeather = () => {
    const wxQuery = `https://api.openweathermap.org/data/2.5/weather?lat=${state.latitude}&lon=${state.longitude}&appid=${env.WEATHER_KEY}&units=metric`;

    state.latitude && fetch(wxQuery)
    .then(res => res.json())
    .then(wx => {
      setState({
        ...state,
        wxConditions: wx.weather[0].main,
        wxHumidity: wx.main.humidity,
        wxPressure: wx.main.pressure,
        wxTemperature: wx.main.temp
      })
    })
  }


  const handleUnits = (units: string) => {
    console.log(units);
    setState({
      ...state,
      units: units
    });
  }

  const handlePropDia = (propDiameter: number) => {
    let propDiaIn = 0;
    let propDiaMm = 0;
    if (state.units === 'MPH') {
      propDiaIn = propDiameter;
      propDiaMm = parseFloat((propDiameter * 25.4).toFixed(0))
    }
    if (state.units === 'KPH') {
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

  const handleZip = (zipCode: string) => {
    setState({
      ...state,
      zip: zipCode
    })
  }


  const calculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inches: number = state.propDiaIn;
    const millimeters: number = state.propDiaIn * 25.4;
    const volts: number = state.battV;
    const killavolts: number = state.motorKv;
    const inPerMile: number = 63360;
    const mmPerKm: number = 1000000;
    const minPerHour: number = 60;

    const MPH: number = parseFloat(((inches * Math.PI) * (volts * killavolts) / inPerMile * minPerHour).toFixed(2));
    const KPH: number = parseFloat(((millimeters * Math.PI) * (volts * killavolts) / mmPerKm * minPerHour).toFixed(2));
    const displayVal = (state.units === 'MPH') ? MPH : KPH;

    setState({ ...state, valueDisplay: displayVal, valueImperial: MPH, valueMetric: KPH });

    console.log('CALCULATE', state);

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
        locationName={state.locationName}
        wxConditions={state.wxConditions}
        wxTemp={state.wxTemperature}
        wxHumidity={state.wxHumidity}
        wxPressure={state.wxPressure}
        />

      <InputForm
        units={state.units}
        handleUnits={handleUnits}
        handlePropDia={handlePropDia}
        handleBattV={handleBattV}
        handleMotorKv={handleMotorKv}
        handleZip={handleZip}
        calculate={calculate}
      />

      <div>
        <button onClick={() => getLocation()}>
          GET LOCATION
        </button>
        <button onClick={() => getWeather()}>
          GET WEATHER
        </button>
      </div>

    </div>

  );

}
