import React from "react";

export default function Circle({ bgColor }) {
  return <div className={`h-5 w-5 shadow-md rounded-full ${bgColor}`}></div>;
}
