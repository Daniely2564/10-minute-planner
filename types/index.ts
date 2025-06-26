export type Color =
  | "amber"
  | "blue"
  | "green"
  | "indigo"
  | "orange"
  | "purple"
  | "red"
  | "sky"
  | "teal"
  | "violet";
export type ColorWithLightness = `${Color}-${
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"}`;
export type BgColorWithLightness = `bg-${ColorWithLightness}`;
export type ColorWithLightnessOrTransparent =
  | ColorWithLightness
  | "transparent";

export const colors: Color[] = [
  "amber",
  "blue",
  "green",
  "indigo",
  "orange",
  "purple",
  "red",
  "sky",
  "teal",
  "violet",
];

export const bgColors: BgColorWithLightness[] = colors.flatMap((color) =>
  Array.from(
    { length: 9 },
    (_, i) => `bg-${color}-${(i + 1) * 100}` as BgColorWithLightness
  )
);

export const _500Colors: BgColorWithLightness[] = [
  "bg-amber-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-sky-500",
  "bg-teal-500",
  "bg-violet-500",
];
