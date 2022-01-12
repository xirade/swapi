export default function Table({ vehicles }) {
  return (
    <div className="my-5 col-xl-6 col-lg-8 offset-lg-3">
      <ul className="list-group shadow">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Vehicle name with the largest sum
          <span>{vehicles.name}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Related home planets and their respective population
          {vehicles.pilot.map((pilot) => (
            <span key={pilot.planet.name}>
              {pilot.planet.name} - {pilot.planet.population}
            </span>
          ))}
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Related pilot names
          {vehicles.pilot.map((pilot) => (
            <span key={pilot.name}>{pilot.name}</span>
          ))}
        </li>
      </ul>
    </div>
  );
}
