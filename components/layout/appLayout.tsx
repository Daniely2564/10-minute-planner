"use client";

import { useGlobalProps } from "@custom/context/global-context";
import dayjs from "dayjs";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [globalProps] = useGlobalProps();
  const { currentDate } = globalProps;
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex">
        <h1 className="text-2xl pb-1 font-bold uppercase">
          {dayjs(currentDate).format("YYYY MMMM")}
        </h1>
      </div>
      {children}
    </div>
  );
};

export default AppLayout;
