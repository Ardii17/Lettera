"use client";

import { useRef } from "react";
import { Check, Pipette, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ROMANTIC_COLOR_PRESETS, type ColorPreset } from "@/templates/color-presets";

interface ColorPickerFieldProps {
  value?: string;
  onChange: (hex: string) => void;
  presets?: ColorPreset[];
  label?: string;
  helperText?: string;
  className?: string;
}

export function ColorPickerField({
  value = "#c03a52",
  onChange,
  presets = ROMANTIC_COLOR_PRESETS,
  label,
  helperText,
  className,
}: ColorPickerFieldProps) {
  const nativeColorInputRef = useRef<HTMLInputElement | null>(null);
  const currentColor = value.trim() || "#c03a52";

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let hex = e.target.value.trim();
    if (!hex.startsWith("#")) hex = `#${hex}`;
    onChange(hex);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-seal-700">
          {label}
        </label>
      )}

      {/* Hidden native color picker input */}
      <input
        ref={nativeColorInputRef}
        type="color"
        value={currentColor.length === 7 ? currentColor : "#c03a52"}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
        aria-label="Pilih warna kustom"
      />

      {/* Preset Swatches Grid */}
      <div>
        <p className="text-xs font-semibold text-ink-soft mb-2">
          Pilihan Preset Warna Eksklusif:
        </p>
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 sm:grid-cols-8">
          {presets.map((preset) => {
            const isSelected =
              currentColor.toLowerCase() === preset.value.toLowerCase();
            return (
              <button
                key={preset.value}
                type="button"
                title={`${preset.label} (${preset.value})`}
                onClick={() => onChange(preset.value)}
                className={cn(
                  "group relative flex min-w-0 flex-col items-center justify-center rounded-xl p-1.5 sm:p-2 transition-all hover:scale-105 border",
                  isSelected
                    ? "border-seal-600 ring-2 ring-seal-400 bg-white shadow-sm"
                    : "border-seal-100 bg-white/70 hover:bg-white hover:border-seal-300",
                )}
              >
                <span
                  className="relative flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full shadow-xs transition-transform group-hover:scale-110"
                  style={{ backgroundColor: preset.value }}
                >
                  {isSelected && <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white drop-shadow-sm" />}
                </span>
                <span className="mt-1 text-[9px] sm:text-[10px] font-semibold text-ink truncate w-full text-center">
                  {preset.label.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Color Picker & Hex Input Bar */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-2.5 rounded-xl border border-seal-100 bg-[#fdf8f9] p-2.5 sm:p-3 overflow-hidden">
        {/* Native picker trigger button */}
        <button
          type="button"
          onClick={() => nativeColorInputRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-seal-200 bg-white px-3 py-1.5 text-xs font-semibold text-seal-800 shadow-xs transition-colors hover:bg-seal-50 w-full sm:w-auto"
        >
          <span
            className="h-4 w-4 shrink-0 rounded-full border border-black/10 shadow-inner"
            style={{ backgroundColor: currentColor }}
          />
          <Pipette className="h-3.5 w-3.5 shrink-0 text-seal-600" />
          <span className="truncate">Buka Color Spectrum Wheel</span>
        </button>

        <div className="flex items-center justify-between sm:justify-start gap-2.5 w-full sm:w-auto">
          {/* Hex input */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-medium text-ink-muted shrink-0">HEX:</span>
            <input
              type="text"
              value={currentColor}
              onChange={handleHexChange}
              maxLength={7}
              placeholder="#c03a52"
              className="w-20 sm:w-24 rounded-md border border-seal-200 bg-white px-2 py-1 font-mono text-xs text-ink uppercase focus:border-seal-500 focus:outline-none"
            />
          </div>

          {/* Live Accent Preview Pill */}
          <div className="flex items-center gap-1.5 sm:ml-auto shrink-0">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] sm:text-xs font-semibold shadow-xs whitespace-nowrap"
              style={{
                backgroundColor: `${currentColor}15`,
                color: currentColor,
                border: `1px solid ${currentColor}35`,
              }}
            >
              <Sparkles className="h-3 w-3 shrink-0" />
              Aksen
            </span>

            <span
              className="inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-[11px] sm:text-xs font-bold text-white shadow-xs whitespace-nowrap"
              style={{ backgroundColor: currentColor }}
            >
              Tombol
            </span>
          </div>
        </div>
      </div>

      {helperText && <p className="text-[11px] text-ink-muted">{helperText}</p>}
    </div>
  );
}
