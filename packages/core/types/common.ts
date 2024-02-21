export type Position = {
  x: number;
  y: number;
};

export type RgbColor = {
  r: number;
  g: number;
  b: number;
};

export type DrawPointOption = {
  size?: number;
  color?: RgbColor | string;
};

export type DrawSegmentOption = {
  width?: number;
  color?: RgbColor | string;
};
