"use client";

import { useEffect, useState } from "react";

export const TextInput = ({
  id,
  value,
  setValue,
  placeholder,
  type = "text",
}: any) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(value !== "");
  }, [value]);

  const handleTextChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative border-b w-full mb-8">
      {type === "textarea" ? (
        <textarea
          className={`py-2 px-3 w-full focus:outline-none ${
            isActive ? "pt-6" : ""
          }`}
          id={id}
          value={value}
          onChange={handleTextChange}
          required
        />
      ) : (
        <input
          className={`py-2 px-3 w-full focus:outline-none ${
            isActive ? "pt-6" : ""
          }`}
          id={id}
          type={type}
          value={value}
          onChange={handleTextChange}
          required
        />
      )}
      <label
        htmlFor={id}
        className={`absolute left-3 top-0 transition-all ${
          isActive ? "text-xs text-gray-500" : "mt-2 text-base text-gray-400"
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
};
