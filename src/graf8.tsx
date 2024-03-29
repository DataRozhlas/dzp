import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import Highcharts from "highcharts";
import {
  HighchartsProvider,
  HighchartsChart,
  Chart,
  XAxis,
  YAxis,
  LineSeries,
  Tooltip,
  Legend,
} from "react-jsx-highcharts";

import data from "./data/graf8.json";
import colors from "./data/twocolors.json";
import { Heading } from "@chakra-ui/react";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});

const Graf = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight("graf8");

  useEffect(() => {
    postHeightMessage();
  }, []);

  return (
    <div ref={containerRef}>
      <Heading as="h1" size="lg">
        Efektivní daňová kvóta
      </Heading>
      <Heading as="h2" size="sm" mb={4}>
        Zaměstnanci rozdělení podle výše příjmu domácnosti a toho, zda mají děti
      </Heading>

      <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsChart
          plotOptions={{
            series: {
              animation: false,
              dataLabels: {
                enabled: true,
                formatter: function (this) {
                  if (
                    this.point.index === 0 ||
                    this.point.index === this.series.points.length - 1
                  ) {
                    return this.point.y + " %";
                  }
                  return undefined;
                },
              },
            },
          }}
        >
          <Chart
            type="line"
            animation={false}
            style={{ fontFamily: "var(--chakra-fonts-heading)" }}
          />
          <Tooltip valueSuffix=" %" shared={true} />
          <Legend />
          <XAxis
            type="category"
            categories={[
              "Domácnosti s dětmi, příjmy pod medián",
              "Domácnosti s dětmi, příjmy nad medián",
              "Domácnosti bez dětí, příjmy pod medián",
              "Domácnosti bez dětí, nad medián",
            ]}
          />
          <YAxis>
            {data.map((serie, i) => {
              return (
                <LineSeries
                  key={serie[0]}
                  data={serie.slice(1, 6)}
                  color={colors[i]}
                  name={serie[0] as string}
                />
              );
            })}
          </YAxis>
        </HighchartsChart>
      </HighchartsProvider>
    </div>
  );
};

ReactDOM.createRoot(
  document.getElementById("chartcontainer") as HTMLElement
).render(
  <React.StrictMode>
    <ChakraProvider>
      <Graf />
    </ChakraProvider>
  </React.StrictMode>
);
