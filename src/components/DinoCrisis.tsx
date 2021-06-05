import * as React from 'react';
import { Save, Progress, RainbowColor, Puzzle } from '../types';
import classnames from 'classnames';
import { clone, isEqual } from 'lodash';

export interface DinoCrisisProps {
  className?: string;
  logs: string[];
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  setSave: React.Dispatch<React.SetStateAction<Save>>;
  save: Save;
  setPuzzle: React.Dispatch<React.SetStateAction<Puzzle>>;
}

const DinoCrisis: React.FC<DinoCrisisProps> = (props) => {
  const { className, setSave, save, setPuzzle, setLogs, logs } = props;

  const { Red, Orange, Yellow, Green, Blue, Violet } = RainbowColor;

  React.useEffect(() => setLogs([...logs, 'Produce a red to violet rainbow']), []);

  const [rect, setRect] = React.useState<RainbowColor[]>([Violet, Orange, Yellow, Red, Green, Blue]);
  const buttonsIds = [0, 1, 2, 3, 4];

  return (
    <>
      <div className="flex margin-bottom">
        {rect.map((r) => {
          const rectClasses = classnames('flex-one', `bg-${r}`);
          const copy = r.charAt(0).toUpperCase();
          return (
            <div key={copy} className={rectClasses}>
              {copy}
            </div>
          );
        })}
      </div>{' '}
      <div className="flex">
        {buttonsIds.map((b, index) => {
          const col1 = rect[index];
          const col2 = rect[index + 1];

          const onClick = () => {
            const temp = rect[index];
            const copyRect = clone(rect);
            copyRect[index] = copyRect[index + 1];
            copyRect[index + 1] = temp;

            if (isEqual(copyRect, [Red, Orange, Yellow, Green, Blue, Violet])) {
              setLogs([...logs, 'Congrats! Color green is completed']);
              setSave({ ...save, green: Progress.Done });
              setPuzzle(Puzzle.Menu);
            }

            setRect(copyRect);
          };

          const copy = `Swap ${col1.charAt(0).toUpperCase()} and ${col2.charAt(0).toUpperCase()}`;

          return (
            <div onClick={onClick} key={copy} className="mini-button flex-one">
              {copy}
            </div>
          );
        })}
      </div>
    </>
  );
};

export { DinoCrisis };
