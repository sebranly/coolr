import * as React from 'react';
import { Color } from '../types';
import classnames from 'classnames';
import { ColorDot } from './ColorDot';
import { Progress, Save } from '../types';
import { hasLevel2, hasLevel3 } from '../utils';

export interface PuzzleSelectionProps {
  className?: string;
  onSelectLevel: (level: Color) => () => void;
  save: Save;
}

const PuzzleSelection: React.FC<PuzzleSelectionProps> = (props) => {
  const { className, save, onSelectLevel } = props;
  const { Hidden } = Progress;
  const { Red, Green, Blue, Magenta, Cyan, Yellow, White } = Color;
  const { red, green, blue, magenta, cyan, yellow, white } = save;

  const renderLevel2 = () => {
    const hasLvl2 = hasLevel2(save);

    if (!hasLvl2) return null;

    return (
      <>
        <br />
        <h2>Floor 2</h2>
        <div className="block">
          {cyan !== Hidden && <ColorDot className="black" color={Cyan} onSelectLevel={onSelectLevel(Cyan)} />}
          {magenta !== Hidden && <ColorDot className="black" color={Magenta} onSelectLevel={onSelectLevel(Magenta)} />}
          {yellow !== Hidden && <ColorDot className="black" color={Yellow} onSelectLevel={onSelectLevel(Yellow)} />}
        </div>
      </>
    );
  };

  const renderLevel3 = () => {
    const hasLvl3 = hasLevel3(save);

    if (!hasLvl3) return null;

    return (
      <>
        <br />
        <h2>Floor 3</h2>
        <div className="block">
          <ColorDot className="black" color={White} onSelectLevel={onSelectLevel(White)} />
        </div>
      </>
    );
  };

  return (
    <>
      <h2>Floor 1</h2>
      <div className="block">
        <ColorDot className="black" color={Red} onSelectLevel={onSelectLevel(Red)} />
        <ColorDot className="black" color={Green} onSelectLevel={onSelectLevel(Green)} />
        <ColorDot className="black" color={Blue} onSelectLevel={onSelectLevel(Blue)} />
      </div>
      {renderLevel2()}
      {renderLevel3()}
    </>
  );
};

export { PuzzleSelection };
