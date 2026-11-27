export interface ViewportFixture {
  label: string;
  width: number;
  height: number;
}

export const routeSanityViewports: ViewportFixture[] = [
  { label: "320x900", width: 320, height: 900 },
  { label: "360x800", width: 360, height: 800 },
  { label: "390x844", width: 390, height: 844 },
  { label: "768x1024", width: 768, height: 1024 },
  { label: "1024x900", width: 1024, height: 900 },
  { label: "1280x900", width: 1280, height: 900 },
  { label: "1440x900", width: 1440, height: 900 },
];
