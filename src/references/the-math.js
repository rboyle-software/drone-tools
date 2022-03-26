function tipSpeedCalculator(diameter, volts, kVolts) {
    var circumferenceInches = diameter * Math.PI;
    var circumferenceMM = circumferenceInches * 25.4;
    var rpm = volts * kVolts;
    // console.log( { circumferenceInches, circumferenceMM, rpm } );
    var inchesPerMinute = circumferenceInches * rpm;
    var millimetersPerMinute = circumferenceMM * rpm;
    // console.log( { inchesPerMinute, millimetersPerMinute } );
    var feetPerMinute = inchesPerMinute / 12;
    var metersPerMinute = millimetersPerMinute / 1000;
    // console.log( { feetPerMinute, metersPerMinute } );
    var milesPerMinute = feetPerMinute / 5280;
    var kilometersPerMinute = metersPerMinute / 1000;
    // console.log( { milesPerMinute, kilometersPerMinute } );
    var milesPerHour = parseFloat((milesPerMinute * 60).toFixed(2));
    var kilometersPerHour = parseFloat((kilometersPerMinute * 60).toFixed(2));
    // console.log( { milesPerHour, kilometersPerHour } );
    return { milesPerHour: milesPerHour, kilometersPerHour: kilometersPerHour };
}
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
