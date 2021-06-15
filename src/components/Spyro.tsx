import * as React from 'react';
import { Save, Progress, Move, Puzzle } from '../types';
import classnames from 'classnames';
import { clone, isEqual } from 'lodash';

export interface SpyroProps {
  className?: string;
  logs: string[];
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  setSave: React.Dispatch<React.SetStateAction<Save>>;
  save: Save;
  setPuzzle: React.Dispatch<React.SetStateAction<Puzzle>>;
}

const Spyro: React.FC<SpyroProps> = (props) => {
  const { className, setSave, save, setPuzzle, setLogs, logs } = props;

  const [tiles, setTiles] = React.useState([false, true, false, true, true, true, false, true, false]);

  React.useEffect(
    () => setLogs([...logs, 'Objective: Lit all the Tiles', `Clicking a tile toggles its state and its neighbors'`]),
    []
  );

  const onChange = (i: number) => {
    if (i === 4) return;

    const copyTiles = clone(tiles);

    copyTiles[i] = !copyTiles[i];

    if (i === 0) {
      copyTiles[1] = !copyTiles[1];
      copyTiles[3] = !copyTiles[3];
    } else if (i === 1) {
      copyTiles[0] = !copyTiles[0];
      copyTiles[2] = !copyTiles[2];
    } else if (i === 2) {
      copyTiles[1] = !copyTiles[1];
      copyTiles[5] = !copyTiles[5];
    } else if (i === 3) {
      copyTiles[0] = !copyTiles[0];
      copyTiles[6] = !copyTiles[6];
    } else if (i === 5) {
      copyTiles[2] = !copyTiles[2];
      copyTiles[8] = !copyTiles[8];
    } else if (i === 6) {
      copyTiles[3] = !copyTiles[3];
      copyTiles[7] = !copyTiles[7];
    } else if (i === 7) {
      copyTiles[6] = !copyTiles[6];
      copyTiles[8] = !copyTiles[8];
    } else if (i === 8) {
      copyTiles[5] = !copyTiles[5];
      copyTiles[7] = !copyTiles[7];
    }

    setTiles(copyTiles);

    if (!copyTiles.some((t) => t === false)) {
      setLogs([...logs, 'All tiles are lit', 'Congrats! Color magenta is completed']);
      setSave({ ...save, magenta: Progress.Done });
      setPuzzle(Puzzle.Menu);
    }
  };

  const renderRow = (rowIndexes: number[]) => {
    return (
      <div className="block flex">
        {rowIndexes.map((i, index) => {
          const tile = tiles[i];
          const isExistingTile = i !== 4;
          const squareClasses = classnames('inline flex-one', {
            'bg-white': isExistingTile && !tile,
            'bg-black': !isExistingTile,
            'bg-violet': isExistingTile && tile,
            tile: isExistingTile
          });
          return (
            <div onClick={() => onChange(i)} key={index} className={squareClasses}>
              {' '}
            </div>
          );
        })}
      </div>
    );
  };

  const renderTiles = () => {
    return (
      <div className="margin-bottom tiles">
        {renderRow([0, 1, 2])}
        {renderRow([3, 4, 5])}
        {renderRow([6, 7, 8])}
      </div>
    );
  };

  return <div className="flex-one margin">{renderTiles()}</div>;
};

export { Spyro };
