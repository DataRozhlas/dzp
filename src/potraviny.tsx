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
import colors from "./data/potraviny-colors.json";

import { Heading, Select } from "@chakra-ui/react";
// Radio, RadioGroup, Stack
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

Highcharts.setOptions({
    lang: {
        numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
    },
});

const cities = new Set(data.map((store) => store.city));
const commodities = [
    { name: "chleb", description: "Chléb konzumní kmínový (1 kg)" },
    { name: "jablka", description: "Jablka konzumní (1 kg)" },
    { name: "cukr", description: "Cukr krystalový (1 kg)" },
    { name: "mleko", description: "Mléko 1,5 % UHT (tetrapack 1 l)" },
    { name: "maslo", description: "Máslo 82 % (250 g)" },
    { name: "kure", description: "Kuře celé chlazené bez drobů jak. A  (1 kg)" },
    { name: "vejce", description: "Slepičí konzumní vejce vel. M (klecové nebo halové/podestýlkové chovy) (10 ks)" },
    { name: "mouka", description: "Mouka hladká pšeničná (1 kg)" },
];

const filterData = (data: any[], city: string) => {
    const filteredData = data.filter((store) => store.city === city);
    // const filteredData2 = filteredData.filter((store) => store.time.toString() === time);
    //const filteredData2 = filteredData.filter(())
    return filteredData;
}

const Graf = () => {
    const { containerRef, postHeightMessage } =
        usePostMessageWithHeight("potraviny");

    useEffect(() => {
        postHeightMessage();
    }, []);

    const [selectedCity, setSelectedCity] = React.useState<string>("Praha");
    // const [selectedTime, setSelectedTime] = React.useState<string>("2");
    const [filteredData, setFilteredData] = React.useState<any[]>([]);

    useEffect(() => {
        setFilteredData(filterData(data, selectedCity));
    }, [selectedCity]);

    return (
        <div ref={containerRef}>
            <Heading as="h1" size="xl" py={1}>
                Kolik u vás stojí základní potraviny
            </Heading>
            <Heading as="h2" size="sm" py={1}>
                Vyberte krajské město, pro které chcete zobrazit ceny:
            </Heading>
            <Select py={4} onChange={
                (e) => setSelectedCity(e.target.value)
            } value={selectedCity}>
                {Array.from(cities).map((city) => (
                    <option key={city}>{city}</option>
                ))}
            </Select>
            {/* <RadioGroup onChange={setSelectedTime} value={selectedTime} py={5}>
                <Stack direction="row" spacing={5}>
                    <Radio value={"1"} checked={selectedTime === "1"}>začátek října</Radio>
                    <Radio value={"2"} checked={selectedTime === "2"}>konec listopadu</Radio>
                </Stack>
            </RadioGroup> */}
            <HighchartsProvider Highcharts={Highcharts}>
                {commodities.map((commodity, index) => {
                    return (<div key={commodity.name}>
                        <Heading as="h3" size="md" mb={4} key={commodity.name}>
                            {commodity.description}
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
                                categories={filteredData.map((store) => store.store)}
                            />
                            <YAxis>
                                <ColumnSeries
                                    data={filteredData.filter((store) => store.time === 1).map((store) => store[commodity.name])}
                                    color={colors[index][0]}
                                    name={"říjen 2023"}
                                />
                                <ColumnSeries
                                    data={filteredData.filter((store) => store.time === 2).map((store) => store[commodity.name])}
                                    color={colors[index][1]}
                                    name={"listopad 2023"}
                                />
                                <ColumnSeries
                                    data={filteredData.filter((store) => store.time === 3).map((store) => store[commodity.name])}
                                    color={colors[index][2]}
                                    name={"leden 2024"}
                                />
                                <ColumnSeries
                                    data={filteredData.filter((store) => store.time === 4).map((store) => store[commodity.name])}
                                    color={colors[index][3]}
                                    name={"květen 2024"}
                                />


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
