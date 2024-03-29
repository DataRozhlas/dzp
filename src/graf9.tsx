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
  ColumnSeries,
  Tooltip,
  Legend,
} from "react-jsx-highcharts";

import data from "./data/graf9.json";
import colors from "./data/twocolors.json";
import { Heading } from "@chakra-ui/react";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});

const Graf = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight("graf9");

  useEffect(() => {
    postHeightMessage();
  }, []);

  return (
    <div ref={containerRef}>
      <Heading as="h1" size="lg">
        Navýšení výběru daní a odvodů
      </Heading>
      <Heading as="h2" size="sm" mb={4}>
        Od zaměstnanců rozdělených na pětiny podle výše hrubé mzdy
      </Heading>

      <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsChart
          plotOptions={{
            series: {
              animation: false,
              dataLabels: {
                enabled: true,
                formatter: function (this) {
                  if (this.point.y) {
                    return `+ ${(this.point.y / 1000000000).toLocaleString(
                      "cs-CZ"
                    )}
                       mld.`;
                  }
                  return;
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
          <Tooltip valueSuffix=" Kč" />
          <Legend />
          <XAxis
            type="category"
            categories={[
              "1. pětina<br>nejnižší příjmy",
              "2. pětina",
              "3. pětina",
              "4. pětina",
              "5. pětina<br>nejvyšší příjmy",
            ]}
          />
          <YAxis>
            <ColumnSeries
              data={data}
              color={colors[1]}
              name="Celkové odvody za zaměstnance i zaměstnavatele"
            />
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
