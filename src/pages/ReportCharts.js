import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { DownloadPdf } from "./DownloadPdf";
import { ArrowDownIcon } from '@heroicons/react/20/solid'
import ApexCharts from "apexcharts";
import { useState, useEffect } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';

export default function ReportCharts({ data, chartData, subType }) {
    const [imageUrl, setImageUrl] = useState(null)
    const title = data === "Freezes" ? "Timeframes" : data === "NSS Statistics" ? subType : data

    useEffect(() => {
        getImage();
    }, [chartData, imageUrl]);

    function getImage() {
        ApexCharts.exec("chart-id", "dataURI")?.then(({ imgURI }) => {
            setImageUrl(imgURI);
        });
    }

    const chartConfigs = {
        type: "line",
        height: 300,
        series: [
            {
                name: data,
                data: chartData[0],
            },

        ],

        options: {
            chart: {
                id: "chart-id",
                toolbar: {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true | '<img src="/static/icons/reset.png" width="20">',
                        customIcons: []
                    },
                    export: {
                        csv: {
                            filename: undefined,
                            columnDelimiter: ',',
                            headerCategory: 'category',
                            headerValue: 'value',
                            dateFormatter(timestamp) {
                                return new Date(timestamp).toDateString()
                            }
                        },
                        svg: {
                            filename: undefined,
                        },
                        png: {
                            filename: undefined,
                        }
                    },
                    autoSelected: 'zoom'
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            stroke: {
                lineCap: "round",
                curve: "smooth",
                width: 2,
            },
            markers: {
                size: 0,
            },

            xaxis: {
                tickAmount: 9,

                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                    rotate: 0,
                },
                categories: chartData[1],
                title: {
                    text: 'Frame Number',
                },


            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                title: {
                    text: title
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 0,
                position: 'back',
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",

            },
            legend: {
                show: true,
                horizontalAlign: 'right',
                position: 'top'
            },

        },
    }

    return (
        <Card>
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
                <div className="flex flex-col items-center w-[100%] ">
                    <div className="flex sm:flex-row flex-col justify-between items-center w-full ">
                        <div className="self-start">
                            <Typography className="text-[18px] font-700 mt-[29px] text-[#1F2A37]" variant="h6" color="blue-gray">
                                {data} Data
                            </Typography>
                        </div>
                        {chartData && chartData[0]?.length !== 0 ? <div className="mt-4 w-full bottom-0 align-bottom sm:w-min flex items-center h-min rounded-md bg-[#2563EB] px-2 py-2 md:px-3 md:py-2 text-sm md:text-[16px] font-[600] text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                            <ArrowDownIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
                            <PDFDownloadLink document={<DownloadPdf imageUrl={imageUrl} chartData={chartData} title={title} />} fileName={`${title}.pdf`}>
                              Export
                                
                            </PDFDownloadLink>
                        </div> : null}
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-2 pb-0">
                <Chart {...chartConfigs} />
            </CardBody>
        </Card>


    );
}