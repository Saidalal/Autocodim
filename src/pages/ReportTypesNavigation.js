

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React, { useEffect, useState } from 'react'
import ReportCharts from './ReportCharts'
import { FilmIcon, MicrophoneIcon } from '@heroicons/react/24/outline'
import NssStatisticsTab from './NssStatisticsTab'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ReportTypesNavigation(props) {
    const { tabsData, videoChartData, audioChartData, AVChartData } = props

    const [tabs, settabs] = useState([
        { name: 'Video Buffer', current: true },
        { name: 'Blurriness', current: false },
        { name: 'Freezes', current: false },
        { name: 'Blackout', current: false },
        { name: 'Resolution', current: false },
        { name: 'NSS Statistics', current: false },
    ])

    const [chartData, setChartData] = useState([])
    const [chartFullData, setChartFullData] = useState([])
    const [audioOverAllData, setaudioOverAllData] = useState([])

    const [subType, setSubType] = useState("Mean")
    const [checkBlackout, setcheckBlackout] = useState(false)

    const extractData = () => {

        tabs.map((items) => {
            let xValue = []
            let xValueDetail = []
            let yValue = []
            let yValueDetail = []
            if (items.current === true && items.name === "Video Buffer") {
                videoChartData?.Buffering_info?.slice(0, 1000).map((item) => {
                    xValue.push(Number(item.buffering_time).toFixed(3))
                    xValueDetail.push(Number(item.buffering_time))
                })
                videoChartData?.Buffering_info?.slice(0, 1000).map((item) => {
                    yValue.push(item.frame_number)
                    yValueDetail.push(item.frame_number)
                })
                setChartData([xValue, yValue])
                setChartFullData([xValueDetail, yValueDetail])

            }
            else if (items.current === true && items.name === "Blurriness") {

                videoChartData?.Blurriness_info?.slice(0, 1000).map((item) => {
                    xValue.push(Number(item.blurriness).toFixed(2))
                    xValueDetail.push(Number(item.blurriness))
                })
                videoChartData?.Blurriness_info?.slice(0, 1000).map((item) => {
                    yValue.push(Number(item.frame_number))
                    yValueDetail.push(Number(item.frame_number))
                })
                setChartData([xValue, yValue])
                setChartFullData([xValueDetail, yValueDetail])


            }
            else if (items.current === true && items.name === "Freezes") {

                videoChartData?.Freezing_frames_info?.slice(0, 1000).map((item) => {
                    xValue.push(Number(item.time_in_seconds).toFixed(2))
                    xValueDetail.push(Number(item.time_in_seconds))
                })
                videoChartData?.Freezing_frames_info?.slice(0, 1000).map((item) => {
                    yValue.push(Number(item.frame_number))
                    yValueDetail.push(Number(item.frame_number))
                })
                setChartData([xValue, yValue])
                setChartFullData([xValueDetail, yValueDetail])


            }
            else if (items.current === true && items.name === "Blackout") {

                videoChartData?.Blackout_info?.avg_brightness_values?.slice(0, 1000).map((item) => {
                    xValue.push(Number(item).toFixed(3))
                    xValueDetail.push(Number(item))
                })
                videoChartData?.Blackout_info?.blackout_frames?.slice(0, 1000).map((item) => {
                    yValue.push(Number(item))
                    yValueDetail.push(Number(item))
                })
                setChartData([xValue, yValue])
                setChartFullData([xValueDetail, yValueDetail])


            }
            else if (items.current === true && items.name === "Resolution") {

                videoChartData?.Resolution_frame_info?.frame_info?.slice(0, 1000).map((item) => {
                    yValue.push(Number(item.frame))
                    yValueDetail.push(Number(item.frame))
                })
                videoChartData?.Resolution_frame_info?.frame_info?.slice(0, 1000).map((item) => {
                    if (item.resolution === "640x360") {
                        xValue.push(1)
                        xValueDetail.push("1 (640x360)")
                    }
                    else if (item.resolution === "640x480") {
                        xValue.push(2)
                        xValueDetail.push("2 (640x480)")
                    }
                    else if (item.resolution === "828x1792") {
                        xValue.push(3)
                        xValueDetail.push("3 (828x1792)")
                    }
                    else if (item.resolution === "1280x720") {
                        xValue.push(4)
                        xValueDetail.push("4 (1280x720)")
                    }
                    else if (item.resolution === "1920x1080") {
                        xValue.push(5)
                        xValueDetail.push("5 (1920x1080)")
                    }
                    else if (item.resolution === "2560x1440") {
                        xValue.push(6)
                        xValueDetail.push("6 (2560x1440)")
                    }
                    else if (item.resolution === "2048x1080") {
                        xValue.push(7)
                        xValueDetail.push("7 (2048x1080)")
                    }
                    else if (item.resolution === "3840x2160") {
                        xValue.push(8)
                        xValueDetail.push("8 (3840x2160)")
                    }
                    else if (item.resolution === "7680x4320") {
                        xValue.push(9)
                        xValueDetail.push("9 (7680x4320)")
                    }
                    else {
                        xValue.push(0)
                        xValueDetail.push(0)
                    }
                })
                setChartData([xValue, yValue])
                setChartFullData([xValueDetail, yValueDetail])

            }
            else if (items.current === true && items.name === "NSS Statistics") {

                videoChartData?.NSS_Features_info?.slice(0, 1000).map((item) => {
                    if (subType === "Mean") {

                        xValue.push(Number(item.mean).toFixed(2))
                        xValueDetail.push(Number(item.mean))
                        yValue.push(Number(item.frame_number))
                        yValueDetail.push(Number(item.frame_number))
                    }
                    else if (subType === "Kurtosis") {

                        xValue.push(Number(item.kurtosis).toFixed(2))
                        xValueDetail.push(Number(item.kurtosis))
                        yValue.push(Number(item.frame_number))
                        yValueDetail.push(Number(item.frame_number))
                    }
                    else if (subType === "Skewness") {

                        xValue.push(Number(item.skewness).toFixed(2))
                        xValueDetail.push(Number(item.skewness))
                        yValue.push(Number(item.frame_number))
                        yValueDetail.push(Number(item.frame_number))
                    }
                    else if (subType === "Standard Deviation") {

                        xValue.push(Number(item.std_deviation).toFixed(2))
                        xValueDetail.push(Number(item.std_deviation))
                        yValue.push(Number(item.frame_number))
                        yValueDetail.push(Number(item.frame_number))
                    }
                })

                setChartData([xValue, yValue])
                setChartFullData([xValueDetail, yValueDetail])

            }

            else if (items.current === true && items.name === "Audio SNR") {

                audioChartData?.Audio_SNR?.frame_number?.slice(0, 1000).map((item) => {
                    yValue.push(Number(item))
                    yValueDetail.push(Number(item))
                })
                audioChartData?.Audio_SNR?.frame_classification?.slice(0, 1000).map((item) => {
                    if (item === "Bad Audio") {

                        xValue.push(-11)
                        xValueDetail.push("Bad Audio")
                    }
                    else if (item === "Good Audio") {

                        xValue.push(-10)
                        xValueDetail.push("Good Audio")
                    }

                })
                setaudioOverAllData([String(audioChartData?.Audio_SNR?.mean_snr), audioChartData?.Audio_SNR?.overall_classification])

                setChartData([xValue, yValue])
                setChartFullData([xValueDetail, yValueDetail])


            }
            
            else if (items.current === true && items.name === "Video Timestamp") {


                AVChartData?.Video_Audio_Sync_timeframes?.slice(0, 1000).forEach((item) => {
                    const audioNo = item.match(/Video Timestamp = (\d+\.\d+)s/);
                    const frameNo = item.match(/Frame (\d+):/);
                    if (audioNo && audioNo[1]) {
                        xValue.push(parseFloat(audioNo[1]));
                        xValueDetail.push(parseFloat(audioNo[1]));
                    }
                    if (frameNo && frameNo[1]) {
                        yValue.push(Number(frameNo[1]));
                        yValueDetail.push(Number(frameNo[1]));
                    }
                });
                setChartData([xValue, yValue])
                setChartFullData([xValueDetail, yValueDetail])


            }
            else if (items.current === true && items.name === "Audio Timestamp") {


                AVChartData?.Video_Audio_Sync_timeframes?.slice(0, 1000).forEach((item) => {
                    const audioNo = item.match(/Audio Timestamp = (\d+\.\d+)s/);
                    const frameNo = item.match(/Frame (\d+):/);
                    if (audioNo && audioNo[1]) {
                        xValue.push(parseFloat(audioNo[1]));
                        xValueDetail.push(parseFloat(audioNo[1]));
                    }
                    if (frameNo && frameNo[1]) {
                        yValue.push(Number(frameNo[1]));
                        yValueDetail.push(Number(frameNo[1]));
                    }
                });
                setChartData([xValue, yValue])
                setChartFullData([xValueDetail, yValueDetail])


            }
            else if (items.current === true && items.name === "Time Difference") {


                AVChartData?.Video_Audio_Sync_timeframes?.slice(0, 1000).forEach((item) => {
                    const timeDifference = item.match(/Time Difference = (\d+\.\d+)s/);
                    const frameNo = item.match(/Frame (\d+):/);
                    if (timeDifference && timeDifference[1]) {
                        xValue.push(parseFloat(timeDifference[1]));
                        xValueDetail.push(parseFloat(timeDifference[1]));
                    }
                    if (frameNo && frameNo[1]) {
                        yValue.push(Number(frameNo[1]));
                        yValueDetail.push(Number(frameNo[1]));
                    }
                });
                setChartData([xValue, yValue])
                setChartFullData([xValueDetail, yValueDetail])

            }
        })

    }
    const blackoutCheckData = () => {
        chartFullData && chartFullData[0]?.map((elements, index) => {
            if (tabs.map((items) => (items.current === true && items.name === "Blackout" && (Number(elements) < 10)))) {
                setcheckBlackout(false)
            }
            else {
                setcheckBlackout(true)
            }
        })
    }
    useEffect(() => {
        extractData()
        blackoutCheckData()

    }, [videoChartData, tabs, audioChartData, AVChartData, subType])

    useEffect(() => {
    }, [chartData, chartFullData, subType, checkBlackout, audioOverAllData])

    const handleSelectChange = (selectedValue) => {
        const updateTabs = tabs.map(tab => {
            if (tab.name === selectedValue) {
                return { ...tab, current: true }
            }
            else {
                return { ...tab, current: false }
            }
        })
        settabs(updateTabs)
    }
    useEffect(() => {
        settabs(tabsData)
    }, [])






    return (
        <section className="p-6 bg-white mx-[20px] my-[10px] rounded">
            <div className='flex gap-[20px]'>
                {/* <img src={UploadVideo} className='h-[80px] w-[120px] md:h-auto md:w-auto py-3 px-1 bg-[#D9D9D9] rounded' /> */}
                <div className='space-y-0 md:space-y-3'>
                   {videoChartData?.video_name || audioChartData?.Audio_name || AVChartData?.Audio_name &&  <span className='text-md md:text-[20px] font-[600]'>{videoChartData?.video_name || audioChartData?.Audio_name || `${AVChartData?.Audio_name}  ${AVChartData?.Video_name}` }</span>}
                    <div className='flex gap-2 pl-1'>
                        {tabs.length > 1 ? <FilmIcon className="-ml-1.5 h-5 w-5 mt-1 text-[#6B72A1]" aria-hidden="true" /> : <MicrophoneIcon className="-ml-1.5 h-5 w-5 mt-1 text-[#6B72A1]" aria-hidden="true" />}
                        <span className='text-[#6B72A1] font-[400]'>{tabs.length > 1 ? "Video" : "Audio"}</span>
                    </div>
                    {/* <div className='flex gap-2 sm:gap-6 pl-1'>
                        <div className='flex gap-2'>
                            <DocumentIcon className="-ml-1.5 h-5 w-5 text-[#6B72A1]" aria-hidden="true" />
                            <span className='text-[#6B72A1] font-[400]'>3.7 MB</span>
                        </div>
                        <div className='flex gap-2'>
                            <ClockIcon className="-ml-1.5 h-5 w-5 text-[#6B72A1]" aria-hidden="true" />
                            <span className='text-[#6B72A1] font-[400]'>00.06</span>
                        </div>
                    </div> */}
                </div>
            </div>
            {tabs.length > 1 ? <div className="relative border-b-2 border[#BAC5CE] pb-5 sm:pb-0">
                <div className="mt-4">
                    <div className="sm:hidden">
                        <label htmlFor="current-tab" className="sr-only">
                            Select a tab
                        </label>
                        <select
                            id="current-tab"
                            name="current-tab"
                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                            defaultValue={tabs.find((tab) => tab.current).name}
                            onChange={(event) => handleSelectChange(event.target.value)}
                        >
                            {tabs.map((tab, index) => (
                                <option value={tab.name} key={index}>{tab.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="hidden sm:block">
                        <nav className="-mb-px flex">
                            {tabs.map((tab, index) => (
                                <span
                                    key={index}
                                    className={classNames(
                                        tab.current
                                            ? 'border-[#1C64F2] text-[#1C64F2]'
                                            : 'border-transparent text-[#374151] hover:border-gray-300 hover:text-gray-700',
                                        'whitespace-nowrap border-b-[2.5px] px-[10px] lg:px-[40px] pb-4 text-[16px] font-[600] cursor-pointer'
                                    )}
                                    aria-current={tab.current ? 'page' : undefined}
                                    onClick={() => handleSelectChange(tab.name)}
                                >
                                    {tab.name}
                                </span>
                            ))}
                        </nav>
                    </div>
                </div>
            </div> : null}
            <div className=' bg-white mt-[28px] '>
                <div className="flex flex-col items-center md:flex-row gap-y-[27px] md:gap-y-0  md:gap-[27px]">

                    <div className='w-full md:w-[1020px] flex flex-col '>
                        {tabs.map((items) => (items.current === true && items.name === "NSS Statistics" ? <div className='self-center'>
                            <NssStatisticsTab setSubType={setSubType} />
                        </div> : null))}
                        {
                            tabs.map((items, index) => {
                                return items.current === true ? <div key={index}>
                                    <ReportCharts data={items.name} chartData={chartData} subType={subType} />
                                </div> : null
                            })
                        }
                    </div>
                    <div className='grow w-full md:w-[305px]   '>
                        <section className=" bg-white  rounded">
                            <div className=" shadow rounded ">
                                <div className=" flow-root  h-[410px] overflow-y-auto md:overflow-x-clip">
                                    <div className=" -my-2 overflow-x-auto    sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                            <table className="min-w-full divide-y divide-gray-300">
                                                <thead>
                                                    <tr className="bg-gray-50">
                                                        {tabs.map((items, index) => (items.current === true && items.name !== "Blackout" ? <th key={index} scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-[#6B7280] sm:pl-3">
                                                            Frame Number
                                                        </th> : null))}
                                                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-[#6B7280]">
                                                            {tabs.map((items) => (items.current === true && items.name === "Blackout" ? "Blackout Frames" : items.current === true && items.name === "Freezes" ? "Timeframes" : items.current === true && items.name))}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                    {chartFullData && chartFullData[0]?.map((elements, index) => (
                                                        <tr key={index} className="even:bg-gray-50">
                                                            {tabs.map((items, indexvalue) => (items.current === true && items.name === "Blackout" ? Number(elements) < 10 && <td key={indexvalue} className="whitespace-nowrap px-3 py-4 text-[14px] font-[400] text-[#6B7280] text-center">{chartFullData[1][index]}</td> : null))}
                                                            {tabs.map((items, indexvalue) => (items.current === true && items.name !== "Blackout" && <td key={indexvalue} className={`whitespace-nowrap px-3 py-4 text-[14px] font-[400]  text-center ${items.current === true && items.name === "Video Buffer" && Number(elements) > 0.1 ? "text-red-400" : "text-[#6B7280]"}`}>{chartFullData[1][index]}</td>))}
                                                            {tabs.map((items, indexvalue) => (items.current === true && items.name !== "Blackout" ? <td key={indexvalue} className={`whitespace-nowrap px-3 py-4 text-[16px] font-[500]  text-center  ${items.current === true && items.name === "Video Buffer" && Number(elements) > 0.1 ? "text-red-400" : "text-[#111827]"}`}>{elements}</td> : null))}
                                                        </tr>
                                                    ))}
                                                    {chartFullData && chartFullData[0]?.length === 0 &&
                                                        <>
                                                            <tr className='animate-pulse'>
                                                                <td className="whitespace-nowrap px-3 py-4 "><div className="h-12 bg-gray-300 rounded"></div></td>
                                                                <td className="whitespace-nowrap px-3 py-4 "><div className="h-12 bg-gray-300 rounded"></div></td>
                                                            </tr>
                                                            <tr className='animate-pulse'>
                                                                <td className="whitespace-nowrap px-3 py-4 "><div className="h-12 bg-gray-300 rounded"></div></td>
                                                                <td className="whitespace-nowrap px-3 py-4 "><div className="h-12 bg-gray-300 rounded"></div></td>
                                                            </tr>
                                                            <tr className='animate-pulse'>
                                                                <td className="whitespace-nowrap px-3 py-4 "><div className="h-12 bg-gray-300 rounded"></div></td>
                                                                <td className="whitespace-nowrap px-3 py-4 "><div className="h-12 bg-gray-300 rounded"></div></td>
                                                            </tr>
                                                            <tr className='animate-pulse'>
                                                                <td className="whitespace-nowrap px-3 py-4 "><div className="h-12 bg-gray-300 rounded"></div></td>
                                                                <td className="whitespace-nowrap px-3 py-4 "><div className="h-12 bg-gray-300 rounded"></div></td>
                                                            </tr>


                                                        </>
                                                    }
                                                </tbody>
                                            </table>
                                            {/* <div>{tabs.map((items) => (items.current === true && items.name === "Blackout" && checkBlackout &&  String(checkBlackout)))}</div>   */}

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                {audioOverAllData && audioOverAllData.length > 0 && <div className='bg-white mt-[28px]'>
                    <div><span className='font-bold'>Mean SNR : </span> {audioOverAllData[0] === "undefined" ? "" : audioOverAllData[0] === "-Infinity" ? -11 : audioOverAllData[0]}</div>
                    <div><span className='font-bold'>OverAll Classification : </span> {audioOverAllData[1] || ""}</div>
                </div>}
            </div>
        </section>
    )
}