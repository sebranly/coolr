import * as React from 'react';
import { Save, Progress, Move, Puzzle, Clue } from '../types';
import classnames from 'classnames';
import { clone, isEqual, uniq } from 'lodash';
import { get4DigitsCode } from '../utils';

export interface SleepingDogsProps {
  className?: string;
  logs: string[];
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  setSave: React.Dispatch<React.SetStateAction<Save>>;
  save: Save;
  setPuzzle: React.Dispatch<React.SetStateAction<Puzzle>>;
}

const SleepingDogs: React.FC<SleepingDogsProps> = (props) => {
  const { className, setSave, save, setPuzzle, setLogs, logs } = props;

  const [correctCode] = React.useState(get4DigitsCode());
  const [code, setCode] = React.useState([0, 0, 0, 0]);
  const [clues, setClues] = React.useState([Clue.White, Clue.White, Clue.White, Clue.White]);

  React.useEffect(
    () => setLogs([...logs, 'Objective: Find the correct 4-digit code', `The code uses 4 unique digits`]),
    []
  );

  const onValid = () => {
    const sameDigit = uniq(code).length !== 4;

    if (sameDigit) {
      setLogs([...logs, 'The code uses 4 unique digits']);
    } else {
      if (isEqual(correctCode, code)) {
        setLogs([...logs, 'You found the correct code', 'Congrats! Color cyan is completed']);
        setSave({ ...save, cyan: Progress.Done });
        setPuzzle(Puzzle.Menu);
      } else {
        const copyClues = clone(clues);
        code.map((d, index) => {
          if (correctCode[index] === d) {
            copyClues[index] = Clue.Green;
          } else {
            if (correctCode.includes(d)) {
              copyClues[index] = Clue.Orange;
            } else {
              copyClues[index] = Clue.Red;
            }
          }
        });

        setClues(copyClues);

        setLogs([...logs, 'Invalid digit: red', 'Invalid placement: orange', 'Correct placement: green']);
      }
    }
  };

  const onChange = (i: number, delta: number) => {
    const newDigit = (10 + (code[i] + delta)) % 10;
    const copyCode = clone(code);
    const copyClues = clone(clues);

    copyCode[i] = newDigit;
    copyClues[i] = Clue.White;

    setCode(copyCode);
    setClues(copyClues);
  };

  const renderInput = (index: number) => {
    const classesDigit = `block ${clues[index]}`;

    return (
      <div key={index} className="inline-block code">
        <div onClick={() => onChange(index, 1)} className="block button-digit">
          ▲
        </div>
        <div className={classesDigit}>{code[index]}</div>
        <div onClick={() => onChange(index, -1)} className="block button-digit">
          ▼
        </div>
      </div>
    );
  };

  const renderInputs = () => {
    return (
      <div className="margin-bottom">
        {renderInput(0)}
        {renderInput(1)}
        {renderInput(2)}
        {renderInput(3)}
      </div>
    );
  };

  const renderValidate = () => {
    return (
      <div className="mini-button margin" onClick={onValid}>
        Validate entry
      </div>
    );
  };

  return (
    <div className="flex-one margin">
      {renderInputs()}
      {renderValidate()}
    </div>
  );
};

export { SleepingDogs };
