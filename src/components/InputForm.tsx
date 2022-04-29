import { InputProps } from '../utilities/PropTypes';
import '../styles/InputForm.scss'


export default function InputForm({ calculate, getConditions, handleAirspeed, handleCityZip, handleNumericInput, handlePropDia, handleUnits, blur, units }: InputProps) {

  return (
    <div
      className={`input-form ${blur}`}
    >

      <form className='form' onSubmit={(e) => calculate(e)}>

        <div className='units'>
            <input
              id="imperial"
              type='radio'
              name='units'
              value='imperial'
              checked={units === 'imperial'}
              onChange={(e) => handleUnits(e.target.value)}
              >
            </input>
          <label className='unitsLabel' htmlFor='imperial'>
            Imperial
          </label>

            <input
              id="metric"
              type='radio'
              name='units'
              value='metric'
              checked={units === 'metric'}
              onChange={(e) => handleUnits(e.target.value)}
              >
            </input>
          <label className='unitsLabel' htmlFor='metric'>
            Metric
          </label>
        </div>

        <div className='inputs'>
          <label>Prop Dia.{units === 'imperial' ? ' (in)' : ' (mm)'}</label>

          <input
            className='propDia'
            placeholder='0'
            type='number'
            step='any'
            inputMode='decimal'
            onChange={(e) => handlePropDia(Math.round(e.target.valueAsNumber * 100) / 100 || 0)}
            >
          </input>

          <label>Batt Volts (V)</label>
          <input
            className='battV'
            type='number'
            inputMode='decimal'
            step='any'
            placeholder='0'
            onChange={(e) => handleNumericInput(e)}
            >
          </input>

          <label>Motor (kV)</label>
          <input
            className='motorKv'
            type='number'
            inputMode='decimal'
            step='any'
            placeholder='0'
            onChange={(e) => handleNumericInput(e)}
            >
          </input>

          <button type="submit" className='button'>PROP TIP SPEED</button>
        </div>

        <div className='right-side'>
          <div className='inputs-right'>
            <label>Airspeed {units === 'imperial' ? '(knots)' : '(KPH)'}</label>
            <input
              id='airspeed'
              className='airspeedKnots'
              type='number'
              inputMode='decimal'
              step='any'
              placeholder='0'
              onChange={(e) => handleAirspeed(Math.round(e.target.valueAsNumber * 100) / 100 || 0)}
              >
            </input>
          </div>

          <div className='options'>
            <label>Altitude (ft)</label>
            <input
              className='altitude'
              type='number'
              inputMode='decimal'
              step='any'
              placeholder='0'
              onChange={(e) => handleNumericInput(e)}
              >
            </input>

            <label>City / Zip</label>
            <input
              type='text'
              placeholder='0'
              onChange={(e) => handleCityZip(e.target.value)}
              >
            </input>

            <button className='button' onClick={(e) => getConditions(e)}>
            WEATHER
            </button>
          </div>
        </div>

      </form>
    </div>
  )

}
