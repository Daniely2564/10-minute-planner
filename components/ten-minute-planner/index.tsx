"use client";
import { useState } from "react";

export interface TimeBlock {
  start: number;
  end: number;
  label: string;
  color: string;
  description: string;
}

const tenMinutesInHour = 6;

interface TenMinutePlannerProps {
  initialTimeStart?: number;
  timeblocks: TimeBlock[];
  onTimeblockCreate: (start: number, end: number, cb?: () => void) => void;
}

const TenMinutePlanner = ({
  initialTimeStart = 6,
  timeblocks: initialTimeblocks = [],
  onTimeblockCreate,
}: TenMinutePlannerProps) => {
  const [range, setRange] = useState<null | [number] | [Number, number]>(null);
  const [timeblocks, setTimeblocks] = useState<TimeBlock[]>(initialTimeblocks);
  const onCellClick = (id: number) => {
    if (range === null) {
      setRange([id]);
    } else if (range.length === 1) {
      if (id < range[0]) {
        setRange([id, range[0]]);
        onTimeblockCreate(id, range[0], () => {
          setRange(null);
        });
      } else {
        setRange([range[0], id]);
        onTimeblockCreate(range[0], id, () => {
          setRange(null);
        });
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
          hour={(i + initialTimeStart) % 24}
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
  hour,
}: {
  id: number;
  on: boolean;
  onClick: (id: number) => void;
  isCellInRange: (id: number) => boolean;
  hour: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="min-w-5 text-sm text-right flex-1">{hour}</div>
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
      className={`w-7 h-7 border-b border-r cursor-pointer last-of-type:border-r-0 first-of-type:border-l ${
        on ? "bg-blue-500" : "bg-transparent"
      }`}
      style={{ display: "inline-block" }}
      onClick={onClick}
    >
      {id}
    </div>
  );
};

export default TenMinutePlanner;
