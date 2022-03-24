import React, { useState } from 'react';


export default function InputForm(props: any) {


  const [propDia, setPropDia] = useState('0');
  const [battV, setBattV] = useState('0');
  const [motorKv, setMotorKv] = useState('0');
  const [units, setUnits] = useState('MPH');
  const [value, setValue] = useState(0);


  const calculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inches: number = parseInt(propDia);
    const millimeters: number = parseInt(propDia);
    const volts: number = parseInt(battV);
    const killavolts: number = parseInt(motorKv);
    const inPerMile: number = 63360;
    const mmPerKm: number = 1000000;
    const minPerHour: number = 60;

    const MPH: number = parseFloat(((inches * Math.PI) * (volts * killavolts) / inPerMile * minPerHour).toFixed(2));
    const KPH: number = parseFloat(((millimeters * Math.PI) * (volts * killavolts) / mmPerKm * minPerHour).toFixed(2));

    (units === 'MPH') && setValue(MPH);
    (units === 'KPH') && setValue(KPH);

  }


  return (
    <div className="input-form">

      <div className='value'>
        {value} {units}
      </div>

      <form className='form' onSubmit={(e) => calculate(e)}>

        <div className='units'>UNITS:
          <label>
          <input
            type='radio'
            name='units'
            value='MPH'
            checked={units === 'MPH'}
            onChange={(e) => setUnits(e.target.value)}
            >
          </input>
          MPH</label>

          <label>
          <input
            type='radio'
            name='units'
            value='KPH'
            checked={units === 'KPH'}
            onChange={(e) => setUnits(e.target.value)}
            >
          </input>
          KPH</label>
        </div>

        <label>Prop Diameter (in / mm)</label>
        <input
          placeholder='0'
          type='number'
          step='any'
          inputMode='decimal'
          onChange={(e) => setPropDia(e.target.value)}
        >
        </input>

        <label>Battery Voltage (V)</label>
        <input
          type='number'
          inputMode='decimal'
          step='any'
          placeholder='0'
          onChange={(e) => setBattV(e.target.value)}
        >
        </input>

        <label>Motor Rating (kV)</label>
        <input
          type='number'
          inputMode='decimal'
          step='any'
          placeholder='0'
          onChange={(e) => setMotorKv(e.target.value)}
        >
        </input>

        <button type="submit" className='submit'>CALCULATE</button>

      </form>
    </div>
  )
}
