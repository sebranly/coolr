import * as React from 'react';
import { Color, Progress } from '../types';
import classnames from 'classnames';

export interface ColorDotProps {
  className?: string;
  onRejectLevel?: () => void;
  onSelectLevel?: () => void;
  levels: Color[];
  color: Color;
  miniSave: Progress;
}

const ColorDot: React.FC<ColorDotProps> = (props) => {
  const { className, color, levels, miniSave, onRejectLevel, onSelectLevel } = props;
  const initial = color.charAt(0).toUpperCase();
  const isDone = miniSave === Progress.Done;
  const isSelected = levels.includes(color);

  const classColor = `bg-${color}`;
  const classes = classnames('circle inline-block', classColor, className, { selected: isSelected });

  return (
    <div className="inline dot">
      {isDone && (
        <span className="checkmark">
          <div className="checkmark_circle"></div>
          <div className="checkmark_stem"></div>
          <div className="checkmark_kick"></div>
        </span>
      )}
      <div className={classes} onClick={onSelectLevel ?? onRejectLevel}>
        <span className="initial">{initial}</span>
      </div>
    </div>
  );
};

export { ColorDot };
