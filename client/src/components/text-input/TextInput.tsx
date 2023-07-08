"use client";

import { useEffect, useState } from "react";

export const TextInput = ({
  id,
  value,
  setValue,
  label,
  type = "text",
  placeholder = "",
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
      <p className="font-medium mb-2 text-[0.95rem]">{label}</p>

      {type === "textarea" ? (
        <textarea
          className={`py-2 px-3 w-full rounded focus:outline-none border border-gray-300 resize-none h-24 focus:border-blue-500`}
          id={id}
          value={value}
          onChange={handleTextChange}
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          className={`py-2 px-3 w-full focus:outline-none rounded border border-gray-300 focus:border-blue-500`}
          id={id}
          type={type}
          value={value}
          onChange={handleTextChange}
          placeholder={placeholder}
          required
        />
      )}
    </div>
  );
};
