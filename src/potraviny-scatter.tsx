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
    ScatterSeries,
    Tooltip,
} from "react-jsx-highcharts";

import data from "./data/potraviny.json";
import colors from "./data/eightcolors.json";
import colors2 from "./data/eightcolors2.json";
import colors3 from "./data/eightcolors3.json";

import {
    Heading, Box, Divider, Table, Thead, Tbody, Tr, Th, Td, TableContainer,
} from "@chakra-ui/react";
import { usePostMessageWithHeight } from "./hooks/usePostHeightMessage";

Highcharts.setOptions({
    lang: {
        numericSymbols: [" tis.", " mil.", " mld.", " tril.", " kvadril."],
    },
});

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

const calculateAveragePrice = (data: any, month: number, commodity: any) => {
    const filteredData = data.filter((item: any) => item.time === month);
    const filteredCommodity = filteredData.filter((item: any) => item[commodity.name] !== null && item[commodity.name] !== undefined);
    const averagePrice = filteredCommodity.reduce((sum: number, item: any) => sum + item[commodity.name], 0) / filteredCommodity.length;
    return averagePrice.toLocaleString("cs-CZ", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + " Kč"
};

const calculateMostFrequentPrice = (data: any, month: number, commodity: any) => {
    const filteredData = data.filter((item: any) => item.time === month);
    const filteredCommodity = filteredData.filter((item: any) => item[commodity.name] !== null && item[commodity.name] !== undefined);
    const prices = filteredCommodity.map((item: any) => item[commodity.name]);
    const mostFrequentPrice = prices.sort((a: number, b: number) =>
        prices.filter((v: number) => v === a).length
        - prices.filter((v: number) => v === b).length
    ).pop();
    const frequency = prices.filter((v: number) => v === mostFrequentPrice).length;
    return mostFrequentPrice.toLocaleString("cs-CZ", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + " Kč (" + frequency + "×)"
}

const Graf = () => {
    const { containerRef, postHeightMessage } =
        usePostMessageWithHeight("potraviny-scatter");

    useEffect(() => {
        postHeightMessage();
    }, []);


    return (
        <Box ref={containerRef}>
            <HighchartsProvider Highcharts={Highcharts}>
                {commodities.map((commodity) => {
                    return (<Box key={commodity.name}>
                        <Heading as="h2" size="xl" mb={5}>
                            {commodity.description}
                        </Heading>
                        <TableContainer pb={10}>
                            <Table variant='simple' size={"sm"}>
                                <Thead>
                                    <Tr>
                                        <Th>    </Th>
                                        <Th>říjen</Th>
                                        <Th>listopad</Th>
                                        <Th>leden</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Th>nejčastější cena</Th>
                                        <Td>{calculateMostFrequentPrice(data, 1, commodity)}</Td>
                                        <Td>{calculateMostFrequentPrice(data, 2, commodity)}</Td>
                                        <Td>{calculateMostFrequentPrice(data, 3, commodity)}</Td>

                                    </Tr>
                                    <Tr>
                                        <Th>průměrná cena</Th>
                                        <Td>{calculateAveragePrice(data, 1, commodity)}</Td>
                                        <Td>{calculateAveragePrice(data, 2, commodity)}</Td>
                                        <Td>{calculateAveragePrice(data, 3, commodity)}</Td>
                                    </Tr>

                                </Tbody>
                            </Table>
                        </TableContainer>
                        <Heading as="h3" size="sm" mb={4}>
                            Ceny zjištěné v jednotlivých obchodech </Heading>
                        <HighchartsChart
                            plotOptions={{
                                scatter: {
                                    jitter: {
                                        x: 0.3,
                                    },
                                    marker: {
                                        radius: 4,
                                        symbol: 'circle',
                                    },
                                },
                                series: {
                                    animation: false,
                                    dataLabels: {
                                        enabled: true,
                                        formatter: function (this) {
                                            if (this.point.y === this.series.dataMax || this.point.y === this.series.dataMin) {
                                                return this.point.y?.toLocaleString("cs-CZ") + " Kč"
                                            }
                                        }
                                    },
                                }
                            }}
                        >
                            <Chart
                                type="scatter"
                                animation={false}
                                style={{ fontFamily: "var(--chakra-fonts-heading)" }}
                            // height={1800}
                            />
                            <Tooltip
                                shared
                                valueSuffix=" Kč"
                                formatter={function (this) {
                                    return this.point.name + " " + this.y?.toLocaleString("cs-CZ") + " Kč" + (this.point.options.custom?.note !== null ? " (" + this.point.options.custom?.note + ")" : "");
                                }}
                            />
                            <XAxis
                                type="category"
                                categories={["říjen", "listopad", "leden"]}
                            />
                            <YAxis
                                title={{
                                    text: "cena",

                                }}
                                labels={
                                    {
                                        formatter: function (this) {
                                            if (this.isLast) {
                                                return this.value?.toLocaleString("cs-CZ") + " Kč";
                                            }
                                            return this.value?.toLocaleString("cs-CZ");
                                        }
                                    }
                                }
                            >
                                <ScatterSeries
                                    data={data.filter((store) => store.time === 1 && store[commodity.name as keyof typeof store] !== null).map((store) => { return { x: 0, y: Number(store[commodity.name as keyof typeof store]), name: store.store + " " + store.city, custom: { note: store[`${commodity.name}_note` as keyof typeof store] } } })}
                                    color={commodity.color3}
                                    opacity={0.5}
                                    name={"říjen 2023"}
                                />
                                <ScatterSeries
                                    data={data.filter((store) => store.time === 2 && store[commodity.name as keyof typeof store] !== null).map((store) => { return { x: 1, y: Number(store[commodity.name as keyof typeof store]), name: store.store + " " + store.city, custom: { note: store[`${commodity.name}_note` as keyof typeof store] } } })}
                                    color={commodity.color3}
                                    opacity={0.7}
                                    name={"listopad 2023"}
                                />
                                <ScatterSeries
                                    data={data.filter((store) => store.time === 3 && store[commodity.name as keyof typeof store] !== null).map((store) => { return { x: 2, y: Number(store[commodity.name as keyof typeof store]), name: store.store + " " + store.city, custom: { note: store[`${commodity.name}_note` as keyof typeof store] } } })}
                                    color={commodity.color3}
                                    name={"leden 2024"}
                                />

                            </YAxis>
                        </HighchartsChart>
                        <Divider my={10}/>
                    </Box>



                    );
                })}
            </HighchartsProvider>
        </Box>
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
