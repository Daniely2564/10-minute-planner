"use client";
import { User } from "@custom/types/models";
import React, { createContext, useContext, ReactNode, useReducer } from "react";

export interface GlobalProps {
  user: User | null;
  currentDate: Date;
}

const initialGlobalProps: GlobalProps = {
  user: null,
  currentDate: new Date(),
};
// Create the context
const GlobalPropsContext = createContext<
  [GlobalProps, React.Dispatch<GLOBAL_PROPS_ACTION>]
>([initialGlobalProps, () => null]);

export type GLOBAL_PROPS_ACTION =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_CURRENT_DATE"; payload: Date };

const globalPropsReducer = (
  state: GlobalProps,
  action: GLOBAL_PROPS_ACTION
) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_CURRENT_DATE":
      return { ...state, currentDate: action.payload };
    default:
      throw new Error(`Unhandled action ${JSON.stringify(action)}`);
  }
};

// Create a provider component
export const GlobalPropsProvider = ({
  children,
  ...globalProps
}: { children: ReactNode } & Partial<GlobalProps>) => {
  const globalStateHook = useReducer(globalPropsReducer, {
    ...initialGlobalProps,
    ...globalProps,
  });

  return (
    <GlobalPropsContext.Provider value={globalStateHook}>
      {children}
    </GlobalPropsContext.Provider>
  );
};

// Custom hook to use the theme context
export const useGlobalProps = () => {
  const context = useContext(GlobalPropsContext);
  if (!context) {
    throw new Error("useGlobalProps must be used within a GlobalPropsProvider");
  }
  return context;
};
