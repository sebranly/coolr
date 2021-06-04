import { Progress, Save } from '../types';

const getDefaultSave = () => {
  const { Available, Hidden } = Progress;

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

export { getDefaultSave, hasLevel2, hasLevel3 };
