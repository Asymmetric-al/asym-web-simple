export type ViewportFixture = {
  label: string;
  width: number;
  height: number;
};

export const routeSanityViewports: ViewportFixture[] = [
  { label: "320x900", width: 320, height: 900 },
  { label: "390x844", width: 390, height: 844 },
  { label: "768x1024", width: 768, height: 1024 },
  { label: "1024x900", width: 1024, height: 900 },
  { label: "1280x900", width: 1280, height: 900 },
];

export const platformStressViewports: ViewportFixture[] = [
  { label: "320x900", width: 320, height: 900 },
  { label: "360x800", width: 360, height: 800 },
  { label: "390x844", width: 390, height: 844 },
  { label: "412x915", width: 412, height: 915 },
  { label: "480x900", width: 480, height: 900 },
  { label: "640x900", width: 640, height: 900 },
  { label: "768x1024", width: 768, height: 1024 },
  { label: "820x1180", width: 820, height: 1180 },
  { label: "1024x900", width: 1024, height: 900 },
  { label: "1280x900", width: 1280, height: 900 },
  { label: "1440x900", width: 1440, height: 900 },
];

export const orientationPairs = [
  {
    portrait: { label: "390x844", width: 390, height: 844 },
    landscape: { label: "844x390", width: 844, height: 390 },
  },
] as const;
