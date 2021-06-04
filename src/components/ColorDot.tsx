import * as React from 'react';
import { Color, Progress } from '../types';
import classnames from 'classnames';

export interface ColorDotProps {
  className?: string;
  onSelectLevel: () => void;
  color: Color;
  miniSave: Progress;
}

const ColorDot: React.FC<ColorDotProps> = (props) => {
  const { className, color, miniSave, onSelectLevel } = props;
  const initial = color.charAt(0).toUpperCase();
  const isDone = miniSave === Progress.Done;

  const classColor = `bg-${color}`;
  const classes = classnames('circle inline-block', classColor, className);

  return (
    <div className="inline dot">
      {isDone && (
        <span className="checkmark">
          <div className="checkmark_circle"></div>
          <div className="checkmark_stem"></div>
          <div className="checkmark_kick"></div>
        </span>
      )}
      <div className={classes} onClick={onSelectLevel}>
        <span className="initial">{initial}</span>
      </div>
    </div>
  );
};

export { ColorDot };
