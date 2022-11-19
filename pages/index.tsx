import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ErrorData, WeeklyData } from "./api/forecast";
import Pwt5caFooter from "./components/footer";
import Pwt5caHeader from "./components/header";
import Pwt5caLoading from "./components/loading";
import Day from "./components/weather/day";

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
    return Pwt5caLoading();
  }
  if (data === null) {
    return <p>No profile data</p>;
  } else if ("error" in data) {
    return <p>Error: {data.error}</p>;
  }

  return (
    <>
      <Pwt5caHeader />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
          },
        }}
      >
        <div className="d-flex">
          <div className="container">
            <h1 className="display-1 my-5 ">
              Weather for <b>{data.location}</b>
            </h1>
          </div>
        </div>

        <div className="container">
          <main>
            <section>
              <div className="row">
                {data.forecasts.map((day) => (
                  <Day key={new Date(day.date).toISOString()} {...day} />
                ))}
              </div>
            </section>
          </main>
        </div>

        <Pwt5caFooter />
      </motion.div>
    </>
  );
}
