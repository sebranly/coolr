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
}

export enum Puzzle {
  DinoCrisis = 'dinoCrisis',
  Menu = 'menu'
}

export enum RainbowColor {
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Violet = 'violet'
}
