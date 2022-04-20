


export const calculate = (inches: number, millimeters: number, volts: number, kilovolts: number, airspeedKnots: number, airspeedKph: number, localMach1Mps: number) => {

  const feetPerSecond: number = parseFloat((((((inches * Math.PI) * (volts * kilovolts)) / 12) / 60) + (airspeedKnots * 1.68781)).toFixed(2));

  const metersPerSecond: number = parseFloat((((((millimeters * Math.PI) * (volts * kilovolts)) / 1000) / 60) + (airspeedKph * 0.277778)).toFixed(2));

  const machNumber: number = (localMach1Mps) ? parseFloat((metersPerSecond / localMach1Mps).toFixed(2)) : 0;

  return { feetPerSecond, machNumber, metersPerSecond };
}