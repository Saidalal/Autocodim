import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/20/solid";
import React from "react";
import Logo from "../assets/images/Logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LocalStorage from "../StorageUtil/LocalStorage";
const Navbar = () => {
  const videoTesting = [
    { name: "Video Buffer", href: "#", current: true },
    { name: "Blurriness", href: "#", current: false },
    { name: "Freezes", href: "#", current: false },
    { name: "Blackout", href: "#", current: false },
    { name: "Resolution", href: "#", current: false },
    { name: "NSS Statistics", href: "#", current: false },
  ];
  const location = useLocation();

  const handleClick = () => {
    window.open("https://dashboard.autocodium.com/", "_blank");
  };

  const showReportsLink =
    location.pathname === "/dashboard" ||
    location.pathname === "/functionalTesting";

  const navigate = useNavigate();

  const handleLogout = () => {
    // Call the logout method from LocalStorage utility
    LocalStorage.logout();
    // Redirect the user to the login page
    navigate("/");
  };

  return (
    <div className="flex justify-between h-[65px] bg-white items-center shadow">
      <div className="flex items-center ">
        <img className="mx-auto h-auto w-auto ml-[20px]" src={Logo} alt="" />
        <Link to={"/dashboard"}>
          <span
            className={` font-[500] text-[14px] ml-[10px] md:ml-[32px] ${location.pathname === "/dashboard"
                ? "text-[#1C64F2]"
                : "text-[#6B7280]"
              }`}
          >
            Home
          </span>
        </Link>
        {showReportsLink && (
          <span
            onClick={handleClick}
            className={` font-[500] text-[14px] ml-[10px] md:ml-[32px] cursor-pointer ${location.pathname === "/Reports"
                ? "text-[#1C64F2]"
                : "text-[#6B7280]"
              }`}
          >
            Reports
          </span>
        )}
      </div>
      <div className="flex items-center gap-[6px]">
        <ArrowLeftEndOnRectangleIcon
          className="h-[24px] w-[24px]"
          aria-hidden="true"
        />
        <Link to={"/"}>
          {" "}
          <span
            className="font-[500] text-[#111827] mr-[25px]"
            onClick={handleLogout}
          >
            Logout
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
