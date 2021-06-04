import { Color, Progress, Save } from '../types';

const getDefaultSave = () => {
  const { Available, Hidden, Done } = Progress;

  const defaultSave: Save = {
    red: Available,
    green: Done,
    blue: Done,
    cyan: Available,
    magenta: Available,
    yellow: Available,
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

  return (redDone && greenDone) || (redDone && blueDone) || (greenDone && blueDone);
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

const getLevelsText = (levels: Color[]) => {
  if (levels.length === 0) return 'No level is selected';
  if (levels.length === 1) return `Level ${levels[0]} is selected`;

  return `Levels ${levels.join(' ')} are selected`;
};

const getResultLevelMix2 = (levels: Color[]) => {
  if (levels.length !== 2) return undefined;

  const { Red, Green, Blue, Cyan, Magenta, Yellow } = Color;

  if (levels.includes(Red) && levels.includes(Green)) return Yellow;
  if (levels.includes(Green) && levels.includes(Blue)) return Cyan;
  if (levels.includes(Red) && levels.includes(Blue)) return Magenta;

  return undefined;
};

export { getResultLevelMix2, canMix2, canMix3, getDefaultSave, hasLevel2, hasLevel3, getLevelsText, getNewLevelsMix2 };
