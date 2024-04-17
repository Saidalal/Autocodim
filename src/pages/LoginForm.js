import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import autocodium from "../assets/images/autocodium.svg";
import ifocus from "../assets/images/ifocus.svg";
import login_image from "../assets/images/login_image.svg";
import LocalStorage from "../StorageUtil/LocalStorage";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}login`, {
        login: email,
        password: password,
      })
      .then((response) => {
        LocalStorage.login(response.data);
        navigate("/dashboard");
        setTimeout(() => {
          toast.success("Login successful", {
            position: "top-right",
            toastStyle: { marginTop: "100px" },
          });
        }, 500);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        toast.error("Login Failed");
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col md:flex-row flex-1 items-center justify-around px-4 pt-[100px] sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <img
              className="mx-auto h-10 w-auto"
              src={autocodium}
              alt="Your Company"
            />
            <h2 className="mt-[24px] text-center text-[30px] font-[700] leading-9 tracking-tight text-[#111827]">
              Welcome Back!
            </h2>
            <h3 className="mt-[8px] text-center text-[14px] font-[400] text-[#4B5563]">
              Log in to your account
            </h3>
          </div>
          <form className="space-y-6" action="#" method="POST">
            <div className="relative -space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 px-2.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm leading-6 text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm leading-6">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleLogin}
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="flex justify-center gap-6">
            <p className="text-center text-md font-semibold self-center   text-black">
              Powered by
            </p>
            <img className=" h-10 w-auto" src={ifocus} alt="Your Company" />
          </div>
        </div>
        <img
          className=" h-auto w-auto px-10 "
          src={login_image}
          alt="Your Company"
        />
      </div>
    </>
  );
};

export default LoginForm;
