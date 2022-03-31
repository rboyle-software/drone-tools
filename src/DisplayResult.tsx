import './styles/DisplayResults.css'


export default function DisplayResult(props: any) {

  // store imperial or metric temperature and pressure values based on current state of 'units'
  const temperature: string = (props.units === 'imperial') ? `${props.wxTempF}f` : `${props.wxTempC}c`;
  const pressure: string = (props.units === 'imperial') ? `${props.wxPressureIn}"Hg` : `${props.wxPressureMb}mb`;


  return (
    <div className={`outputs ${props.blur && 'modal-blur'}`}>

      { /* display current local weather info if data has been fetched from the weather API */ }
      {(props.location) &&
      <div className='weather'>
        <span>City: {props.location} | </span>
        <span>Current: {props.wxConditions} | </span>
        <span>Temp: {temperature} | </span>
        <span>Humidity: {props.wxHumidity}% | </span>
        <span>Pressure: {pressure}</span>
      </div>}

      { /* display imperial or metric calculated value based on current state of 'units' */ }
      <div className='output-value'>
        {props.units === 'imperial'
          ? <span>{props.valueImperial} MPH</span>
          : <span>{props.valueMetric} KPH</span>}
      </div>

      { /* if local mach 1 has been calculated and weather info has been fetched, display local mach 1 */ }
      {(props.mach1Km !== 0 && props.location) &&
      <div className='local-mach-1'>
        {props.units === 'imperial'
          ? <span>Local Mach 1: {props.mach1Mi}MPH</span>
          : <span>Local Mach 1: {props.mach1Km}KPH</span>}
      </div>}

    </div>
  )

}
