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

import data from "./data/potraviny.json";
import colors from "./data/eightcolors.json";
import colors2 from "./data/eightcolors2.json";
import colors3 from "./data/eightcolors3.json";

import { Heading, Select } from "@chakra-ui/react";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

Highcharts.setOptions({
    lang: {
        numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
    },
});

const cities = new Set(data.map((store) => store.city));
const commodities = [
    { name: "chleb", description: "Chléb konzumní kmínový (1 kg)", color: colors3[0], color2: colors[0], color3: colors2[0] },
    { name: "jablka", description: "Jablka konzumní (1 kg)", color: colors3[1], color2: colors[1], color3: colors2[1] },
    { name: "cukr", description: "Cukr krystalový (1 kg)", color: colors3[2], color2: colors[2], color3: colors2[2] },
    { name: "mleko", description: "Mléko 1,5 % UHT (tetrapack 1 l)", color: colors3[3], color2: colors[3], color3: colors2[3] },
    { name: "maslo", description: "Máslo 82 % (250 g)", color: colors3[4], color2: colors[4], color3: colors2[4] },
    { name: "kure", description: "Kuře celé chlazené bez drobů jak. A  (1 kg)", color: colors3[5], color2: colors[5], color3: colors2[5] },
    { name: "vejce", description: "Slepičí konzumní vejce vel. M (klecové nebo halové/podestýlkové chovy) (10 ks)", color: colors3[6], color2: colors[6], color3: colors2[6] },
    { name: "mouka", description: "Mouka hladká pšeničná (1 kg)", color: colors3[7], color2: colors[7], color3: colors2[7] },
];


const Graf = () => {
    const { containerRef, postHeightMessage } =
        usePostMessageWithHeight("potraviny");

    useEffect(() => {
        postHeightMessage();
    }, []);

    const [selectedFood, setSelectedFood] = React.useState<string>("chleb");
    // const [selectedTime, setSelectedTime] = React.useState<string>("2");

    return (
        <div ref={containerRef}>
            <Heading as="h1" size="lg" py={1}>
                Ceny základních potravin v krajských městech
            </Heading>
            <Heading as="h2" size="sm" py={1}>
                Vyberte z menu potravinu, pro kterou chcete zobrazit ceny:
            </Heading>
            <Select py={4} value={selectedFood} onChange={
                (e) => {
                    setSelectedFood(e.target.value);
                }
            } >
                {commodities.map((commodity) => (
                    <option key={commodity.name} value={commodity.name}>{commodity.description}</option>
                ))}
            </Select>
            {/* <RadioGroup onChange={setSelectedTime} value={selectedTime} py={5}>
                <Stack direction="row" spacing={5}>
                    <Radio value={"1"} checked={selectedTime === "1"}>začátek října</Radio>
                    <Radio value={"2"} checked={selectedTime === "2"}>konec listopadu</Radio>
                </Stack>
            </RadioGroup> */}
            <HighchartsProvider Highcharts={Highcharts}>
                {Array.from(cities).map((city) => {
                    return (<div key={city}>
                        <Heading as="h3" size="md" mb={4}>
                            {city}
                        </Heading>
                        <HighchartsChart
                            plotOptions={{
                                series: {
                                    animation: false,
                                    dataLabels: {
                                        enabled: true,
                                        rotation: 90,
                                        y: 30,
                                        formatter: function (this) {
                                            return this.point.y?.toLocaleString("cs-CZ") + " Kč";
                                        },
                                    },
                                },
                            }}
                        >
                            <Chart
                                type="column"
                                animation={false}
                                style={{ fontFamily: "var(--chakra-fonts-heading)" }}
                            // height={1800}
                            />
                            <Tooltip shared valueSuffix=" Kč" />
                            <Legend verticalAlign="top" />
                            <XAxis
                                type="category"
                                categories={Array.from(new Set(data.map((store) => store.store)))}
                            />
                            <YAxis>
                                <ColumnSeries
                                    data={data.filter((store) => store.city === city && store.time === 1).map((store) => store[selectedFood as keyof typeof store])}
                                    color={commodities.filter((commodity) => commodity.name === selectedFood)[0].color}
                                    name={"říjen 2023"}
                                />
                                <ColumnSeries
                                    data={data.filter((store) => store.city === city && store.time === 2).map((store) => store[selectedFood as keyof typeof store])}
                                    color={commodities.filter((commodity) => commodity.name === selectedFood)[0].color2}
                                    name={"listopad 2023"}
                                />
                                <ColumnSeries
                                    data={data.filter((store) => store.city === city && store.time === 3).map((store) => store[selectedFood as keyof typeof store])}
                                    color={commodities.filter((commodity) => commodity.name === selectedFood)[0].color3}
                                    name={"leden 2024"}
                                />

                                {/* <ColumnSeries
                                    data={filteredData.filter((store) => store.time === 2).map((store) => store[commodity.name])}
                                    color={commodity.color2}
                                    name={"listopad 2023"}
                                />
                                <ColumnSeries
                                    data={filteredData.filter((store) => store.time === 3).map((store) => store[commodity.name])}
                                    color={commodity.color3}
                                    name={"leden 2024"}
                                /> */}


                            </YAxis>
                        </HighchartsChart></div>
                    );
                })}
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
