import { useEffect, useState } from "react";
import "./App.css";
import Logo from "./assets/logo.png";
import BarChart from "./components/BarChart";
import Table from "./components/Table";

export default function App() {
  const [data, setData] = useState(null);
  const [planets, setPlanets] = useState(null);
  const getJson = (url) => {
    return fetch(url)
      .then((res) => {
        if (!res.ok) throw Error("Do not fetch data");
        return res.json();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    const planetsNames = new Set([
      "Tatooine",
      "Alderaan",
      "Naboo",
      "Bespin",
      "Endor"
    ]);
    const fetchAll = async () => {
      const resultVehicles = await getJson(
        "https://swapi.py4e.com/api/vehicles"
      ).then(
        async (json) =>
          await Promise.all(
            json.results
              .filter((vehicle) => vehicle.pilots.length)
              .map(async (vehicle) => ({
                name: vehicle.name,
                pilot: await Promise.all(
                  vehicle.pilots.map((pilot) =>
                    getJson(pilot).then(async (json) => ({
                      name: json.name,
                      planet: await getJson(json.homeworld).then((json) => ({
                        name: json.name,
                        population: json.population
                      }))
                    }))
                  )
                )
              }))
          )
      );

      const resultPlanets = await getJson(
        "https://swapi.py4e.com/api/planets"
      ).then((json) =>
        json.results.filter((result) => planetsNames.has(result.name))
      );
      setData(resultVehicles);
      setPlanets(resultPlanets);
    };

    fetchAll();
  }, []);

  const vehicleWithTotal =
    data &&
    data.map((vehicle) => {
      const reducer = (prev, curr) => prev + Number(curr.planet.population);

      vehicle.totalPopulation = vehicle.pilot.reduce(reducer, 0);
      return vehicle;
    });

  const maxNumber =
    data &&
    vehicleWithTotal.reduce((max, curr) =>
      max > curr.totalPopulation ? max : curr.totalPopulation
    );

  const maxVehicles =
    data &&
    vehicleWithTotal.filter((vehicle) => vehicle.totalPopulation === maxNumber);

  return (
    <div className="container d-flex flex-column my-3 mx-auto">
      <img width="300" className="img-fluid mx-auto" src={Logo} alt="swapi" />
      {data && <Table vehicles={maxVehicles[0]} />}
      {planets && <BarChart planets={planets} />}
    </div>
  );
}
