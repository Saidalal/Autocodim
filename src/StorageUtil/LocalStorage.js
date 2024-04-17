import React from "react";

const LocalStorage = {
  isLoggedIn: () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn === "true";
  },
  getId: () => {
    return localStorage.getItem("id");
  },
  getName: () => {
    return localStorage.getItem("name");
  },
  getOfficialEmail: () => {
    return localStorage.getItem("officialEmail");
  },
  getPassword: () => {
    return localStorage.getItem("password");
  },

  login: (responseData) => {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("id", responseData.id);
    localStorage.setItem("name", responseData.name);
    localStorage.setItem("officialEmail", responseData.officialEmail);
    localStorage.setItem("password", responseData.password);
  },
  logout: () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("officialEmail");
    localStorage.removeItem("password");
  },
};

export default LocalStorage;
