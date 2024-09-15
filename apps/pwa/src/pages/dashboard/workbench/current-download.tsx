import { Typography } from "antd";
import Card from "../../../components/card";
import useChart from "../../../components/chart/useChart";
import Chart from "../../../components/chart/chart";

export default function CurrentDownload() {
  return (
    <Card className="flex-col">
      <header className="self-start">
        <Typography.Title level={5}>Current Donations</Typography.Title>
      </header>
      <main>
        <ChartDonut />
      </main>
    </Card>
  );
}

const series = [44, 55, 13, 43];
function ChartDonut() {
  const chartOptions = useChart({
    labels: ["2020", "2021", "2022", "2023"],
    stroke: {
      show: false,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    tooltip: {
      fillSeriesColor: false,
    },
    chart: {
      width: 240,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "90%",
          labels: {
            total: {
              fontSize: "12px",
            },
            value: {
              fontSize: "18px",
              fontWeight: 700,
            },
          },
        },
      },
    },
  });

  return (
    <Chart type="donut" series={series} options={chartOptions} height={360} />
  );
}
