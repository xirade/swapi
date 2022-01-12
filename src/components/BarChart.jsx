export default function BarChart({ planets }) {
  // Random color
  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  // Width of each bar
  const itemWidth = 70;

  // Distance between each bar
  const itemMargin = 30;

  const dataLength = planets.length;

  // Normalize data, we'll reduce all sizes to 25% of their original value
  const normalizedData = planets.map((planet) => ({
    ...planet,
    barHeight: Math.log(planet.population) * 20,
    color: getRandomColor()
  }));

  const maxData = normalizedData.reduce((acc, cur) => {
    const { barHeight } = cur;
    return barHeight > acc ? barHeight : acc;
  }, 0);

  const chartHeight = maxData;
  return (
    <div className="card col-xl-6 col-lg-8 offset-lg-3 px-2 py-5 shadow">
      <svg
        className="mx-auto"
        viewBox={`0 0 ${dataLength * (itemWidth + itemMargin)} ${chartHeight}`}
        width={dataLength * (itemWidth + itemMargin)}
        height={600}
      >
        {normalizedData.map((chart, index) => {
          const itemHeight = chart.barHeight;
          return (
            <g key={chart.name}>
              <>
                <rect
                  x={index * (itemWidth + itemMargin)}
                  y={chartHeight - itemHeight - 30}
                  width={itemWidth}
                  height={chart.barHeight}
                  style={{ fill: chart.color }}
                />
                <text
                  x={index * (itemWidth + itemMargin)}
                  y={-(itemHeight - chartHeight) - 40}
                  fontSize="15"
                >
                  {chart.population}
                </text>
                <text
                  x={index * (itemWidth + itemMargin)}
                  y="440"
                  fontSize="18"
                >
                  {chart.name}
                </text>
              </>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
