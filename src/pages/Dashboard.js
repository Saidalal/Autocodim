import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import AudioVideoAnalytics from "../assets/images/AudioVideoAnalytics.svg";
import FunctionalTesting from "../assets/images/FunctionalTesting.svg";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center mt-[71px]">
        <div className="space-y-[20px]">
          <h1 className="text-[#1C64F2] md:text-[44px] font-[700] text-2xl text-center">
            Welcome to AutoCodium !
          </h1>
          <h6 className="text-[#686868] text-lg md:text-[24px] font-[500] text-center">
            Experience the power of automation
          </h6>
        </div>
        <div className="flex flex-col space-y-[50px] mb-10 md:mb-0 md:flex-row md:space-x-[50px] md:space-y-[0px] items-center mx-10 mt-[71px]">
          {/* Audio/Video Analytics */}
          <Link to="/audio-video-analytics">
            <div className="relative group">
              <img
                className="mx-auto h-auto w-auto"
                src={AudioVideoAnalytics}
                alt=""
              />
              <div className="absolute top-[35px] text-center text-white text-[24px] font-semibold w-[100%]">
                <div>Audio/Video</div>
                <div>Analytics</div>
              </div>
              <div className="absolute  bottom-[26px] w-[100%] flex justify-center ">
                <div className="px-6 rounded text-black bg-white py-2 text-lg font-semibold w-min antialiased whitespace-nowrap group hidden group-hover:block">
                  Open Now
                </div>
              </div>
            </div>
          </Link>

          {/* Functional Testing */}
          <Link to="/functionalTesting">
            <div className="relative group">
              <img
                className="mx-auto h-auto w-auto"
                src={FunctionalTesting}
                alt=""
              />
              <div className="absolute top-[35px] text-center text-white text-[24px] font-semibold w-[100%]">
                <div>Functional Testing</div>
              </div>
              <div className="absolute  bottom-[26px] w-[100%] flex justify-center ">
                <div className="px-6 rounded text-black bg-white py-2 text-lg font-semibold w-min antialiased whitespace-nowrap group hidden group-hover:block">
                  Open Now
                </div>
              </div>
            
            </div>
          </Link>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Dashboard;
