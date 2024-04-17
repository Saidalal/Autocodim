import React from "react";
import AudioVideoAnalyticsImg from "../assets/images/AudioVideoAnalytics.svg";
import AudioVideoSync from "../assets/images/AudioVideoSync.svg";
import AudioTestingImg from "../assets/images/AudioTesting.svg";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const videoTesting = [
  { name: "Video Buffer", current: true },
  { name: "Blurriness", current: false },
  { name: "Freezes", current: false },
  { name: "Blackout", current: false },
  { name: "Resolution", current: false },
  { name: "NSS Statistics", current: false },
];

const videoAudioSync = [
  { name: "Video Timestamp", current: true },
  { name: "Audio Timestamp", current: false },
  { name: "Time Difference", current: false },
];

const AudioTesting = [{ name: "Audio SNR", current: true }];

const data = [
  {
    name: "Video Testing",
    img: AudioVideoAnalyticsImg,
    content:
      "",
    tabs: videoTesting,
  },
  {
    name: "Audio Testing",
    img: AudioTestingImg,
    content:
      "",
    tabs: AudioTesting,
  },
  {
    name: "Video & Audio Sync",
    img: AudioVideoSync,
    content:
      "",
    tabs: videoAudioSync,
  },
];

const AudioVideoAnalytics = () => {
  const navigate = useNavigate();
  const handleClick = (tabs) => {
    navigate("/Reports", { state: { customProps: tabs } });
  };

  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex flex-col items-center mt-16 gap-8">
        <div className="mx-10 lg:mx-0 mt-[71px] lg:w-[960px] box-border">
          <div className="text-[#1C64F2] md:text-[30px] lg:text-[44px] font-[700] text-2xl    ">
            End-to-End Audio and Video Quality Testing
          </div>
          <p className="text-[#1F2A37] text-sm md:text-lg font-[400] mt-[17px]  min-w-min">
            Customize these services to your specific requirements by selecting
            the complete audio and video testing process or a specific phase of
            the process
          </p>
        </div>
        <div className="flex flex-col space-y-[50px] mb-10 md:mb-4 md:space-y-[0px] md:flex-row mt-[51px] md:space-x-[50px] items-center mx-10">
          {/*Video & Audio Sync  */}
          {data.map((testingType, index) => (
            <div
              key={index}
              onClick={() => handleClick(testingType.tabs)}
              className="relative cursor-pointer group"
            >
              <img
                className="mx-auto h-auto w-auto"
                src={testingType.img}
                alt=""
              />
              <div>
                <div className="absolute top-[35px] text-center text-white text-[24px] font-[600] w-[100%]">
                  <div>{testingType.name}</div>
                </div>
                <div className="absolute  bottom-[26px] w-[100%] flex justify-center ">
                  <div className="px-6 rounded text-black bg-white py-2 text-lg font-semibold w-min antialiased whitespace-nowrap group hidden group-hover:block">
                    Open Now
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioVideoAnalytics;
