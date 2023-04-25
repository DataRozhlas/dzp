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

import data from "./data/graf3.json";
import colors from "./data/colors.json";
import { Heading } from "@chakra-ui/react";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});

const Graf = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight("graf3");

  useEffect(() => {
    postHeightMessage();
  }, []);

  return (
    <div ref={containerRef}>
      <Heading as="h1" size="lg">
        Efektivní sazba daní a odvodů (daňová progrese)
      </Heading>
      <Heading as="h2" size="sm" mb={4}>
        Kolik procent z hrubé mzdy by zaplatili zaměstnavatelé a zaměstnanci
        rozdělení do pěti stejně velkých skupin podle výše příjmu
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
          <Tooltip valueSuffix=" %" />
          <Legend />
          <XAxis
            type="category"
            categories={[
              "1. pětina<br>nejnižší příjmy",
              "2. pětina",
              "3. pětina",
              "4. pětina",
              "5. pětinn<br>nejvyšší příjmy",
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
