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

import data from "./data/graf2.json";
import colors from "./data/colors.json";
import { Heading, Stack, Center } from "@chakra-ui/react";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});

const BarChart = ({
  data,
  color,
  title,
}: {
  data: number[];
  color: string;
  title: string;
}) => {
  return (
    <Stack mb={4}>
      <Center>
        <Heading size={"sm"}>{title}</Heading>
      </Center>
      <HighchartsChart
        plotOptions={{
          series: {
            animation: false,
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
              const kvintil = this.point.category as string;
              return `Podle varianty <strong>${title}</strong> by se výběr daně z příjmů od <strong>${kvintil.slice(
                0,
                1
              )}. pětiny zaměstnanců</strong> rozdělených podle výše příjmů ${
                this.point.y > 0 ? "zvýšil" : "snížil"
              } o <strong>${Math.abs(this.point.y).toLocaleString(
                "cs-CZ"
              )} mld. Kč</strong>.`;
            }
            return undefined;
          }}
        />
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
        <YAxis min={-5} max={45}>
          <ColumnSeries
            name={"Zvýšení výběru daní od zaměstnanců"}
            data={data}
            color={color}
            dataLabels={{
              enabled: true,
              formatter: function (this) {
                if (this && this.point && this.point.y) {
                  return this.point.y > 0
                    ? "+" +
                        (Math.floor(this.point.y * 10) / 10).toLocaleString(
                          "cs-CZ"
                        )
                    : (Math.floor(this.point.y * 10) / 10).toLocaleString(
                        "cs-CZ"
                      );
                }
                return undefined;
              },
            }}
          />
        </YAxis>
      </HighchartsChart>
    </Stack>
  );
};

const Graf = () => {
  const { containerRef, postHeightMessage } = usePostMessageWithHeight("graf2");

  useEffect(() => {
    postHeightMessage();
  }, []);

  return (
    <div ref={containerRef}>
      <Heading as="h1" size="lg">
        O kolik miliard víc by stát vybral
      </Heading>
      <Heading as="h2" size="sm" mb={4}>
        Od stejně početných skupin zaměstnanců seřazených od nízkopříjmových (1.
        {"\u00A0"}pětina) po vysokopříjmové (5.{"\u00A0"}pětina)
      </Heading>
      <HighchartsProvider Highcharts={Highcharts}>
        <Stack wrap={"wrap"} direction={"row"}>
          {data.map((item, index) => {
            const numbers: number[] = item.slice(1, 6) as number[];
            return (
              <BarChart
                key={item[0]}
                data={numbers}
                color={colors[index + 1]}
                title={item[0] as string}
              />
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
