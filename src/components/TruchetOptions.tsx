import type { TruchetOptions as TruchetOptionsType } from "../lib/types";
import { TileStyle } from "../lib/tilestyle";
import "../css/TruchetOptions.css";

const STYLE_OPTIONS = Object.values(TileStyle).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export default function TruchetOptions({
  options,
  onChange,
  onSubmit,
}: {
  options: TruchetOptionsType;
  onChange: (options: TruchetOptionsType) => void;
  onSubmit: () => void;
}) {
  const setOption = <K extends keyof TruchetOptionsType>(
    key: K,
    value: TruchetOptionsType[K],
  ) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="truchet-options">
      <h2>Enter your word to render</h2>
      <div className="options-grid">
        <label className="option-group">
          <span className="option-label">Text</span>
          <div className="text-with-submit">
            <input
              type="text"
              value={options.word}
              onChange={(e) => setOption("word", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              placeholder="Enter text to render"
              aria-label="Text to render"
            />
            <button type="button" onClick={onSubmit}>
              Render
            </button>
          </div>
        </label>

        <label className="option-group">
          <span className="option-label">Style</span>
          <select
            value={options.style}
            onChange={(e) => setOption("style", e.target.value as TileStyle)}
            aria-label="Rendering style"
          >
            {STYLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="option-group option-checkbox">
          <input
            type="checkbox"
            checked={options.inverted}
            onChange={(e) => setOption("inverted", e.target.checked)}
            aria-label="Render inverted word"
          />
          <span>Inverted word</span>
        </label>

        <label className="option-group option-checkbox">
          <input
            type="checkbox"
            checked={options.initTileFlipped}
            onChange={(e) => setOption("initTileFlipped", e.target.checked)}
            aria-label="First tile is hourglass"
          />
          <span>Rotated tiles (90°)</span>
        </label>
      </div>
    </div>
  );
}
