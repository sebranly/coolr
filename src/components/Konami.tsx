import * as React from 'react';
import { Save, Progress, Move, Puzzle } from '../types';
import classnames from 'classnames';
import { clone, isEqual } from 'lodash';

export interface KonamiProps {
  className?: string;
  logs: string[];
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  setSave: React.Dispatch<React.SetStateAction<Save>>;
  save: Save;
  setPuzzle: React.Dispatch<React.SetStateAction<Puzzle>>;
}

const Konami: React.FC<KonamiProps> = (props) => {
  const { className, setSave, save, setPuzzle, setLogs, logs } = props;

  const pos = [0, 1, 2];

  const initialPosition = { x: 1, y: 1 };
  const [position, setPosition] = React.useState(initialPosition);
  const [sequence, setSequence] = React.useState<Move[]>([]);

  const { Left, Right, Up, Down } = Move;

  const correctSequence = [Up, Up, Down, Down, Left, Right, Left, Right];

  React.useEffect(() => setLogs([...logs, 'Dance the Konami Sequence']), []);

  const onDance = (move: Move) => {
    let decaX = 0;
    let decaY = 0;

    if (move === Left) decaX = -1;
    else if (move === Right) decaX = 1;
    else if (move === Up) decaY = -1;
    else if (move === Down) decaY = 1;

    const newPosX = (position.x + decaX + pos.length) % pos.length;
    const newPosY = (position.y + decaY + pos.length) % pos.length;
    setPosition({ x: newPosX, y: newPosY });

    const isValid = correctSequence[sequence.length] === move;

    if (isValid) {
      const newSequence = [...sequence, move];
      setSequence(newSequence);
      const isDone = isEqual(newSequence, correctSequence);

      if (!isDone) setLogs([...logs, `Correct sequence so far: ${newSequence.join(' ')}`]);

      if (isDone) {
        setLogs([...logs, `Sequence completed: ${newSequence.join(' ')}`, 'Congrats! Color blue is completed']);
        setSave({ ...save, blue: Progress.Done });
        setPuzzle(Puzzle.Menu);
      }
    } else {
      setSequence([]);
      setLogs([...logs, `Sequence broken because of ${move}`]);
    }
  };

  const renderRow = (y: number) => {
    return pos.map((p, index) => {
      const isPos = index === position.x && y === position.y;
      const copy = isPos ? '+' : '-';
      const squareClasses = classnames('inline flex-one square', { 'square-pos': isPos });
      return <div className={squareClasses}>{copy}</div>;
    });
  };

  const renderRows = () => {
    return pos.map((p, index) => {
      return <div className="block flex">{renderRow(index)}</div>;
    });
  };

  return (
    <>
      <div className="margin-bottom">{renderRows()}</div>
      <div onClick={() => onDance(Up)} className="mini-button up">
        Up
      </div>
      <div className="block flex">
        <div onClick={() => onDance(Left)} className="mini-button flex-one left">
          Left
        </div>
        <div onClick={() => onDance(Right)} className="mini-button flex-one right">
          Right
        </div>
      </div>
      <div onClick={() => onDance(Down)} className="mini-button down">
        Down
      </div>
    </>
  );
};

export { Konami };
