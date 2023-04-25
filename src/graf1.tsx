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
  BarSeries,
} from "react-jsx-highcharts";

import data from "./data/graf1.json";
import colors from "./data/colors.json";
import { Heading } from "@chakra-ui/react";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});

const Graf = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight("graf1");

  useEffect(() => {
    postHeightMessage();
  }, []);

  return (
    <div ref={containerRef}>
      <Heading as="h1" size="lg" mb={4}>
        Jak by se zvýšil výběr daní
      </Heading>
      <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsChart
          plotOptions={{
            series: {
              stacking: "normal",
              animation: false,
              states: { hover: { enabled: false } }, // disable hover
            },
          }}
        >
          <Chart
            type="column"
            animation={false}
            style={{ fontFamily: "var(--chakra-fonts-heading)" }}
          />
          <XAxis
            type="category"
            categories={data.map((item) => item[0] as string)}
          />
          <YAxis>
            <BarSeries
              name={"Navýšení při reformě"}
              data={data.map((item, index) => {
                return {
                  y: (item[2] as number) * 1000000000,
                  color: colors[index],
                };
              })}
              dataLabels={{
                enabled: true,
                formatter: function (this) {
                  if (this && this.point && this.point.y) {
                    return (
                      "+" + Math.floor(this.point.y / 1000000000) + " mld. Kč"
                    );
                  }
                  return undefined;
                },
              }}
            />
            <BarSeries
              name={"Současný výběr DPFO od zaměstnanců"}
              data={data.map((item) => (item[1] as number) * 1000000000)}
              color={"#e2e8f0"}
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
