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
  const handleTextChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative border-b w-full mb-8">
      <p className="font-medium mb-2 text-[0.95rem]">{label}</p>
      <button
        onClick={async () => {
          const response = await fetch("/api/chatbot", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ product: value }),
          });

          if (response.ok) {
            const responseData = await response.json(); // Await the json promise
            console.log("response", responseData);
            setValue(responseData);
          } else {
            alert("error");
          }
        }}
        className="bg-white rounded-lg shadow"
      >
        AI
      </button>
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
