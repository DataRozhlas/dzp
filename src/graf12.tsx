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
  Tooltip,
  Legend,
} from "react-jsx-highcharts";

import data from "./data/graf12.json";
import colors from "./data/threecolors.json";
import { Heading } from "@chakra-ui/react";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

Highcharts.setOptions({
  lang: {
    numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
  },
});

const Graf = () => {
  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("graf12");

  useEffect(() => {
    postHeightMessage();
  }, []);

  return (
    <div ref={containerRef}>
      <Heading as="h1" size="lg">
        Změna objemu dotací
      </Heading>
      <Heading as="h2" size="sm" mb={4}>
        Podle střednědobého výhledu ministerstva financí
      </Heading>

      <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsChart
          plotOptions={{
            series: {
              animation: false,
              dataLabels: {
                enabled: true,
                formatter: function (this) {
                  console.log(this);
                  if (this.point.y) {
                    if (this.series.index === 0 && this.point.index === 0) {
                      return (
                        Math.round(this.point.y / 10000000) / 100 + " mld. Kč"
                      );
                    }
                    return Math.round(this.point.y / 10000000) / 100;
                  }
                },
              },
            },
          }}
        >
          <Chart
            type="bar"
            animation={false}
            style={{ fontFamily: "var(--chakra-fonts-heading)" }}
            height={1800}
          />
          <Tooltip shared valueSuffix=" Kč" />
          <Legend verticalAlign="top" />
          <XAxis
            type="category"
            categories={[
              "Ministerstvo školství,<br>mládeže a tělovýchovy",
              "Ministerstvo dopravy",
              "Ministerstvo práce<br>a sociálních věcí",
              "Ministerstvo průmyslu<br>a obchodu",
              "Všeobecná<br>pokladní správa",
              "Ministerstvo zemědělství",
              "Akademie věd ČR",
              "Ministerstvo kultury",
              "Národní sportovní agentura",
              "Státní fond<br>dopravní infrastruktury",
              "Technologcká agentura ČR",
              "Grantová agentura ČR",
              "Ministerstvo<br>životního prostředí",
              "Ministerstvo zdravotnictví",
              "Ministerstvo pro místní rozvoj",
              "Ministerstvo vnitra",
              "Ministerstvo zahraničních věcí",
              "Úřad vlády ČR",
              "Státní úřad<br>pro jadernou bezpečnost",
              "Ministerstvo obrany",
              "Ministerstvo spravedlnosti",
              "Ministerstvo financí",
            ]}
          />
          <YAxis>
            {data.map((serie, i) => {
              return (
                <BarSeries
                  key={serie[0]}
                  data={serie.slice(1, 23)}
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
