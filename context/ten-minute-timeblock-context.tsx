import React, { createContext, useReducer, Dispatch, useContext } from "react";
import { TimeBlock } from "@custom/components/ten-minute-planner";
import { initialTimeStart } from "@custom/config/defaults";
import { BgColorWithLightness } from "@custom/types";

export interface TimeblockForm {
  start: number;
  end: number;
  timeStart: number;
  color: BgColorWithLightness;
  activity: string;
  description: string;
}

const initialContext: TimeblockContextState = {
  timeblocks: [],
  form: {
    start: 0,
    end: 0,
    timeStart: initialTimeStart,
    color: "bg-blue-500",
    activity: "",
    description: "",
  },
};

export const TimeblockContext = createContext<
  [TimeblockContextState, Dispatch<TimeblockContextAction>]
>([initialContext, () => null as any]);

const timeblockReducer = (
  prevState: TimeblockContextState,
  action: TimeblockContextAction
): TimeblockContextState => {
  switch (action.type) {
    case "UPDATE_FORM":
      return {
        ...prevState,
        form: {
          ...prevState.form,
          ...action.payload,
        },
      };
    case "UPDATE_TIMEBLOCKS":
      return {
        ...prevState,
        timeblocks: action.payload,
      };
    case "CREATE_TIMEBLOCKS_SCHEDULE":
      const form = prevState.form;
      if (action.payload?.cb) {
        action.payload?.cb(form);
      }
      return {
        ...prevState,
        timeblocks: [...prevState.timeblocks, { ...form }],
        form: initialContext.form,
      };
    default:
      throw Error("Invalid Action Type Provided");
  }
};

export const TimeblockContextProvider = ({
  children,
  timeblocks,
}: {
  children: React.ReactNode;
  timeblocks: TimeBlock[];
}): any => {
  const reducer = useReducer(timeblockReducer, {
    ...initialContext,
    timeblocks,
  });

  return (
    <TimeblockContext.Provider value={reducer}>
      {children}
    </TimeblockContext.Provider>
  );
};

export const useTimeblockContext = () => {
  const context = useContext(TimeblockContext);
  if (!context)
    throw Error("This hook is only allowed within TimeblockContext");

  return context;
};

export interface TimeblockContextState {
  timeblocks: TimeBlock[];
  form: TimeblockForm;
}

export type TimeblockContextAction =
  | {
      type: "UPDATE_TIMEBLOCKS";
      payload: TimeBlock[];
    }
  | {
      type: "UPDATE_FORM";
      payload: Partial<TimeblockForm>;
    }
  | {
      type: "CREATE_TIMEBLOCKS_SCHEDULE";
      payload?: {
        cb?: (timeblock: TimeBlock) => void;
      };
    };
