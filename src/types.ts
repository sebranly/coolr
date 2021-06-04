export enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Cyan = 'cyan',
  Magenta = 'magenta',
  Yellow = 'yellow',
  White = 'white'
}

export enum Progress {
  Hidden = 'hidden',
  Available = 'available',
  Done = 'done'
}

export interface Save {
  red: Progress;
  green: Progress;
  blue: Progress;
  cyan: Progress;
  magenta: Progress;
  yellow: Progress;
  white: Progress;
  hasSeenMix1: boolean;
  hasSeenMix2: boolean;
  hasSeenMix3: boolean;
}
