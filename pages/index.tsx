import { useEffect, useState } from "react";
import { ErrorData, WeeklyData } from "./api/forecast";
import Pwt5caFooter from "./components/footer";
import Pwt5caHeader from "./components/header";

export default function Home() {
  const [data, setData] = useState<WeeklyData | ErrorData | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/forecast?lat=37.2287&lon=-80.4104")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (data === null) {
    return <p>No profile data</p>;
  } else if ("error" in data) {
    return <p>Error: {data.error}</p>;
  }

  return (
    <div className="container">
      <Pwt5caHeader />

      <main>
        <section>
          <h1 className="display-1">
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          {data.forecasts.map((day) => (
            <div key={new Date(day.date).toISOString()}>
              <h2>{new Date(day.date).toDateString()}</h2>
              {day.periods.map((period) => (
                <div key={new Date(period.startTime).toDateString()}>
                  <h3>{period.name}</h3>
                  <img
                    src={period.icon}
                    alt={period.name}
                    width={50}
                    height={50}
                  />
                  <p>{period.text}</p>
                </div>
              ))}
            </div>
          ))}
        </section>
      </main>

      <Pwt5caFooter />
    </div>
  );
}
