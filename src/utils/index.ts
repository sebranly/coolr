import {
  CODE_RED,
  CODE_BLUE,
  CODE_GREEN,
  CODE_CYAN,
  CODE_LENGTH,
  CODE_MAGENTA,
  CODE_YELLOW,
  MIX_ONE_COLOR_MSG,
  MIX_THREE_COLORS_MSG,
  MIX_TWO_COLORS_MSG,
  VALID_CODES
} from '../constants';
import { Color, Progress, Save, Puzzle, RupeeColor } from '../types';

const getPlural = (str: string, count: number) => {
  if (count === 1) return str;
  return `${str}s`;
};

const getDefaultSave = () => {
  const { Available, Hidden, Done } = Progress;

  // TODO: change
  const defaultSave: Save = {
    red: Available,
    green: Available,
    blue: Available,
    cyan: Hidden,
    magenta: Hidden,
    yellow: Hidden,
    white: Hidden
  };

  return defaultSave;
};

const canMix2 = (save: Save) => {
  const { Done } = Progress;

  const { red, green, blue } = save;

  const redDone = red === Done;
  const greenDone = green === Done;
  const blueDone = blue === Done;

  return redDone && greenDone && blueDone;
};

const canMix3 = (save: Save) => {
  const { Done } = Progress;

  const { red, green, blue, magenta, yellow, cyan } = save;

  const redDone = red === Done;
  const greenDone = green === Done;
  const blueDone = blue === Done;
  const magentaDone = magenta === Done;
  const yellowDone = yellow === Done;
  const cyanDone = cyan === Done;

  return redDone && greenDone && blueDone && magentaDone && yellowDone && cyanDone;
};

const hasLevel2 = (save: Save) => {
  const { Hidden } = Progress;
  const { cyan, magenta, yellow } = save;

  return !(cyan === Hidden && magenta === Hidden && yellow === Hidden);
};

const hasLevel3 = (save: Save) => {
  const { Hidden } = Progress;
  const { white } = save;

  return white !== Hidden;
};

const getNewLevelsMix2 = (levels: Color[], level: Color) => {
  const hasLevel = levels.includes(level);

  if (levels.length === 0) return [level];
  if (levels.length === 1) {
    return hasLevel ? [] : [...levels, level];
  }

  return hasLevel ? levels.filter((l) => l !== level) : [level, levels[0]];
};

const getNewLevelsMix3 = (levels: Color[], level: Color) => {
  const hasLevel = levels.includes(level);

  if (levels.length === 0) return [level];
  if (levels.length === 1) {
    return hasLevel ? [] : [...levels, level];
  } else if (levels.length === 2) {
    return hasLevel ? levels.filter((l) => l !== level) : [level, levels[0], levels[1]];
  }

  return hasLevel ? levels.filter((l) => l !== level) : [level, levels[0]];
};

const getLevelsText = (levels: Color[]) => {
  if (levels.length === 0) return 'No color selected';
  if (levels.length === 1) return `Color ${levels[0]} is selected`;

  const mix = levels.length === 2 ? getResultLevelMix2(levels) : getResultLevelMix3(levels);

  return `Colors ${levels.join(' ')} are selected: mix is ${mix}`;
};

const getResultLevelMix2 = (levels: Color[]) => {
  if (levels.length !== 2) return undefined;

  const { Red, Green, Blue, Cyan, Magenta, Yellow } = Color;

  if (levels.includes(Red) && levels.includes(Green)) return Yellow;
  if (levels.includes(Green) && levels.includes(Blue)) return Cyan;
  if (levels.includes(Red) && levels.includes(Blue)) return Magenta;

  return undefined;
};

const getResultLevelMix3 = (levels: Color[]) => {
  if (levels.length !== 3) return undefined;

  const { Red, Green, Blue, White } = Color;

  if (levels.includes(Red) && levels.includes(Green) && levels.includes(Blue)) return White;

  return undefined;
};

const getPowerLogs = (save: Save) => {
  const currentCode = '';
  const codeMsg = `Or type a ${CODE_LENGTH}-letter cheat code below to load a save`;
  const codes = getCodes(save);
  const commonLogsTemp = [currentCode, codeMsg];
  const commonLogs =
    codes.length > 0 ? [...commonLogsTemp, `Unlocked cheat code(s): ${codes.join(' ')}`] : commonLogsTemp;

  if (canMix3(save)) return [MIX_THREE_COLORS_MSG, ...commonLogs];
  if (canMix2(save)) return [MIX_TWO_COLORS_MSG, ...commonLogs];

  return [MIX_ONE_COLOR_MSG, ...commonLogs];
};

const getRoomColor = (room: number) => {
  if (room < 3) return Color.Green;
  if (room < 5) return Color.Blue;
  if (room === 5) return Color.Red;

  return Color.Yellow;
};

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const getRupees = (room: number) => {
  if (room < 3) return 1;
  if (room < 5) return 5;
  if (room === 5) return 20;

  return 50;
};

const getRupeesColor = (rupees: number) => {
  if (rupees === 1) return RupeeColor.Green;
  if (rupees === 5) return RupeeColor.Blue;
  if (rupees === 20) return RupeeColor.Red;
  if (rupees === 50) return RupeeColor.Purple;
};

const get4DigitsCode = () => {
  const code: number[] = [];

  while (code.length !== 4) {
    let newDigit = getRandomInt(10);

    while (code.includes(newDigit)) {
      newDigit = getRandomInt(10);
    }

    code.push(newDigit);
  }

  return code;
};

const getCodesInvalidMsg = (code: string) => {
  if (code === 'BIATCH') return `Also, that's not nice. You think you're Snoop Dogg?`;
  if (code === 'CHRIST') return `Nobody is coming to save you on this puzzle game`;
  if (code === 'COLORS') return `Just play the game, you'll see lots of colors :)`;
  if (code === 'FAITHY') return 'Nice try though Faithychouchou, hehe';
  if (code === 'FRANCE') return `Tant pis, c'est la vie !`;
  if (['FLOWER', 'NATURE'].includes(code)) return `If you find this game too hard, maybe have a break?`;
  if (code === 'HELPME') return `No thank you, I don't want to help you`;
  if (code === 'KONAMI') return `I'll give you a clue though: blue is Konami Code`;
  if (code === 'LOSING') return `You are not losing, you are just not even trying`;
  if (code === 'MAKEUP') return `Stop making up cheat codes!`;
  if (code === 'PELLAS') return `Nice try but that would be too easy`;
  if (code === 'PLEASE') return `Just play the game. Please and thank you!`;
  if (code === 'POWERS') return `You have some powers, but apparently guessing cheat codes is not one of them`;
  if (code === 'PUZZLE') return `You look puzzled though, that's too bad`;
  if (code === 'RANDOM') return `Maybe stop trying to guess cheat codes randomly?`;
  if (['DRAGON', 'YELLOW'].includes(code)) return `A clue though: yellow is from Spyro 2, Idol Springs`;
  if (code === 'THANKS') return `I didn't load any save, but ok you're welcome I guess?`;

  return '';
};

const getColorPuzzle = (puzzle: Puzzle) => {
  const { Red, Green, Blue, Magenta, Yellow, Cyan, White } = Color;
  const { Menu, DinoCrisis, Hexa, Konami, Zelda, SleepingDogs, Spyro } = Puzzle;

  switch (puzzle) {
    case Konami:
      return Blue;
    case DinoCrisis:
      return Green;
    case Hexa:
      return Magenta;
    case Zelda:
      return Red;
    case Spyro:
      return Yellow;
    case SleepingDogs:
      return Cyan;
    default:
      return White;
  }
};

const getPuzzleColor = (level: Color) => {
  const { Red, Green, Blue, Magenta, Yellow, Cyan, White } = Color;
  const { Menu, DinoCrisis, Hexa, Konami, Zelda, SleepingDogs, Spyro } = Puzzle;

  switch (level) {
    case Blue:
      return Konami;
    case Green:
      return DinoCrisis;
    case Magenta:
      return Hexa;
    case Red:
      return Zelda;
    case Yellow:
      return Spyro;
    case Cyan:
      return SleepingDogs;
    default:
      return Menu;
  }
};

const getPuzzleText = (puzzle: Puzzle) => {
  const { Menu, DinoCrisis, Hexa, Konami, SleepingDogs, Spyro, Zelda } = Puzzle;

  switch (puzzle) {
    case Menu:
      return 'Menu';
    case DinoCrisis:
      return 'Gay Pride';
    case Hexa:
      return 'Mathematical Base';
    case Konami:
      return 'Be like Konami';
    case SleepingDogs:
      return 'Code';
    case Spyro:
      return 'Year of the Rabbit';
    case Zelda:
      return 'Random Chest';
    default:
      return 'Puzzle';
  }
};

const isValidCode = (code: string) => {
  return VALID_CODES.includes(code);
};

const getCodes = (save: Save) => {
  const codes: string[] = [];

  const { red, green, blue, cyan, magenta, yellow } = save;
  const { Done } = Progress;

  if (cyan === Done || magenta === Done || yellow === Done) {
    if (cyan === Done) codes.push(CODE_CYAN);
    if (magenta === Done) codes.push(CODE_MAGENTA);
    if (yellow === Done) codes.push(CODE_YELLOW);

    return codes;
  }

  if (red === Done || green === Done || blue === Done) {
    if (red === Done) codes.push(CODE_RED);
    if (green === Done) codes.push(CODE_GREEN);
    if (blue === Done) codes.push(CODE_BLUE);

    return codes;
  }

  return codes;
};

export {
  getColorPuzzle,
  getCodes,
  getCodesInvalidMsg,
  getPlural,
  getRandomInt,
  getResultLevelMix2,
  getResultLevelMix3,
  canMix2,
  canMix3,
  getDefaultSave,
  hasLevel2,
  hasLevel3,
  getLevelsText,
  getNewLevelsMix2,
  getNewLevelsMix3,
  getPowerLogs,
  getPuzzleText,
  getPuzzleColor,
  getRoomColor,
  getRupees,
  getRupeesColor,
  get4DigitsCode,
  isValidCode
};
