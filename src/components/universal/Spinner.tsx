import React from "react";

interface SpinnerProps {
  size?: number;
  color?: "blue" | "orange" | "white";
}

const Spinner: React.FC<SpinnerProps> = ({ size = 8, color = "blue" }) => {
  const colorMap: { [key: string]: string } = {
    blue: "border-online-blue-300",
    orange: "border-online-orange",
    white: "border-white",
  };

  const borderColor = colorMap[color] || colorMap["blue"];

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${borderColor}`}
        style={{
          width: `${size * 8}px`,
          height: `${size * 8}px`,
        }}
      />
    </div>
  );
};

export default Spinner;
