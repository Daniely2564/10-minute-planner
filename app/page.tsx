"use client";
import DayPage from "@custom/components/dayPage";
import { _500Colors } from "@custom/types";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl pb-1 font-bold uppercase">2025 October</h1>
      </div>
      <div className="flex border-t-2">
        <div className="flex-1">
          <DayPage timeblocks={[]} />
        </div>
        <div className="flex-1">Space</div>
      </div>
    </div>
  );
}
