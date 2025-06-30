import {
  TimeblockContextProvider,
  useTimeblockContext,
} from "@custom/context/ten-minute-timeblock-context";
import TenMinutePlanner, { TimeBlock } from "./ten-minute-planner";
import Checkbox from "./checkbox";
import TimeblockSlider from "./timeblockSlider";
import { useState } from "react";
import { _500Colors, BgColorWithLightness } from "@custom/types";

const DayPage = () => {
  const [showTimeblockSlider, setShowTimeblockSlider] = useState(false);
  const [timeblockContent, setTimeblockContent] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const [timeblockContext] = useTimeblockContext();
  const { timeblocks } = timeblockContext;
  const onTimeblockCreate = (start: number, end: number, cb?: () => void) => {
    setShowTimeblockSlider(true);
    setTimeblockContent({ start, end });
    typeof cb === "function" && cb();
  };
  const calculateTotalTime = () => {
    let count = 0;
    for (let i = 0; i < 24 * 6; i++) {
      if (timeblocks.some((tb) => tb.start <= i && i <= tb.end)) count++;
    }
    return count * 10; // each count represents 10 minute
  };
  return (
    <>
      <TimeblockSlider
        open={showTimeblockSlider}
        close={() => setShowTimeblockSlider(false)}
        startTime={timeblockContent?.start}
        endTime={timeblockContent?.end}
      />
      <div className="grid grid-cols-6 border-r-1">
        <div className="col-span-1 flex justify-center border-r-1 border-b-1">
          <div className="text-sm flex items-center flex-col font-medium h-full justify-center gap-1">
            <div className="text-5xl">20</div>
            <div className="text-lg">THU</div>
          </div>
        </div>
        <div className="col-span-3 border-r-1">
          <div className="text-sm flex items-center flex-col p-2 border-b-1">
            <div className="text-xs uppercase self-start font-medium">
              Today's Goal
            </div>
            <div className="flex justify-center h-full items-center min-h-14 text-center">
              Try my best today
            </div>
          </div>
          <div className="text-sm flex items-center flex-col p-2 border-b-1">
            <div className="text-xs uppercase self-start font-medium">
              Comment
            </div>
            <div className="flex justify-center h-full items-center min-h-14 text-center">
              Today is new day. <br /> Stop living in the past.
            </div>
          </div>
        </div>
        <div className="col-span-2 text-2xl font-bold">
          <div className="flex items-center flex-col p-2 border-b-1">
            <div className="text-xs uppercase self-start font-medium">
              D-Day
            </div>
            <div className="flex justify-center h-full items-center min-h-14 text-center">
              D-29
            </div>
          </div>
          <div className="font-bold flex items-center flex-col p-2 border-b-1">
            <div className="text-xs uppercase self-start font-medium">
              Total Time
            </div>
            <div className="flex justify-center h-full items-center min-h-14 text-center">
              {Math.floor(calculateTotalTime() / 60)}H{" "}
              {calculateTotalTime() % 60}M
            </div>
          </div>
        </div>
        <div className="col-span-4 ">
          {Array.from({ length: 25 }).map((_, idx) => (
            <div className="grid grid-cols-4 border-b" key={idx}>
              <div className="col-span-1 border-r text-center py-0.5">
                Something
              </div>
              <div className="col-span-3 pl-2 pr-2 py-0.5 flex">
                <div className="flex-1">Something</div>
                <Checkbox id={`checkbox-${idx}`} onClick={console.log} />
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2 border-l-1">
          <TenMinutePlanner onTimeblockCreate={onTimeblockCreate} />
        </div>
      </div>
    </>
  );
};

interface DayPageWrapperProps {
  timeblocks: TimeBlock[];
}

export default function ({ timeblocks }: DayPageWrapperProps) {
  return (
    <TimeblockContextProvider timeblocks={timeblocks}>
      <DayPage></DayPage>
    </TimeblockContextProvider>
  );
}
