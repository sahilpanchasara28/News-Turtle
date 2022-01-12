import React, { useState } from "react";
import loading from "./loading.gif";

export default function Spinner() {
  const [add, setadd] = useState("");
  setTimeout(() => {
    setadd("d-none");
  }, 2000);

  return (
    <div className="text-center">
      <img className={`mt-2 ${add}`} src={loading} />
    </div>
  );
}
