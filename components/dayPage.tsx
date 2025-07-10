import {
  TimeblockContextProvider,
  useTimeblockContext,
} from "@custom/context/ten-minute-timeblock-context";
import TenMinutePlanner, { TimeBlock } from "./ten-minute-planner";
import Checkbox from "./checkbox";
import TimeblockSlider from "./timeblockSlider";
import { useState } from "react";
import { _500Colors } from "@custom/types";
import { debounceInputUpdate } from "@custom/lib";
import { daysRow } from "@custom/config/defaults";

const DayPage = () => {
  const [showTimeblockSlider, setShowTimeblockSlider] = useState(false);
  const [timeblockContent, setTimeblockContent] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const [timeblockContext, dispatchTimeblock] = useTimeblockContext();
  const updateNote = debounceInputUpdate<string>((input: string) => {
    dispatchTimeblock({
      type: "UPDATE_NOTE",
      payload: input as string,
    });
  });
  const updateComment = debounceInputUpdate<string>((input: string) => {
    dispatchTimeblock({
      type: "UPDATE_COMMENT",
      payload: input as string,
    });
  });
  const updateGoal = debounceInputUpdate<string>((input: string) => {
    dispatchTimeblock({
      type: "UPDATE_GOAL",
      payload: input as string,
    });
  });
  const updateCategory = debounceInputUpdate<any>(
    (input: string, index: number) => {
      dispatchTimeblock({
        type: "UPDATE_DAY_CATEGORY",
        payload: {
          category: input,
          index: index,
        },
      });
    },
    500
  );
  const { timeblocks, note, comment, goal, dDay, dayCategories, dayToDos } =
    timeblockContext;
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
        close={() => {
          setShowTimeblockSlider(false);
          dispatchTimeblock({
            type: "SET_RANGES",
            payload: null,
          });
        }}
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
            <textarea
              className="flex justify-center h-full items-center min-h-15 text-center w-full focus:outline-none resize-none"
              defaultValue={goal}
              onChange={(e) => {
                updateGoal(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="text-sm flex items-center flex-col p-2 border-b-1">
            <div className="text-xs uppercase self-start font-medium">
              Comment
            </div>
            <textarea
              onChange={(e) => {
                updateComment(e.target.value);
              }}
              className="flex justify-center h-full items-center min-h-15 text-center w-full focus:outline-none resize-none"
              defaultValue={comment}
            ></textarea>
          </div>
        </div>
        <div className="col-span-2 text-2xl font-bold">
          <div className="flex items-center flex-col p-2 border-b-1">
            <div className="text-xs uppercase self-start font-medium">
              D-Day
            </div>
            <div className="flex justify-center h-full items-center min-h-15 text-center">
              D-
              <input
                value={dDay}
                className="inline max-w-12"
                type="number"
                min={0}
                onChange={(e) =>
                  dispatchTimeblock({
                    type: "UPDATE_DDAY",
                    payload: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
          <div className="font-bold flex items-center flex-col p-2 border-b-1">
            <div className="text-xs uppercase self-start font-medium">
              Total Time
            </div>
            <div className="flex justify-center h-full items-center min-h-15 text-center">
              {Math.floor(calculateTotalTime() / 60)}H{" "}
              {calculateTotalTime() % 60}M
            </div>
          </div>
        </div>
        <div className="col-span-4">
          {Array.from({ length: daysRow }).map((_, idx) => (
            <div className="grid grid-cols-4 border-b" key={idx}>
              <div className="col-span-1 border-r text-center py-0.5">
                <input
                  defaultValue={dayCategories[idx] || ""}
                  className="outline-none max-w-full text-center"
                  onChange={(e) => {
                    updateCategory(e.target.value, idx);
                  }}
                  type="text"
                />
              </div>
              <div className="col-span-3 pl-2 pr-2 py-0.5 flex">
                <input
                  className="flex-1 outline-none"
                  defaultValue={dayToDos[idx] || ""}
                />
                <Checkbox
                  id={`checkbox-${idx}`}
                  checked={timeblockContext.checked[idx]}
                  onClick={(checked) => {
                    dispatchTimeblock({
                      type: "UPDATE_CHECKED",
                      payload: {
                        checked: checked,
                        index: idx,
                      },
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2 border-l-1">
          <TenMinutePlanner onTimeblockCreate={onTimeblockCreate} />
        </div>
      </div>
      <div className="w-full border px-3 py-2">
        <div className="uppercase text-sm font-medium mb-2">Note</div>
        <div className="h-[150px] w-full">
          <textarea
            className="w-full h-full min-h-[140px] focus:outline-none"
            onChange={(e) => {
              updateNote(e.target.value);
            }}
            defaultValue={note}
          ></textarea>
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
