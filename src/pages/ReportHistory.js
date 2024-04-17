

export default function ReportHistory({ data, setvideoChartData, setaudioChartData, setAVChartData, setselectOption, selectOption }) {
    const handleSet = (items) => {
        if (Object(items).hasOwnProperty("video_name")) {
            setselectOption({ Testing: true, Last30Days: false, AllTime: false })
            setvideoChartData(items)
        }
        else if (Object(items).hasOwnProperty("Audio_SNR")) {
            setselectOption({ Testing: true, Last30Days: false, AllTime: false })
            setaudioChartData(items)
        }
        else if (Object(items).hasOwnProperty("Video_Audio_Sync_timeframes")) {
            setselectOption({ Testing: true, Last30Days: false, AllTime: false })
            setAVChartData(items)
        }
    }

    return (
        <section className="p-6 bg-white mx-[20px] my-[10px] rounded">
            <div className="px-4 sm:px-6 lg:px-8 shadow py-4 rounded">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className=" text-[20px] font-[600]  leading-6 text-gray-900">{selectOption?.Last30Days === true ? "Last 30 days Testings" : "All-time Testings "}</h1>
                        <p className="mt-2 text-[14px] font-[400] text-[#6B7280]">
                            {selectOption?.Last30Days === true ? "This is a list of latest tested items" : "This is a list of all time tested items"}
                        </p>
                    </div>

                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#6B7280] sm:pl-3">
                                            Tested items
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-[#6B7280]">
                                            DATE & TIME
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-[#6B7280]">
                                            Types
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-[#6B7280]">
                                            Status
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-[#6B7280]">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                {data.length === 0 ?
                                    <tbody className="bg-white">
                                        <tr className="animate-pulse even:bg-gray-50">
                                            <td className="whitespace-nowrap px-3 py-4 "><div className="h-96 bg-gray-300 rounded"></div></td>
                                            <td className="whitespace-nowrap px-3 py-4 "><div className="h-96 bg-gray-300 rounded"></div></td>
                                            <td className="whitespace-nowrap px-3 py-4 "><div className="h-96 bg-gray-300 rounded"></div></td>
                                            <td className="whitespace-nowrap px-3 py-4 "><div className="h-96 bg-gray-300 rounded"></div></td>
                                            <td className="whitespace-nowrap px-3 py-4 "><div className="h-96 bg-gray-300 rounded"></div></td>
                                        </tr>
                                      
                                    </tbody>
                                    : data?.sort((a, b) => new Date(b?.timestamp) - new Date(a?.timestamp))?.map((items) => (
                                        <tbody className="bg-white">
                                            <tr key={items.id} className="even:bg-gray-50">
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-[14px] font-[400] text-[#111827] sm:pl-3">
                                                    {items.video_name || items.Audio_name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-[14px] font-[400] text-[#6B7280]">{items.timestamp}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-[16px] font-[500] text-[#111827]">{Object(items).hasOwnProperty("video_name") ? "Video" : Object(items).hasOwnProperty("Audio_SNR") ? "Audio" : "Audio"}</td>
                                                <td className="whitespace-nowrap px-1 py-3 text-sm text-gray-500">
                                                    <span className="inline-flex items-center rounded-full  px-2 py-1 text-xs font-medium text-[#08B839] ring-1 ring-[#08B839]">
                                                        Completed
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-[12px] font-[400] "><div onClick={() => handleSet(items)} className="text-[#2563EB] cursor-pointer hover:text-indigo-900">
                                                    Open
                                                </div></td>

                                            </tr>
                                        </tbody>
                                    ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
