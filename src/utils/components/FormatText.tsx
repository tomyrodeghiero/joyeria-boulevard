import { useState, useEffect } from "react";

export const FormatText = ({ text, className }: any) => {
  const [cleanedText, setCleanedText] = useState("");

  useEffect(() => {
    function removeHTMLText(html: string) {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    }

    setCleanedText(removeHTMLText(text));
  }, [text]);

  return cleanedText.split("\r\n").map((line: string, i: number) => (
    <p key={i} className={className}>
      {line}
    </p>
  ));
};
