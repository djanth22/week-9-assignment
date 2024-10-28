"use client";

import { useState } from "react";

export default function DelButton() {
  const [showInfo, SetShowInfo] = useState(false);

  function handleClick() {
    SetShowInfo(!showInfo);
  }

  return (
    <>
      {showInfo ? (
        <button id="del-button" type="submit">
          delete
        </button>
      ) : null}
      <p
        onClick={handleClick}
        className="bg-slate-200 text-red-300 cursor-pointer flex items-center w-20 justify-center rounded-2xl m-3 p-1"
      >
        X
      </p>
    </>
  );
}
