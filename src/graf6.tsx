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
} from "react-jsx-highcharts";

import data from "./data/graf6.json";
import colors from "./data/colors.json";
import { Heading, Stack, Center } from "@chakra-ui/react";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});

const BarChart = ({ data, title }: { data: number[][]; title: string }) => {
  return (
    <Stack mb={4}>
      <Center>
        <Heading size={"sm"}>{title}</Heading>
      </Center>
      <HighchartsChart
        plotOptions={{
          series: {
            animation: false,
            stacking: "normal",
            states: { hover: { enabled: false } }, // disable hover
          },
        }}
      >
        <Chart
          type="column"
          animation={false}
          width={300}
          height={310}
          style={{ fontFamily: "var(--chakra-fonts-heading)" }}
        />
        <Tooltip
          formatter={function (this) {
            if (this && this.point && this.point.y) {
              const datalabel = this.point.y.toLocaleString("cs-CZ") + " Kč";
              return `${this.series.name}: <strong>${datalabel}</strong>`;
            }
            return undefined;
          }}
        />
        <XAxis
          type="category"
          categories={[
            "Současnost",
            "Návrat do 2020",
            "STAN",
            "IDEA+PAQ Vyvážená",
            "IDEA+PAQ Realistická",
          ]}
        />
        <YAxis max={100000}>
          <ColumnSeries
            name={"daně a odvody"}
            data={data[1].map((value, index) => {
              return { y: value, color: colors[index] };
            })}
            dataLabels={{
              enabled: true,
              rotation: 90,
              crop: false,
              align: "right",
              inside: false,
              y: -5,
              style: { color: "black", textOutline: "none" },
              formatter: function (this) {
                if (this && this.point && this.point.y) {
                  const datalabel =
                    Math.floor(this.point.y).toLocaleString("cs-CZ") + " Kč";
                  return datalabel;
                }
                return undefined;
              },
            }}
          />
          <ColumnSeries name={"čistá mzda"} data={data[0]} color={"#E7DFC8"} />
        </YAxis>
      </HighchartsChart>
    </Stack>
  );
};

const Graf = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight("graf6");

  useEffect(() => {
    postHeightMessage();
  }, []);

  return (
    <div ref={containerRef}>
      <Heading as="h1" size="lg">
        Měsíční platba podle dětí a příjmu
      </Heading>
      <Heading as="h2" size="sm" mb={4}>
        Zatížení daněmi a odvody v růných typech domácností
      </Heading>
      <HighchartsProvider Highcharts={Highcharts}>
        <Stack wrap={"wrap"} direction={"row"}>
          {data.map((item, index) => {
            const numbers: number[][] = [
              item[1].slice(1, 6) as number[],
              item[2].slice(1, 6) as number[],
            ];
            return (
              <BarChart key={index} data={numbers} title={item[0] as string} />
            );
          })}
        </Stack>
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
