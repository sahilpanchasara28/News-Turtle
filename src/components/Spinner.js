import React from "react";
import loading from "./loading.gif";

export default function Spinner() {
  return (
    <div className="text-center">
      <img className="mt-2" src={loading}  alt="Loading..."/>
    </div>
  );
}
