import * as React from 'react';
import { Color } from '../types';
import classnames from 'classnames';
import { ColorDot } from './ColorDot';
import { Mode, Progress, Save } from '../types';
import { hasLevel2, hasLevel3, hasLevel4 } from '../utils';

export interface PuzzleSelectionProps {
  className?: string;
  levels: Color[];
  mode: Mode;
  onRejectLevel: (level: Color) => () => void;
  onSelectLevel: (level: Color) => () => void;
  save: Save;
}

const PuzzleSelection: React.FC<PuzzleSelectionProps> = (props) => {
  const { className, mode, save, levels, onRejectLevel, onSelectLevel } = props;
  const { Hidden } = Progress;
  const { Red, Green, Blue, Magenta, Cyan, Yellow, White, Black } = Color;
  const { red, green, blue, magenta, cyan, yellow, white } = save;
  const { Additive, Subtractive } = Mode;

  const renderLevel2 = () => {
    const hasLvl2 = hasLevel2(save);

    if (!hasLvl2) return null;

    return (
      <>
        <br />
        <h2>Floor 2</h2>
        <div className="block">
          {cyan !== Hidden && (
            <ColorDot
              className="black"
              color={Cyan}
              levels={levels}
              onRejectLevel={mode === Additive ? onRejectLevel(Cyan) : onSelectLevel(Cyan)}
              miniSave={save.cyan}
            />
          )}
          {magenta !== Hidden && (
            <ColorDot
              className="black"
              color={Magenta}
              levels={levels}
              onRejectLevel={mode === Additive ? onRejectLevel(Magenta) : onSelectLevel(Magenta)}
              miniSave={save.magenta}
            />
          )}
          {yellow !== Hidden && (
            <ColorDot
              className="black"
              color={Yellow}
              levels={levels}
              onRejectLevel={mode === Additive ? onRejectLevel(Yellow) : onSelectLevel(Yellow)}
              miniSave={save.yellow}
            />
          )}
        </div>
      </>
    );
  };

  const renderLevel3 = () => {
    const hasLvl3 = hasLevel3(save);

    if (!hasLvl3) return null;

    return (
      <div className="flex-one">
        <br />
        <h2>Floor 3</h2>
        <div className="block">
          <ColorDot
            className="black"
            color={White}
            levels={levels}
            onRejectLevel={onRejectLevel(White)}
            miniSave={save.white}
          />
        </div>
      </div>
    );
  };

  const renderLevel4 = () => {
    const hasLvl4 = hasLevel4(save);

    if (!hasLvl4) return null;

    return (
      <div className="flex-one">
        <br />
        <h2>Floor 4</h2>
        <div className="block">
          <ColorDot
            className="white"
            color={Black}
            levels={levels}
            onRejectLevel={onRejectLevel(Black)}
            miniSave={save.black}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <h2>Floor 1</h2>
      <div className="block">
        <ColorDot
          className="black"
          color={Red}
          levels={levels}
          onSelectLevel={mode === Additive ? onSelectLevel(Red) : onRejectLevel(Red)}
          miniSave={save.red}
        />
        <ColorDot
          className="black"
          color={Green}
          levels={levels}
          onSelectLevel={mode === Additive ? onSelectLevel(Green) : onRejectLevel(Green)}
          miniSave={save.green}
        />
        <ColorDot
          className="black"
          color={Blue}
          levels={levels}
          onSelectLevel={mode === Additive ? onSelectLevel(Blue) : onRejectLevel(Blue)}
          miniSave={save.blue}
        />
      </div>
      {renderLevel2()}
      <div className="flex">
        {renderLevel3()}
        {renderLevel4()}
      </div>
    </>
  );
};

export { PuzzleSelection };
