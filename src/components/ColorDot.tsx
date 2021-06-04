import * as React from 'react';
import { Color } from '../types';
import classnames from 'classnames';

export interface ColorDotProps {
  className?: string;
  color: Color;
}

const ColorDot: React.FC<ColorDotProps> = (props) => {
  const { className, color } = props;
  const initial = color.charAt(0).toUpperCase();

  const classColor = `bg-${color}`;
  const classes = classnames('circle inline-block', classColor, className);

  return (
    <div className={classes}>
      <span className="initial">{initial}</span>
    </div>
  );
};

export { ColorDot };
