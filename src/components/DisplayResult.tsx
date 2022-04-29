import { DisplayProps } from '../utilities/PropTypes';
import '../styles/DisplayResults.scss';


export default function DisplayResult ({ blur, feetPerSecond, localMach1Fps, localMach1Mps, location, machNumber, metersPerSecond, units, wxConditions, wxHumidity, wxPressureIn, wxPressureMb, wxTempC, wxTempF }: DisplayProps) {

  // store imperial or metric temperature and pressure values based on current state of 'units'
  const temperature: string = (units === 'imperial') ? `${wxTempF}f` : `${wxTempC}c`;
  const pressure: string = (units === 'imperial') ? `${wxPressureIn}"Hg` : `${wxPressureMb}mb`;
  const fpsTipSpeedString: string = (feetPerSecond) ? `${feetPerSecond} ft/sec` : '(enter specs below)';
  const mpsTipSpeedString: string = (metersPerSecond) ? `${metersPerSecond} m/sec` : '(enter specs below)';
  const fpsLocalMach1String: string = (localMach1Fps) ? `${localMach1Fps} ft/sec` : '(enter location below)';
  const mpsLocalMach1String: string = (localMach1Mps) ? `${localMach1Mps} m/sec` : '(enter location below)';

  return (
    <div
      className={`outputs ${blur}`}
    >

      { /* display current local weather info if data has been fetched from the weather API */ }

      <div className='weather'>
        {
          (location) &&
            <p>City: {location} | Current: {wxConditions} | Temp: {temperature} | Humidity: {wxHumidity}% | Pressure: {pressure}</p>
        }
      </div>

      { /* display imperial or metric calculated value based on current state of 'units' */ }
      <div className='output-value'>
        {
          (machNumber)
            ? <p>Mach {machNumber}</p>
            : <p>Mach #</p>
        }
      </div>

      { /*
        if local mach 1 has been calculated and weather info has been fetched, display local mach 1
        if local mach 1 has not been calculated but tips speed has been calculated, display tip speed and 'enter location for local mach 1'
      */ }
      <div className='local-mach-1'>
        {
          (location !== '' || metersPerSecond !== 0) &&
            <p>{units === 'imperial'
              ? `Tip Speed: ${fpsTipSpeedString} | Local Mach 1: ${fpsLocalMach1String}`
              : `Tip Speed: ${mpsTipSpeedString} | Local Mach 1: ${mpsLocalMach1String}`}
            </p>
        }
      </div>

    </div>
  )

}
