import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import Highcharts from "highcharts";
import addTreemapModule from "highcharts/modules/treemap";
import {
  HighchartsProvider,
  HighchartsChart,
  Chart,
  XAxis,
  YAxis,
  TreemapSeries,
  Tooltip,
} from "react-jsx-highcharts";

import data from "./data/graf11.json";
import colors from "./data/twelvecolors.json";
import { Heading } from "@chakra-ui/react";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

addTreemapModule(Highcharts);

Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});

const Graf = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("graf11");

  useEffect(() => {
    postHeightMessage();
  }, []);

  return (
    <div ref={containerRef}>
      <Heading as="h1" size="lg">
        Přehled dotačních programů 2023
      </Heading>
      <Heading as="h2" size="sm" mb={4}>
        Plocha odpovídá množství peněz. Kliknutím zobrazíte podrobnosti
      </Heading>

      <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsChart
          plotOptions={{
            series: {
              animation: false,
            },
          }}
        >
          <Chart
            type="treemap"
            animation={false}
            style={{ fontFamily: "var(--chakra-fonts-heading)" }}
            height={700}
            margin={0}
          />
          <Tooltip valueSuffix=" Kč" />
          <XAxis />
          <YAxis>
            <TreemapSeries
              allowTraversingTree={true}
              levels={[
                {
                  level: 1,
                  layoutAlgorithm: "squarified",
                  dataLabels: {
                    enabled: true,
                    align: "left",
                    verticalAlign: "top",
                    style: {
                      fontSize: "15px",
                      fontWeight: "bold",
                    },
                  },
                },
              ]}
              data={data.map((d: any) => {
                return {
                  ...d,
                  color: d.color < 12 ? colors[d.color] : colors[d.color - 11],
                };
              })}
              color={colors[3]}
              name="Všechny dotační programy"
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
