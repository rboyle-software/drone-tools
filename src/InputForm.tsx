import './styles/InputForm.css'


export default function InputForm(props: any) {


  return (
    <div className="input-form">

      <form className='form' onSubmit={(e) => props.calculate(e)}>

        <div className='units'>Units:
          <label>
            <input
              type='radio'
              name='units'
              value='imperial'
              checked={props.units === 'imperial'}
              onChange={(e) => props.handleUnits(e.target.value)}
              >
            </input>
            MPH
          </label>

          <label>
            <input
              type='radio'
              name='units'
              value='metric'
              checked={props.units === 'metric'}
              onChange={(e) => props.handleUnits(e.target.value)}
              >
            </input>
            KPH
          </label>
        </div>

        <div className='inputs'>

          <label>Prop Dia.{props.units === 'imperial' ? ' (in)' : ' (mm)'}</label>

          <input
            placeholder='0'
            type='number'
            step='any'
            inputMode='decimal'
            onChange={(e) => props.handlePropDia(Math.round(e.target.valueAsNumber * 100) / 100 || 0)}
            >
          </input>

          <label>Batt Volts (V)</label>
          <input
            type='number'
            inputMode='decimal'
            step='any'
            placeholder='0'
            onChange={(e) => props.handleBattV(Math.round(e.target.valueAsNumber * 100) / 100 || 0)}
            >
          </input>

          <label>Motor (kV)</label>
          <input
            type='number'
            inputMode='decimal'
            step='any'
            placeholder='0'
            onChange={(e) => props.handleMotorKv(Math.round(e.target.valueAsNumber * 100) / 100 || 0)}
            >
          </input>

          <button type="submit" className='submit'>CALCULATE</button>
        </div>

        <div className='options'>
          <label>Airspeed</label>
          <input
            type='number'
            inputMode='decimal'
            step='any'
            placeholder='0'
            onChange={(e) => props.handleAirspeed(Math.round(e.target.valueAsNumber * 100) / 100 || 0)}
            >
          </input>

          <label>Altitude</label>
          <input
            type='number'
            inputMode='decimal'
            step='any'
            placeholder='0'
            onChange={(e) => props.handleAltitude(Math.round(e.target.valueAsNumber * 100) / 100 || 0)}
            >
          </input>

          <label>Zip Code</label>
          <input
            type='text'
            placeholder='0'
            onChange={(e) => props.handleZip(e.target.value)}
            >
          </input>

          <button className='submit' onClick={(e) => props.getConditions(e)}>
          WEATHER
          </button>
        </div>

      </form>
    </div>
  )
}
