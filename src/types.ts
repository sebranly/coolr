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
  Konami = 'konami',
  Menu = 'menu',
  SleepingDogs = 'sleepingDogs',
  Spyro = 'spyro',
  Zelda = 'zelda'
}

export enum RainbowColor {
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Violet = 'violet'
}

export enum RupeeColor {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Purple = 'purple'
}

export enum Move {
  Left = 'left',
  Right = 'right',
  Up = 'up',
  Down = 'down'
}

export enum Clue {
  Green = 'green',
  Orange = 'orange',
  Red = 'red',
  White = 'white'
}
