import './styles/DisplayResults.scss'


export default function DisplayResult(props: any) {

  // store imperial or metric temperature and pressure values based on current state of 'units'
  const temperature: string = (props.units === 'imperial') ? `${props.wxTempF}f` : `${props.wxTempC}c`;
  const pressure: string = (props.units === 'imperial') ? `${props.wxPressureIn}"Hg` : `${props.wxPressureMb}mb`;


  return (
    <div
      className={`outputs ${props.blur
        ? 'modal-blur'
        : 'no-blur'}`}
    >

      { /* display current local weather info if data has been fetched from the weather API */ }
      <div className='weather'>
        {(props.location) &&
          <p>City: {props.location} | Current: {props.wxConditions} | Temp: {temperature} | Humidity: {props.wxHumidity}% | Pressure: {pressure}</p>
        }
      </div>

      { /* display imperial or metric calculated value based on current state of 'units' */ }
      <div className='output-value'>
        {props.units === 'imperial'
          ? <p>{props.valueImperial} MPH</p>
          : <p>{props.valueMetric} KPH</p>}
      </div>

      { /* if local mach 1 has been calculated and weather info has been fetched, display local mach 1 */ }
      <div className='local-mach-1'>
        {(props.mach1Km !== 0 && props.location) &&
          <p>{props.units === 'imperial'
            ? `Local Mach 1: ${props.mach1Mi}MPH`
            : `Local Mach 1: ${props.mach1Km}KPH`}
          </p>
        }
      </div>

    </div>
  )

}
