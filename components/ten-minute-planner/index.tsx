"use client";
import { useState } from "react";

interface TenMinutePlannerProps {
  initialTimeStart: number;
}

const tenMinutesInHour = 6;
const TenMinutePlanner = ({ initialTimeStart = 6 }: TenMinutePlannerProps) => {
  const [range, setRange] = useState<null | [number] | [Number, number]>(null);
  const onCellClick = (id: number) => {
    if (range === null) {
      setRange([id]);
    } else if (range.length === 1) {
      if (id < range[0]) {
        setRange([id, range[0]]);
      } else {
        setRange([range[0], id]);
      }
    } else {
      setRange([id]);
    }
  };
  const isCellInRange = (id: number) => {
    if (range === null) return false;
    if (range.length === 1) {
      return id === range[0];
    } else {
      return id >= (range[0] as number) && id <= range[1];
    }
  };
  return (
    <div>
      {Array.from({ length: 24 }).map((_, i) => (
        <TenMinuteRow
          id={i}
          key={i}
          on={false}
          onClick={onCellClick}
          isCellInRange={isCellInRange}
        />
      ))}
    </div>
  );
};

const TenMinuteRow = ({
  id,
  on,
  onClick,
  isCellInRange,
}: {
  id: number;
  on: boolean;
  onClick: (id: number) => void;
  isCellInRange: (id: number) => boolean;
}) => {
  return (
    <div>
      {Array.from({ length: tenMinutesInHour }).map((_, i) => {
        const key = id * tenMinutesInHour + i;
        return (
          <TenMinuteCell
            id={key}
            on={isCellInRange(key)}
            key={key}
            onClick={() => onClick(key)}
          />
        );
      })}
    </div>
  );
};

const TenMinuteCell = ({
  id,
  on,
  onClick,
}: {
  id: number;
  on: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`w-7 h-7 border ${on ? "bg-blue-500" : "bg-gray-200"}`}
      style={{ display: "inline-block", margin: "1px" }}
      onClick={onClick}
    >
      {id}
    </div>
  );
};

export default TenMinutePlanner;
