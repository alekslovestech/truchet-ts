import { useState, useEffect, useMemo } from "react";
import TruchetOptions from "./components/TruchetOptions";
import SvgCanvas from "./components/SvgCanvas";
import type { TruchetOptions as TruchetOptionsType } from "./lib/types";
import { TileStyle } from "./lib/tilestyle";
import { processText } from "./lib/formatter_browser";
import { linesToSvg } from "./svg/lines_to_svg";
import "./App.css";

const DEFAULT_OPTIONS: TruchetOptionsType = {
  word: "word",
  style: TileStyle.BOWTIE,
  inverted: false,
  initTileFlipped: false,
};

function App() {
  const [options, setOptions] = useState<TruchetOptionsType>(DEFAULT_OPTIONS);
  const [submittedOptions, setSubmittedOptions] =
    useState<TruchetOptionsType>(DEFAULT_OPTIONS);
  const [output, setOutput] = useState<string>("");

  const handleSubmit = () => {
    setSubmittedOptions(options);
  };

  useEffect(() => {
    if (!submittedOptions.word.trim()) {
      setOutput("");
      return;
    }
    let cancelled = false;
    processText(submittedOptions.word, options.inverted).then((result) => {
      if (!cancelled) setOutput(result);
    });
    return () => {
      cancelled = true;
    };
  }, [submittedOptions.word, options.inverted]);

  const svgContent = useMemo(() => {
    if (!output) return "";
    const lines = output.split("\n");
    const initTileFlipped = options.initTileFlipped;
    return linesToSvg(lines, initTileFlipped, options.style);
  }, [output, options.initTileFlipped, options.style]);

  return (
    <>
      <TruchetOptions
        options={options}
        onChange={setOptions}
        onSubmit={handleSubmit}
      />
      <div className="output-area">
        <div className="canvas-window">
          {svgContent && <SvgCanvas svg={svgContent} className="svg-canvas" />}
        </div>
      </div>
    </>
  );
}

export default App;
