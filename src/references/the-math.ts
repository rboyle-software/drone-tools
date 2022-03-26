function tipSpeedCalculator(diameter: number, volts: number, kVolts: number) {

    const circumferenceInches: number = diameter * Math.PI;
    const circumferenceMM: number = circumferenceInches * 25.4;
    const rpm: number = volts * kVolts;
    // console.log( { circumferenceInches, circumferenceMM, rpm } );

    const inchesPerMinute: number = circumferenceInches * rpm;
    const millimetersPerMinute: number = circumferenceMM * rpm;
    // console.log( { inchesPerMinute, millimetersPerMinute } );

    const feetPerMinute: number = inchesPerMinute / 12;
    const metersPerMinute: number = millimetersPerMinute / 1000;
    // console.log( { feetPerMinute, metersPerMinute } );

    const milesPerMinute: number = feetPerMinute / 5280;
    const kilometersPerMinute: number = metersPerMinute / 1000;
    // console.log( { milesPerMinute, kilometersPerMinute } );

    const milesPerHour: number = parseFloat((milesPerMinute * 60).toFixed(2));
    const kilometersPerHour: number = parseFloat((kilometersPerMinute * 60).toFixed(2));
    // console.log( { milesPerHour, kilometersPerHour } );

    return {milesPerHour, kilometersPerHour};
}


/*
  RPM = V * kV
  circIn = dia * PI
  inPerMin = RPM * circIn
  miPerMin = inPerMin / 63360
  MPH = miPerMin / 60

  */


console.log(tipSpeedCalculator(6, 22.2, 2400));
/*
  milesPerHour: 951.0457760412737
  kilometersPerHour: 1530.5598133973676
*/
console.log(tipSpeedCalculator(5, 25, 1800));
/*
  milesPerHour: 669.3734347137342
  kilometersPerHour: 1077.25212091594
*/

export {}