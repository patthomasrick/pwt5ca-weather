export interface Forecast {
  success?: boolean;
  message?: string;
  operationalMode: string;
  srsName: string;
  creationDate: Date;
  creationDateLocal: string;
  productionCenter: string;
  credit: string;
  moreInformation: string;
  location: Location;
  time: Time;
  data: ForecastData;
  currentobservation: CurrentObservation;
}

export interface CurrentObservation {
  id: string;
  name: string;
  elev: string;
  latitude: string;
  longitude: string;
  Date: string;
  Temp: string;
  Dewp: string;
  Relh: string;
  Winds: string;
  Windd: string;
  Gust: string;
  Weather: string;
  Weatherimage: string;
  Visibility: string;
  Altimeter: string;
  SLP: string;
  timezone: string;
  state: string;
  WindChill: string;
}

export interface ForecastData {
  temperature: string[];
  pop: Array<null | string>;
  weather: string[];
  iconLink: string[];
  hazard: any[];
  hazardUrl: any[];
  text: string[];
}

export interface Location {
  region: string;
  latitude: string;
  longitude: string;
  elevation: string;
  wfo: string;
  timezone: string;
  areaDescription: string;
  radar: string;
  zone: string;
  county: string;
  firezone: string;
  metar: string;
}

export interface Time {
  layoutKey: string;
  startPeriodName: string[];
  startValidTime: Date[];
  tempLabel: TempLabel[];
}

export enum TempLabel {
  High = "High",
  Low = "Low",
}
