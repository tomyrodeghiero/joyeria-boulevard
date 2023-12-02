import { BOT_ICON } from "@/utils/constants";
import { useEffect, useState } from "react";

export const TextInput = ({
  id,
  value,
  setValue,
  label,
  type = "text",
  placeholder = "",
  ai = false,
  productName = "",
}: any) => {
  const handleTextChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative border-b w-full mb-10">
      <div className="flex items-center gap-4 mb-2">
        <p className="font-medium text-[0.95rem]">{label}</p>
        {ai && (
          <img
            onClick={async () => {
              const response = await fetch("/api/chatbot", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ product: productName }),
              });

              if (response.ok) {
                const responseData = await response.json(); // Await the json promise
                setValue(responseData);
              } else {
                alert("error");
              }
            }}
            className="h-6 lg:h-7 z-20 cursor-pointer"
            src={BOT_ICON}
            alt="Bot"
          />
        )}
      </div>
      {type === "textarea" ? (
        <textarea
          className={`py-2 px-3 w-full rounded focus:outline-none border border-gray-300 resize-none h-32 focus:border-blue-500`}
          id={id}
          value={value}
          onChange={handleTextChange}
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          className={`py-2 px-3 w-full focus:outline-none rounded border border-gray-300 focus:border-blue-500 relative z-10`}
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
