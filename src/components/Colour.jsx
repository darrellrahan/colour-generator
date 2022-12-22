import React, { useEffect, useState } from "react";

const Colour = (prop) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    setInterval(() => {
      isCopied && setCopyMessage("");
      setIsCopied(false);
    }, 2000);
  }, [isCopied]);

  const { hex, weight, textColour } = prop;
  return (
    <div
      className="colour"
      style={{ backgroundColor: `#${hex}`, color: `#${textColour}` }}
      onClick={() => {
        navigator.clipboard.writeText(`#${hex}`);
        setCopyMessage("COPIED TO CLIPBOARD");
        setIsCopied(true);
      }}
    >
      <div className="text">
        <p>{weight}%</p>
        <p>#{hex}</p>
        {copyMessage !== "" && <p className="copy-message">{copyMessage}</p>}
      </div>
    </div>
  );
};

export default Colour;
