// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Forecast } from "../../library/types/forecast";

/**
 * Error data returned from the API.
 */
export type ErrorData = {
  /**
   * Error message.
   */
  error: string;
};

/**
 * Forecast data for a week returned from the API.
 */
export type WeeklyData = {
  /**
   * Location for the forecast.
   */
  location: string;

  /**
   * Longitude for the forecast.
   */
  latitude: number;

  /**
   * Latitude for the forecast.
   */
  longitude: number;

  /**
   * Forecast weather data per day.
   */
  forecasts: DailyData[];
};

export type DailyData = {
  date: Date;
  periods: PeriodData[];
};

export type PeriodData = {
  name: string;
  startTime: Date;
  tempLow: number;
  tempHigh: number;
  precipitation: number;
  weather: string;
  icon: string;
  hazard: string | null;
  hazardUrl: string | null;
  text: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeeklyData | ErrorData>
) {
  // Make sure lat and lon are provided.
  if (!req.query.lat || !req.query.lon) {
    res.status(400).json({ error: "Missing lat or lon query parameter" });
    return;
  }

  const url = `https://forecast.weather.gov/MapClick.php?lat=${req.query.lat}&lon=${req.query.lon}&unit=0&lg=english&FcstType=json`;

  // fetch the data from the weather.gov api
  let weather_response = await fetch(url);
  let weather_data: Forecast = await weather_response.json();
  // See https://forecast.weather.gov/MapClick.php?lat=37.2287&lon=-80.4104&unit=0&lg=english&FcstType=json

  // Check for errors.
  if (weather_data.success === false) {
    res.status(500).json({ error: weather_data.message ?? "Unknown error" });
    return;
  }

  // Parse the data into a more usable format.
  let forecast: WeeklyData = {
    location: weather_data.location.areaDescription,
    latitude: parseFloat(weather_data.location.latitude),
    longitude: parseFloat(weather_data.location.longitude),
    forecasts: [],
  };

  let periods: PeriodData[] = [];
  for (let i = 0; i < weather_data.time.startPeriodName.length; i++) {
    periods.push({
      name: weather_data.time.startPeriodName[i],
      startTime: new Date(weather_data.time.startValidTime[i]),
      tempLow: parseInt(weather_data.data.temperature[i / 2]),
      tempHigh: parseInt(weather_data.data.temperature[i / 2 + 1]),
      precipitation: parseInt(weather_data.data.pop[i] ?? "0"),
      weather: weather_data.data.weather[i],
      icon: weather_data.data.iconLink[i],
      hazard: weather_data.data.hazard[i] ?? null,
      hazardUrl: weather_data.data.hazardUrl[i] ?? null,
      text: weather_data.data.text[i],
    });
  }

  // Group the periods into days.
  let current: PeriodData[] = [];
  for (let i = 0; i < periods.length; i++) {
    let date = new Date(periods[i].startTime);
    date.setHours(0, 0, 0, 0);

    if (current.length === 0) {
      current.push(periods[i]);
    } else {
      let prev_date = new Date(periods[i - 1].startTime);
      prev_date.setHours(0, 0, 0, 0);

      if (date.getTime() === prev_date.getTime()) {
        current.push(periods[i]);
      } else {
        forecast.forecasts.push({ date: prev_date, periods: current });
        current = [periods[i]];
      }
    }
  }

  // Add the last day.
  if (current.length > 0) {
    let date = new Date(current[0].startTime);
    date.setHours(0, 0, 0, 0);
    forecast.forecasts.push({ date: date, periods: current });
  }

  res.status(200).json(forecast);
}
