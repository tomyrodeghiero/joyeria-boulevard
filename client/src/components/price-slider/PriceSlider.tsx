"use client";

import { formatPriceARS } from "@/utils/functions";
import React, { useState } from "react";

const PriceSlider = ({ onFilter }: any) => {
  const min = 1000;
  const max = 1000000;
  const [valueLow, setValueLow] = useState(min);
  const [valueHigh, setValueHigh] = useState(max);

  const handleSliderChangeLow = (e: any) => {
    setValueLow(Number(e.target.value));
    onFilter([Number(e.target.value), valueHigh]);
  };

  const handleSliderChangeHigh = (e: any) => {
    setValueHigh(Number(e.target.value));
    onFilter([valueLow, Number(e.target.value)]);
  };

  const percentageLow = ((valueLow - min) / (max - min)) * 100;
  const percentageHigh = ((valueHigh - min) / (max - min)) * 100;

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
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: `${percentageLow}%`,
              width: `${percentageHigh - percentageLow}%`,
            }}
          />
          <input
            type="range"
            id="priceLow"
            name="priceLow"
            min={min}
            max={max}
            step="1"
            value={valueLow}
            className="slider"
            onChange={handleSliderChangeLow}
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
          <input
            type="range"
            id="priceHigh"
            name="priceHigh"
            min={min}
            max={max}
            step="1"
            value={valueHigh}
            className="slider"
            onChange={handleSliderChangeHigh}
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
            Precio: {formatPriceARS(valueLow)} - {formatPriceARS(valueHigh)}
          </label>
          {/* <p className="text-yellow-800">Filtro</p> */}
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
