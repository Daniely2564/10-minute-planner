"use client";
import { useTimeblockContext } from "@custom/context/ten-minute-timeblock-context";
import { cn } from "@custom/lib";
import { _500Colors } from "@custom/types";

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
  const [timeblockContext, tbReducer] = useTimeblockContext();
  const { range } = timeblockContext;
  function onCellClick(id: number) {
    if (range === null) {
      tbReducer({ type: "SET_RANGES", payload: [id] });
    } else if (range.length === 1) {
      if (id < range[0]) {
        tbReducer({ type: "SET_RANGES", payload: [id, range[0]] });
        onTimeblockCreate(id, range[0]);
      } else {
        tbReducer({ type: "SET_RANGES", payload: [range[0], id] });
        onTimeblockCreate(range[0], id);
      }
    } else {
      tbReducer({ type: "SET_RANGES", payload: [id] });
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
              color={
                timeblockById(key)
                  ? timeblockById(key)!.color
                  : isCellInRange(key)
                  ? form.color
                  : ""
              }
              id={key}
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
  color,
  onClick,
  id,
}: {
  color?: string;
  onClick: () => void;
  id: number;
}) => {
  const [timeblockContext, tbReducer] = useTimeblockContext();
  const { range, timeblocks } = timeblockContext;
  const timeblock = timeblocks.find((tb) => tb.start <= id && id <= tb.end);

  return (
    <div
      className={cn(
        "w-7 h-7 border-b border-r cursor-pointer last-of-type:border-r-0 first-of-type:border-l",
        color ? color : "bg-transparent",
        range &&
          range.length === 1 &&
          range[0] === id &&
          "border border-red-600",
        timeblock && timeblock.start === id && "border-r-0",
        timeblock &&
          timeblock.start < id + 1 &&
          id < timeblock.end &&
          "border-r-0",
        timeblock && id + 6 <= timeblock.end && "border-b-0"
      )}
      style={{ display: "inline-block" }}
      onClick={() => {
        if (timeblock) {
          tbReducer({
            type: "SET_TIMEBLOCK",
            payload: timeblock,
          });
        } else {
          onClick();
        }
      }}
    >
      &nbsp;
    </div>
  );
};

export default TenMinutePlanner;
