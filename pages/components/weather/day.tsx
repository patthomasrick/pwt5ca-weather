import { format } from "date-fns";
import { DailyData } from "../../api/forecast";

export default function Day(day: DailyData) {
  return (
    <div className="col-3 pb-3">
      <div
        className="card"
        style={{
          // Two backgrounds, one for the image and one for the fade.
          background: `linear-gradient(60deg, #fff, rgba(255, 255, 255, 200), rgba(255, 255, 255, 0)), url(${day.periods[0].icon}) no-repeat center / cover`,
        }}
      >
        <div className="card-body">
          <h4 className="card-title">{format(new Date(day.date), "E do")}</h4>
          <p className="card-text">
            {day.periods.map((period) => (
              <div key={period.name}>
                <strong>{period.name}</strong>
                <br />
                {period.text}
              </div>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
