"use client";
import DayPage from "@custom/components/dayPage";
import AppLayout from "@custom/components/layout/appLayout";
import { useGlobalProps } from "@custom/context/global-context";
import { _500Colors } from "@custom/types";

/*
Todo:
- update or delete existing blocks
- overlapping timeblocks
  - disguise by the prior ones or disable such feature?
- where do we edit the page context
- how do I integrate DB?
*/
export default function Home() {
  const [globalProps] = useGlobalProps();
  const { currentDate } = globalProps;

  return (
    <AppLayout>
      <div className="flex border-t-2">
        <div className="flex-1">
          <DayPage timeblocks={[]} date={currentDate} />
        </div>
        <div className="flex-1">Space</div>
      </div>
    </AppLayout>
  );
}
