import '../styles/DisplayResults.scss'


export default function DisplayResult(props: any) {

  // store imperial or metric temperature and pressure values based on current state of 'units'
  const temperature: string = (props.units === 'imperial') ? `${props.wxTempF}f` : `${props.wxTempC}c`;
  const pressure: string = (props.units === 'imperial') ? `${props.wxPressureIn}"Hg` : `${props.wxPressureMb}mb`;
  const fpsTipSpeedString: string = (props.feetPerSecond) ? `${props.feetPerSecond} ft/sec` : '(enter specs below)';
  const mpsTipSpeedString: string = (props.metersPerSecond) ? `${props.metersPerSecond} m/sec` : '(enter specs below)';
  const fpsLocalMach1String: string = (props.localMach1Fps) ? `${props.localMach1Fps} ft/sec` : '(enter location below)';
  const mpsLocalMach1String: string = (props.localMach1Mps) ? `${props.localMach1Mps} m/sec` : '(enter location below)';

  return (
    <div
      className={`outputs ${props.blur}`}
    >

      { /* display current local weather info if data has been fetched from the weather API */ }

      <div className='weather'>
        {
          (props.location) &&
            <p>City: {props.location} | Current: {props.wxConditions} | Temp: {temperature} | Humidity: {props.wxHumidity}% | Pressure: {pressure}</p>
        }
      </div>

      { /* display imperial or metric calculated value based on current state of 'units' */ }
      <div className='output-value'>
        {
          (props.machNumber)
            ? <p>Mach {props.machNumber}</p>
            : <p>Mach #</p>
        }
      </div>

      { /*
        if local mach 1 has been calculated and weather info has been fetched, display local mach 1
        if local mach 1 has not been calculated but tips speed has been calculated, display tip speed and 'enter location for local mach 1'
      */ }
      <div className='local-mach-1'>
        {
          (props.location !== '' || props.metersPerSecond !== 0) &&
            <p>{props.units === 'imperial'
              ? `Tip Speed: ${fpsTipSpeedString} | Local Mach 1: ${fpsLocalMach1String}`
              : `Tip Speed: ${mpsTipSpeedString} | Local Mach 1: ${mpsLocalMach1String}`}
            </p>
        }
      </div>

    </div>
  )

}
