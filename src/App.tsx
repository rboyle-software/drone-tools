import React from 'react';
import DisplayResult from './DisplayResult';
import InputForm from './InputForm';
// import env from 'react-dotenv';
import logo from './logo.png';
import './App.css';



export default function App() {


  // const [state, setState] = useState({
  //   propDia: 0,
  //   battV: 0,
  //   motorKv: 0,
  //   value: 0,
  //   units: 'MPH',
  //   zip: 0,
  //   altitude: 0,
  //   airspeed: 0,
  //   latitude: '',
  //   longitude: '',
  //   displayVal: ''
  // });


  // const calculate = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const inches: number = state.propDia;
  //   const millimeters: number = state.propDia;
  //   const volts: number = state.battV;
  //   const killavolts: number = state.motorKv;
  //   const inPerMile: number = 63360;
  //   const mmPerKm: number = 1000000;
  //   const minPerHour: number = 60;

  //   const MPH: number = parseFloat(((inches * Math.PI) * (volts * killavolts) / inPerMile * minPerHour).toFixed(2));
  //   const KPH: number = parseFloat(((millimeters * Math.PI) * (volts * killavolts) / mmPerKm * minPerHour).toFixed(2));

  //   (state.units === 'MPH') && setState({ ...state, value: MPH});
  //   (state.units === 'KPH') && setState({ ...state, value: KPH});

  // }


  return (
    <div className="App">

      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <p>PROP TIP SPEED CALC</p>

      </header>

      <DisplayResult />

      <InputForm
        // calculate={calculate}
        // state={state}
      />

    </div>

  );

}
