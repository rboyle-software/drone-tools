
export type ModalProps = {
  fade: string
  message: string,
  dismissModal: any,
};

export type HeaderProps = {
  blur: string
};

export type DisplayProps = {
  blur: string,
  feetPerSecond: number,
  localMach1Fps: number,
  localMach1Mps: number,
  location: string,
  machNumber: number,
  metersPerSecond: number,
  units: string,
  wxConditions: string,
  wxHumidity: number,
  wxPressureIn: number,
  wxPressureMb: number,
  wxTempC: number,
  wxTempF: number,
};

export type InputProps = {
  blur: string,
  calculate: any,
  getConditions: any
  handleAirspeed: any,
  handleCityZip: any,
  handleNumericInput: any,
  handlePropDia: any,
  handleUnits: any,
  units: string,
};
