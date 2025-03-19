import React from "react";

const PhoneDisplayContainer = ({ children, title }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      {children}
    </div>
  );
};

export default PhoneDisplayContainer;
