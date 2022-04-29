import React from "react";

export const Layout = ({ children }) => {
  return (
    <div className="App flex flex-col w-screen h-screen justify-center items-center">
      <div className=" w-11/12 bg-white h-105 rounded-md p-12 pb-14 flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};
