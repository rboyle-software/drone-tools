import './styles/DisplayResults.css'


export default function DisplayResult(props: any) {


  return (
    <div className='outputs'>

      {props.locationName && <div className='weather'>
        <span>City: {props.locationName} | </span>
        <span>Conditions: {props.wxConditions} | </span>
        <span>Temp: {props.wxTemp}c | </span>
        <span>Humidity: {props.wxHumidity}% | </span>
        <span>Pressure: {props.wxPressure} hPa</span>
      </div>}

      <div className='output-value'>
        {props.units === 'MPH' && <span>{props.valueImperial}</span>}
        {props.units === 'KPH' && <span>{props.valueMetric}</span>}
        <span> {props.units}</span>
      </div>

    </div>
  )
}
