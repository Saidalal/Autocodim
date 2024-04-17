import React, { Fragment, useState } from "react";
import Navbar from "./Navbar";
import { Menu, Transition } from "@headlessui/react";
import {
  Web,
  Android,
  Apple,
  MobileWeb,
  Tizen,
  LGWebOS,
} from "../assets/images";
import axios from "axios";
import JobTriggeredDialog from "./JobTriggeredDialog";
import LocalStorage from "../StorageUtil/LocalStorage";
const stats = [
  { id: 1, name: "WEB", type: "Functional Testing", icon: Web },
  { id: 2, name: "Mobile Web", type: "Functional Testing", icon: MobileWeb },
  { id: 3, name: "Android App", type: "Functional Testing", icon: Android },
  { id: 4, name: "IOS App", type: "Functional Testing", icon: Apple },
  { id: 5, name: "Android TV", type: "Functional Testing", icon: Android },
  { id: 6, name: "LG WEBOS TV", type: "Functional Testing", icon: LGWebOS },
  { id: 7, name: "Tizen TV", type: "Functional Testing", icon: Tizen },
  { id: 8, name: "Apple TV", type: "Functional Testing", icon: Apple },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const menu = [
  { id: 1, name: "Demo", href: "a" },
  { id: 2, name: "Smoke", href: "b" },
  { id: 3, name: "Sanity", href: "c" },
  { id: 4, name: "Regression", href: "d" },
];

const FunctionalTesting = () => {
  const [selectedStat, setSelectedStat] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  const apiEndpoints = {
    WEB: `${process.env.REACT_APP_BACKEND_URL}api/trigger/sony-web-chrome`,
    "Mobile Web": `${process.env.REACT_APP_BACKEND_URL}api/trigger/sony-android-web-chrome`,
    "Android App": `${process.env.REACT_APP_BACKEND_URL}api/trigger/sony-android-app`,
    "IOS App": `${process.env.REACT_APP_BACKEND_URL}api/trigger/sony-ios-app`,
    "Android TV": `${process.env.REACT_APP_BACKEND_URL}api/trigger/sony-android-tv`,
    "LG WEBOS TV": `${process.env.REACT_APP_BACKEND_URL}api/trigger/sony-lg-tv`,
    "Tizen TV": ``,
    "Apple TV": ``,
  };

  const triggerApi = async (statName) => {
    const apiUrl = apiEndpoints[statName];
    if (apiUrl) {
      try {
        const authToken = LocalStorage.getPassword();
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
        const response = await axios.post(apiUrl, null, { headers });
        setApiResponse(response.status);
        console.log(response);
        setShowDialog(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(`No API endpoint found for ${statName}`);
    }
  };

  const handleMenuClick = (statName, menuItemName) => {
    setSelectedStat(statName);
    setSelectedMenuItem(menuItemName);
    triggerApi(statName);
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="space-y-6 mt-[71px]  mb-5">
        <h1 className="text-[#1B71F5] md:text-[53px] font-[700] text-2xl text-center">
          Functional Testing
        </h1>
        <h6 className="text-black text-lg md:text-[18px] font-[400] text-center">
          The aim is to create higher levels of abstraction around the core{" "}
          library's functionality so that <br /> the framework is more
          user-friendly and versatile.
        </h6>
      </div>
      <div className="mx-[20px] ">
        <dl className="mt-[38px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
          {stats.map((item) => (
            <div
              key={item.id}
              className="relative rounded-lg md:mx-[15px] mb-[20px] md:mb-[95px] bg-white px-4 pb-20 pt-5 shadow-lg sm:px-6 sm:pt-8 "
            >
              <dt>
                <div className="absolute rounded-md bg-white border-2 border-gray-400 p-3">
                  <img
                    src={item.icon}
                    className="h-8 w-8 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-20 truncate text-[18px] font-[500] text-black">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-20 flex items-baseline pb-6 sm:pb-7">
                <div className="flex flex-col">
                  <p className="text-[12px] font-[400] text-[#6B72A1]">
                    {item.name}
                  </p>
                  <p className="text-[12px] font-[400] text-[#6B72A1]">
                    {item.type}
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50  py-4 rounded-b-lg ">
                  <div className="text-sm text-center flex flex-col self-center">
                    <Menu as="div" className="relative inline-block ">
                      <div>
                        <Menu.Button className="inline-flex  gap-x-1.5 font-medium text-indigo-600 hover:text-indigo-500">
                          View All
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute  z-10 mt-5 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {menu.map((menuItem) => (
                              <Menu.Item key={menuItem.id}>
                                {({ active }) => (
                                  <span
                                    className={classNames(
                                      active
                                        ? "bg-[#1B71F5] text-white"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm cursor-pointer"
                                    )}
                                    onClick={() =>
                                      handleMenuClick(item.name, menuItem.name)
                                    }
                                  >
                                    {menuItem.name}
                                  </span>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {showDialog && (
        <JobTriggeredDialog
          menuItem={selectedMenuItem}
          open={showDialog}
          setOpen={setShowDialog}
          apiResponse={apiResponse}
        />
      )}
    </div>
  );
};

export default FunctionalTesting;
