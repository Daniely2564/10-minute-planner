import React, { createContext, useReducer, Dispatch, useContext } from "react";
import { TimeBlock } from "@custom/components/ten-minute-planner";
import { initialTimeStart } from "@custom/config/defaults";
import { BgColorWithLightness } from "@custom/types";

export type Range = null | [number] | [Number, number];

export interface TimeblockContextState {
  timeblocks: TimeBlock[];
  form: TimeblockForm;
  range: Range;
  currentTimeblock: TimeBlock | null;
}

export interface TimeblockForm {
  start: number;
  end: number;
  timeStart: number;
  color: BgColorWithLightness;
  activity: string;
  description: string;
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
    }
  | {
      type: "SET_RANGES";
      payload: Range;
    }
  | {
      type: "SET_TIMEBLOCK";
      payload: TimeBlock | null;
    };

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
  range: null,
  currentTimeblock: null,
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
    case "SET_RANGES":
      return {
        ...prevState,
        range: action.payload,
      };
    case "SET_TIMEBLOCK":
      return {
        ...prevState,
        currentTimeblock: action.payload,
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
