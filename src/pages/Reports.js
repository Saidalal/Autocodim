import Navbar from './Navbar'
import ReportTypesNavigation from './ReportTypesNavigation'
import { useEffect, useState } from 'react'
import ReportHistory from './ReportHistory'
import { useLocation } from 'react-router-dom'
import { getHelper } from '../Api'
import { AUDIO_ANALYSIS, AV_ANALYSIS, VIDEO_ANALYSIS } from '../routes/path'


export default function Reports() {
    const location = useLocation()
    const tabs = location.state?.customProps;
    const [selectOption, setselectOption] = useState({ Testing: true, Last30Days: false, AllTime: false })
    const handleClick = (name, selection) => {
        setselectOption({ VideoTesting: false, Last30Days: false, AllTime: false })
        setselectOption((prevState) => ({
            ...prevState, [name]: selection
        }))
    }

    const [videoreports30DaysData, setvideoreports30DaysData] = useState([])
    const [videoreportsAllData, setvideoreportsAllData] = useState([])
    const [audioreports30DaysData, setaudioreports30DaysData] = useState([])
    const [audioreportsAllData, setaudioreportsAllData] = useState([])
    const [AVreports30DaysData, setAVreports30DaysData] = useState([])
    const [AVreportsAllData, setAVreportsAllData] = useState([])

    const [videoChartData, setvideoChartData] = useState([])
    const [audioChartData, setaudioChartData] = useState([])
    const [AVChartData, setAVChartData] = useState([])

    useEffect(() => {
        if (tabs[0].name === "Video Buffer") {
            getHelper(VIDEO_ANALYSIS.VIDEO_ANALYSIS_30DAYS, setvideoreports30DaysData)
            getHelper(VIDEO_ANALYSIS.VIDEO_ANALYSIS_ALL, setvideoreportsAllData)
            getHelper(VIDEO_ANALYSIS.VIDEO_ANALYSIS_LATEST, setvideoChartData)
        }
        else if (tabs[0].name === "Audio SNR") {
            getHelper(AUDIO_ANALYSIS.AUDIO_ANALYSIS_30DAYS, setaudioreports30DaysData)
            getHelper(AUDIO_ANALYSIS.AUDIO_ANALYSIS_ALL, setaudioreportsAllData)
            getHelper(AUDIO_ANALYSIS.AUDIO_ANALYSIS_LATEST, setaudioChartData)

        }
        else if (tabs[0].name === "Video Timestamp") {
            getHelper(AV_ANALYSIS.AV_ANALYSIS_30DAYS, setAVreports30DaysData)
            getHelper(AV_ANALYSIS.AV_ANALYSIS_ALL, setAVreportsAllData)
            getHelper(AV_ANALYSIS.AV_ANALYSIS_LATEST, setAVChartData)
        }


    }, [])


    useEffect(() => {
       
    }, [videoreports30DaysData, videoreportsAllData, audioreports30DaysData, audioreportsAllData, AVreports30DaysData, AVreportsAllData, videoChartData,audioChartData,AVChartData])
    return (
        <div >
            <Navbar />
            <div className="flex flex-row items-center gap-6 h-auto md:h-[56px]  shadow  px-4 sm:flex-nowrap sm:px-6 lg:px-[20px] bg-white border-t-2">
                <div className="flex-col order-first gap-y-[10px] my-2 md:my-0 md:gap-y-[0px] flex md:flex-row w-full gap-x-[30px] text-[20px] font-[600] leading-6 sm:order-none sm:w-auto  sm:border-gray-200  sm:leading-7">
                    <div className={[selectOption.Testing === true ? "text-[#1C64F2] cursor-pointer" : "text-gray-700 cursor-pointer"]} onClick={() => handleClick("Testing", true)}>
                        {tabs.length === 6 ? "Video Testing" : tabs.length === 1 ? "Audio Testing" : "Video/Audio Sync"}
                    </div>
                    <div className={[selectOption.Last30Days === true ? "text-[#1C64F2] cursor-pointer" : "text-gray-700 cursor-pointer"]} onClick={() => handleClick("Last30Days", true)}>
                        Last 30 days
                    </div>
                    <div className={[selectOption.AllTime === true ? "text-[#1C64F2] cursor-pointer" : "text-gray-700 cursor-pointer"]} onClick={() => handleClick("AllTime", true)}>
                        All-time
                    </div>
                </div>

            </div>
            {/* <div>
                    <img src={UploadVideo} className='h-auto w-auto py-3 px-1 bg-[#D9D9D9] rounded' />
                    <div>
                        <span>Audio.MP3</span>
                    </div>
            </div> */}
            {selectOption.Testing ? <ReportTypesNavigation tabsData={tabs} videoChartData={videoChartData} audioChartData={audioChartData} AVChartData={AVChartData} /> : null}
            {selectOption.Last30Days ? <ReportHistory selectOption={selectOption} setselectOption={setselectOption} setvideoChartData={setvideoChartData} setaudioChartData={setaudioChartData} setAVChartData={setAVChartData} data={tabs[0].name === "Video Buffer" ? videoreports30DaysData : tabs[0].name === "Audio SNR" ? audioreports30DaysData : AVreports30DaysData} /> : null}
            {selectOption.AllTime ? <ReportHistory selectOption={selectOption} setselectOption={setselectOption} setvideoChartData={setvideoChartData} setaudioChartData={setaudioChartData} setAVChartData={setAVChartData} data={tabs[0].name === "Video Buffer" ? videoreportsAllData : tabs[0].name === "Audio SNR" ? audioreportsAllData : AVreportsAllData} /> : null}

        </div>
    )
}
