"use client";

import React, { useState } from "react";

const PriceSlider = ({ onFilter }: any) => {
  const [value, setValue] = useState(1000);
  const min = 1000;
  const max = 20000;

  const handleSliderChange = (e: any) => {
    setValue(Number(e.target.value));
    onFilter(Number(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="my-5">
      <div className="mt-1">
        <div
          className="slider-container"
          style={{
            height: "2px",
            width: "100%",
            backgroundColor: "#d8d8d8",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "2px",
              background: "black",
              width: `${percentage}%`,
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <input
            type="range"
            id="price"
            name="price"
            min="1000"
            max="20000"
            step="500"
            value={value}
            className="slider"
            onChange={handleSliderChange}
            style={{
              width: "100%",
              height: "10px",
              position: "absolute",
              left: "0",
              top: "0",
              opacity: "0",
              cursor: "pointer",
            }}
          />
        </div>
        <div className="flex justify-between mt-2 items-center text-[0.825rem] font-regular">
          <label htmlFor="price" className="text-gray-700">
            Precio: ${value} - ${value}
          </label>
          <p className="text-yellow-800">Filtro</p>
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
