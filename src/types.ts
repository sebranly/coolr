export enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Cyan = 'cyan',
  Magenta = 'magenta',
  Yellow = 'yellow',
  White = 'white',
  Black = 'black'
}

export enum Mode {
  Additive = 'additive',
  Subtractive = 'subtractive'
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
  black: Progress;
}

export enum Puzzle {
  Confettis = 'confettis',
  DinoCrisis = 'dinoCrisis',
  Hexa = 'hexa',
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
