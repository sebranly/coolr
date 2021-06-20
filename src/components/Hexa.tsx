import * as React from 'react';
import { Save, Progress, Move, Puzzle } from '../types';
import classnames from 'classnames';
import { clone, isEqual } from 'lodash';

export interface HexaProps {
  className?: string;
  logs: string[];
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  setSave: React.Dispatch<React.SetStateAction<Save>>;
  save: Save;
  setPuzzle: React.Dispatch<React.SetStateAction<Puzzle>>;
}

const Hexa: React.FC<HexaProps> = (props) => {
  const { className, setSave, save, setPuzzle, setLogs, logs } = props;
  const initialClues = ['I am also known as hexactly the following...', 'red 250 green 202 blue 222'];

  React.useEffect(() => setLogs([...logs, 'Objective: Find the 6-letter word', ...initialClues]), []);

  const [code, setCode] = React.useState('');

  const onChangeCode = (e: any) => {
    const newCode = e.currentTarget.value.toUpperCase();

    if (newCode === 'FACADE') {
      setLogs([...logs, 'You found the 6-letter word: #FACADE', 'Congrats! Color magenta is completed']);
      setSave({ ...save, magenta: Progress.Done });
      setPuzzle(Puzzle.Menu);
    } else if (newCode.length === 0) {
      setCode(newCode);
      setLogs([...logs, ...initialClues]);
    } else if (newCode.length > 6) {
      setLogs([...logs, 'The word only has 6 letters']);
    } else if (/^[A-F]+$/.test(newCode)) {
      setCode(newCode);
    } else if (/[G-Z]/.test(newCode)) {
      setLogs([...logs, `6-letter word does not contain letter: ${newCode[newCode.length - 1]}`]);
    }
  };

  return (
    <div className="flex-one margin">
      <div className="flex-one hexa">Describe me!</div>
      <input className="text-center" value={code} type="text" onChange={onChangeCode} />
    </div>
  );
};

export { Hexa };
