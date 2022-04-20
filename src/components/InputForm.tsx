import '../styles/InputForm.scss'


export default function InputForm(props: any) {

  return (
    <div
      className={`input-form ${props.blur
        ? 'modal-blur'
        : 'no-blur'}`}
    >

      <form className='form' onSubmit={(e) => props.calculate(e)}>

        <div className='units'>
            <input
              id="imperial"
              type='radio'
              name='units'
              value='imperial'
              checked={props.units === 'imperial'}
              onChange={(e) => props.handleUnits(e.target.value)}
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
              checked={props.units === 'metric'}
              onChange={(e) => props.handleUnits(e.target.value)}
              >
            </input>
          <label className='unitsLabel' htmlFor='metric'>
            Metric
          </label>
        </div>

        <div className='inputs'>
          <label>Prop Dia.{props.units === 'imperial' ? ' (in)' : ' (mm)'}</label>

          <input
            className='propDia'
            placeholder='0'
            type='number'
            step='any'
            inputMode='decimal'
            onChange={(e) => props.handlePropDia(Math.round(e.target.valueAsNumber * 100) / 100 || 0)}
            >
          </input>

          <label>Batt Volts (V)</label>
          <input
            className='battV'
            type='number'
            inputMode='decimal'
            step='any'
            placeholder='0'
            onChange={(e) => props.handleNumericInput(e)}
            >
          </input>

          <label>Motor (kV)</label>
          <input
            className='motorKv'
            type='number'
            inputMode='decimal'
            step='any'
            placeholder='0'
            onChange={(e) => props.handleNumericInput(e)}
            >
          </input>

          <button type="submit" className='submit'>PROP TIP SPEED</button>
        </div>

        <div className='right-side'>
          <div className='inputs-right'>
            <label>Airspeed {props.units === 'imperial' ? '(knots)' : '(KPH)'}</label>
            <input
              id='airspeed'
              className='airspeedKnots'
              type='number'
              inputMode='decimal'
              step='any'
              placeholder='0'
              onChange={(e) => props.handleAirspeed(Math.round(e.target.valueAsNumber * 100) / 100 || 0)}
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
              onChange={(e) => props.handleNumericInput(e)}
              >
            </input>

            <label>City / Zip</label>
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
        </div>

      </form>
    </div>
  )

}
