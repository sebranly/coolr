import { MIX_ONE_COLOR_MSG, MIX_THREE_COLORS_MSG, MIX_TWO_COLORS_MSG } from '../constants';
import { Color, Progress, Save } from '../types';

const getDefaultSave = () => {
  const { Available, Hidden, Done } = Progress;

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
  const codeMsg = 'Or type a 5-letter code below to load a save';

  if (canMix3(save)) return [MIX_THREE_COLORS_MSG, currentCode, codeMsg];
  if (canMix2(save)) return [MIX_TWO_COLORS_MSG, currentCode, codeMsg];

  return [MIX_ONE_COLOR_MSG, currentCode, codeMsg];
};

export {
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
  getPowerLogs
};
