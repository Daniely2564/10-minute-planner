import { _500Colors, BgColorWithLightness } from "@custom/types";
import { useEffect, useState } from "react";

interface ColorPickerProps {
  color: BgColorWithLightness;
  onChange?: (color: BgColorWithLightness) => void;
}

const ColorPicker = ({ color: initialColor, onChange }: ColorPickerProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState<BgColorWithLightness>(
    _500Colors.find((bg) => bg.includes(initialColor)) ?? _500Colors[0]
  );
  useEffect(() => {
    onChange?.(color as any);
  }, [color]);
  return (
    <div className="p-1 w-10 h-10 border rounded-md">
      <div
        onClick={() => setShowColorPicker(true)}
        className={`w-full h-full ${color} rounded-sm cursor-pointer`}
      ></div>
      {showColorPicker && (
        <div className="absolute bg-white border rounded-md p-2">
          <div className="grid grid-cols-6 gap-2">
            {_500Colors.map((color) => (
              <div
                key={color}
                className={`w-8 h-8 ${color} rounded-sm cursor-pointer`}
                onClick={() => {
                  setColor(color);
                  setShowColorPicker(false);
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
