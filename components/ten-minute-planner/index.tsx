"use client";
import { useTimeblockContext } from "@custom/context/ten-minute-timeblock-context";
import { _500Colors } from "@custom/types";
import { useState } from "react";

export interface TimeBlock {
  start: number;
  end: number;
  activity: string;
  color: string;
  description: string;
}

const tenMinutesInHour = 6;

interface TenMinutePlannerProps {
  initialTimeStart?: number;
  onTimeblockCreate: (start: number, end: number, cb?: () => void) => void;
}

const TenMinutePlanner = ({
  initialTimeStart = 6,
  onTimeblockCreate,
}: TenMinutePlannerProps) => {
  const [range, setRange] = useState<null | [number] | [Number, number]>(null);
  function onCellClick(id: number) {
    if (range === null) {
      setRange([id]);
    } else if (range.length === 1) {
      if (id < range[0]) {
        setRange([id, range[0]]);
        onTimeblockCreate(id, range[0]);
      } else {
        setRange([range[0], id]);
        onTimeblockCreate(range[0], id);
      }
    } else {
      setRange([id]);
    }
  }
  function isCellInRange(id: number) {
    if (range === null) return false;
    if (range.length === 1) {
      return id === range[0];
    } else {
      return id >= (range[0] as number) && id <= range[1];
    }
  }
  return (
    <div>
      {Array.from({ length: 24 }).map((_, i) => (
        <TenMinuteRow
          id={i}
          hour={(i + initialTimeStart) % 24}
          key={i}
          onClick={onCellClick}
          isCellInRange={isCellInRange}
        />
      ))}
    </div>
  );
};

const TenMinuteRow = ({
  id,
  onClick,
  isCellInRange,
  hour,
}: {
  id: number;
  onClick: (id: number) => void;
  isCellInRange: (id: number) => boolean;
  hour: number;
}) => {
  const [timeblockContext] = useTimeblockContext();
  const { form, timeblocks } = timeblockContext;

  function timeblockById(key: number): TimeBlock | undefined {
    return timeblocks.find((tb) => tb.start <= key && key <= tb.end);
  }

  return (
    <div className="flex items-center gap-2">
      <div className="min-w-5 text-sm text-right flex-1">{hour}</div>
      <div>
        {Array.from({ length: tenMinutesInHour }).map((_, i) => {
          const key = id * tenMinutesInHour + i;
          return (
            <TenMinuteCell
              id={key}
              color={
                timeblockById(key)
                  ? timeblockById(key)!.color
                  : isCellInRange(key)
                  ? form.color
                  : ""
              }
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
  color,
  onClick,
}: {
  id: number;
  color?: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={`w-7 h-7 border-b border-r cursor-pointer last-of-type:border-r-0 first-of-type:border-l ${
        color ? color : "bg-transparent"
      }`}
      style={{ display: "inline-block" }}
      onClick={onClick}
    >
      &nbsp;
    </div>
  );
};

export default TenMinutePlanner;
