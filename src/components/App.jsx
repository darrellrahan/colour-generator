import React, { useEffect, useState } from "react";
import Values from "values.js";
import Colour from "./Colour";

const App = () => {
  const [inputColour, setInputColour] = useState("#0000ff");
  const [colours, setColours] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const defColours = new Values("#0000ff").all(10);
    setColours(defColours);
  }, []);

  const handleChange = (e) => setInputColour(e.target.value);
  const handleSubmit = (e) => {
    try {
      const newColours = new Values(inputColour).all(10);
      setColours(newColours);
      setError(null);
    } catch (err) {
      setError(err.message);
      setColours([]);
    }
    e.preventDefault();
  };

  const getTextColour = (i) => {
    const textColour = new Values("#102a42").all(10);
    const lastIndex = textColour.length - 1;
    const { hex } = textColour[lastIndex - i];
    return hex;
  };

  return (
    <div className="App">
      <div className="top">
        <div className="title">
          <h1>Colour Generator</h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              type={"text"}
              autoComplete={"off"}
              placeholder={"#0000ff"}
              onChange={handleChange}
            />
            <input type={"submit"} value={"Submit"} />
          </form>
        </div>
      </div>
      {error && (
        <h1 className="err-text">
          Invalid Input!<span>({error})</span>
        </h1>
      )}
      {colours.length !== 0 && (
        <div className="colour-wrap">
          {colours.map((e, i) => {
            const { hex, weight } = e;
            return (
              <Colour
                key={i}
                hex={hex}
                weight={weight}
                textColour={i >= 10 ? "fff" : getTextColour(i)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
