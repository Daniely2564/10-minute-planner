"use client";

import { _500Colors, BgColorWithLightness } from "@custom/types";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ColorPicker from "./colorPicker";
import { cn } from "@custom/lib";
import { initialTimeStart } from "@custom/config/defaults";

interface TimeblockSliderProps {
  open: boolean;
  close: () => void;
  startTime?: number;
  endTime?: number;
  onColorChange?: (color: BgColorWithLightness) => void;
}

const TimeblockSlider = ({
  open,
  close,
  startTime,
  endTime,
  onColorChange,
}: TimeblockSliderProps) => {
  const [form, setForm] = useState<{ color: BgColorWithLightness }>({
    color: "bg-blue-500", // default 500
  });
  // each idx represents the location of the 10 minute unit
  // it should calculate base hour + (idx * 10)

  useEffect(() => {
    onColorChange?.(form.color);
  }, [form.color]);
  const calculateTime = (
    idx: number | undefined,
    isEnd?: boolean,
    timeStart: number = initialTimeStart
  ) => {
    if (typeof idx === undefined) return `0:0`;
    const estimatedTime = timeStart * 60 + idx! * 10 + (isEnd ? 9 : 0);
    const hour = Math.floor(estimatedTime / 60);
    const min = estimatedTime % 60;
    return `${hour}:${min < 10 ? "0" + min : min}`;
  };
  return (
    <Dialog open={open} onClose={close} className="relative z-10">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <form className="flex h-full flex-col divide-y divide-gray-200 bg-black/30 shadow-xl">
                <div className="h-0 flex-1 overflow-y-auto">
                  <div
                    className={cn(
                      "px-4 py-6 sm:px-6",
                      _500Colors.find((bg) => bg.includes(form.color)) ??
                        _500Colors[0]
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-base font-semibold text-white">
                        Create New Timeblock
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={close}
                          className={cn(
                            "relative rounded-md text-sky-200 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden",
                            form.color
                          )}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-white/90">
                        Timeblocks help you organize and manage your day by
                        dividing your schedule into focused segments. Plan,
                        track, and optimize your productivity with ease.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="divide-y divide-gray-200 px-4 sm:px-6">
                      <div className="space-y-6 pt-6 pb-5">
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label
                              htmlFor="project-name"
                              className="block text-sm/6 font-medium text-white/90"
                            >
                              Start Time
                            </label>
                            <div className="mt-2">
                              <input
                                id="project-name"
                                name="project-name"
                                type="text"
                                disabled
                                value={calculateTime(startTime)}
                                className="block w-full rounded-md bg-black/30 px-3 py-1.5 text-base text-white/90 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-600 sm:text-sm/6"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <label
                              htmlFor="project-name"
                              className="block text-sm/6 font-medium text-white/90"
                            >
                              End Time
                            </label>
                            <div className="mt-2">
                              <input
                                id="project-name"
                                name="project-name"
                                type="text"
                                disabled
                                value={calculateTime(endTime, true)}
                                className="block w-full rounded-md bg-black/30 px-3 py-1.5 text-base text-white/90 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-600 sm:text-sm/6"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="project-name"
                            className="block text-sm/6 font-medium text-white/90"
                          >
                            Activity
                          </label>
                          <div className="mt-2">
                            <input
                              id="project-name"
                              name="project-name"
                              type="text"
                              className="block w-full rounded-md bg-black/30 px-3 py-1.5 text-base text-white/90 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="project-description"
                            className="block text-sm/6 font-medium text-white/90"
                          >
                            Description
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="project-description"
                              name="project-description"
                              rows={3}
                              className="block w-full rounded-md bg-black/30 px-3 py-1.5 text-base text-white/90 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-600 sm:text-sm/6"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="project-name"
                            className="block text-sm/6 font-medium text-white/90"
                          >
                            Color
                          </label>
                          <div className="mt-2">
                            <ColorPicker
                              color={form.color}
                              onChange={(color) =>
                                setForm((prev) => ({ ...prev, color }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 justify-end px-4 py-4">
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-md bg-black/30 px-3 py-2 text-sm font-semibold text-white/90 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-950"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-4 inline-flex justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default TimeblockSlider;
