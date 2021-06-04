import { Color, Progress, Save } from '../types';

const getDefaultSave = () => {
  const { Available, Hidden, Done } = Progress;

  const defaultSave: Save = {
    red: Available,
    green: Available,
    blue: Available,
    cyan: Available,
    magenta: Available,
    yellow: Available,
    white: Available
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

const getLevelsText = (levels: Color[]) => {
  if (levels.length === 0) return 'No level is selected';
  if (levels.length === 1) return `Level ${levels[0]} is selected`;

  return `Levels ${levels.join(' ')} are selected`;
};

export { canMix2, canMix3, getDefaultSave, hasLevel2, hasLevel3, getLevelsText };
