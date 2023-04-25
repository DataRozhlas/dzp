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

import data from "./data/graf4.json";
import colors from "./data/colors.json";
import { Heading, Stack, Center } from "@chakra-ui/react";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});

const BarChart = ({ data, title }: { data: number[]; title: string }) => {
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
          width={310}
          height={310}
          style={{ fontFamily: "var(--chakra-fonts-heading)" }}
        />
        <Tooltip
          formatter={function (this) {
            if (this && this.point && this.point.y) {
              return `U zaměsntnaců z domácností z kategorie <strong>${title.toLowerCase()}</strong> by celkové náklady práce (daně a pojištění placené zaměstnancem i zaměstnavatelem) tvořily <strong>${this.point.y.toLocaleString(
                "cs-CZ"
              )} % </strong> hrubých příjmů.`;
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
        <YAxis min={30} max={50}>
          <ColumnSeries
            name={"Celkové náklady práce"}
            data={data.map((value, index) => {
              return { y: value, color: colors[index] };
            })}
            dataLabels={{
              enabled: true,
              formatter: function (this) {
                if (this && this.point && this.point.y) {
                  const datalabel =
                    (Math.floor(this.point.y * 10) / 10).toLocaleString(
                      "cs-CZ"
                    ) + " %";
                  return datalabel;
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
  const { containerRef, postHeightMessage } = usePostMessageWithHeight("graf4");

  useEffect(() => {
    postHeightMessage();
  }, []);

  return (
    <div ref={containerRef}>
      <Heading as="h1" size="lg">
        Celkové náklady práce
      </Heading>
      <Heading as="h2" size="sm" mb={4}>
        Kolik procent nákladů by odvedli zaměstnanci a zaměstnavatelé, rozděleno
        podle typu domácnosti
      </Heading>
      <HighchartsProvider Highcharts={Highcharts}>
        <Stack wrap={"wrap"} direction={"row"}>
          {data.map((item) => {
            const numbers: number[] = item.slice(1, 6) as number[];
            return (
              <BarChart
                key={item[0]}
                data={numbers}
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
