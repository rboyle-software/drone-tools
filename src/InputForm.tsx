import './styles/InputForm.css'


export default function InputForm(props: any) {


  return (
    <div className="input-form">

      <form className='form' onSubmit={(e) => props.calculate(e)}>

        <div className='units'>UNITS:
          <label>
            <input
              type='radio'
              name='units'
              value='MPH'
              checked={props.units === 'MPH'}
              onChange={(e) => props.handleUnits(e.target.value)}
              >
            </input>
            Imperial
          </label>

          <label>
            <input
              type='radio'
              name='units'
              value='KPH'
              checked={props.units === 'KPH'}
              onChange={(e) => props.handleUnits(e.target.value)}
              >
            </input>
            Metric
          </label>
        </div>

        <div className='inputs'>

          <label>Prop Diameter {props.units === 'MPH' ? <span>(in.)</span> : <span>(mm.)</span>}</label>

          <input
            placeholder='0'
            type='number'
            step='any'
            inputMode='decimal'
            onChange={(e) => props.handlePropDia(parseInt(e.target.value))}
            >
          </input>

          <label>Battery Voltage (V)</label>
          <input
            type='number'
            inputMode='decimal'
            step='any'
            placeholder='0'
            onChange={(e) => props.handleBattV(parseInt(e.target.value))}
          >
          </input>

          <label>Motor Rating (kV)</label>
          <input
            type='number'
            inputMode='decimal'
            step='any'
            placeholder='0'
            onChange={(e) => props.handleMotorKv(parseInt(e.target.value))}
          >
          </input>

          <button type="submit" className='submit'>CALCULATE</button>
        </div>

        <div className='options'>
          <label>Zip Code
            </label>
            <input
              type='text'
              placeholder='0'
              onChange={(e) => props.handleZip(e.target.value)}
            >
            </input>

          <label>Altitude
            </label>
            <input
              type='number'
              inputMode='decimal'
              step='any'
              placeholder='0'
            >
            </input>

          <label>Airspeed
            </label>
            <input
              type='number'
              inputMode='decimal'
              step='any'
              placeholder='0'
            >
            </input>

          <button className='submit'>WEATHER</button>
        </div>

      </form>
    </div>
  )
}
