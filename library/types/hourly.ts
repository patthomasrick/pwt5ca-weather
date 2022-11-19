export interface Hourly {
  operationalMode: string;
  srsName: string;
  creationDate: Date;
  productionCenter: string;
  credit: string;
  moreInformation: string;
  location: Location;
  /** Map from period name, like "ThisAfternoon" or "Tuesday", to the period index. */
  PeriodNumberList: { [key: string]: number };

  /** Map from period index to period name, like "Tuesday" or "ThisAfternoon". */
  PeriodNameList: { [key: string]: string };

  /** All periods are defined in the PeriodNumberList and PeriodNameList, and
   * those names are keys corresponding to days. */
  [key: string]:
    | Day
    | Location
    | string
    | Date
    | { [key: string]: number }
    | { [key: string]: string };
}

export interface Day {
  periodName: string;
  time: string[];
  unixtime: string[];
  windChill: string[];
  windSpeed: string[];
  cloudAmount: string[];
  pop: string[];
  relativeHumidity: string[];
  windGust: string[];
  temperature: string[];
  windDirectionCardinal: string[];
  windDirection: string[];
  iconLink: string[];
  weather: string[];
}

export interface Location {
  latitude: string;
  longitude: string;
  elevation: string;
  locationType: string;
  areaDescription: string;
  "city-state": string;
}
