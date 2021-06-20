import * as React from 'react';
import { Color, Move, Save, RainbowColor, RupeeColor, Puzzle } from '../types';
import classnames from 'classnames';
import { getPowerLogs } from '../utils';
import { VALID_CODES } from '../constants';

export interface NotesProps {
  className?: string;
  logs: string[];
  puzzle: Puzzle;
  save: Save;
}

const Notes: React.FC<NotesProps> = (props) => {
  const { className, logs, puzzle, save } = props;
  const powerLogs = getPowerLogs(save);
  const reversedLogs = [...logs].reverse().slice(0, 5);

  const hasPowerLogs = powerLogs.length > 0;

  const renderLog = (log: string) => {
    const words = log.split(' ');

    return words.map((word: string, index) => {
      const additionalClass =
        Object.values(Color).includes(word as any) ||
        Object.values(RainbowColor).includes(word as any) ||
        Object.values(RupeeColor).includes(word as any) ||
        Object.values(Move).includes(word as any)
          ? `${word} italic`
          : '';

      const bgClass = word === Color.Black ? 'bg-white' : '';

      const italicClass = word === 'hexactly' ? 'italic' : '';
      const codeClass = VALID_CODES.includes(word) ? word.toLowerCase() : '';

      const successClass = ['Congrats!', 'Success:'].includes(word) ? 'green' : '';
      const failureClass = word === 'Failure:' ? 'red' : '';
      const objectiveClass = ['Objective:', 'additive', 'subtractive'].includes(word) ? 'orange' : '';
      const classes = classnames(
        bgClass,
        codeClass,
        objectiveClass,
        italicClass,
        additionalClass,
        successClass,
        failureClass,
        'inline'
      );

      const key = `${word}-${index}`;

      if (word === 'rainbow!') {
        return (
          <>
            <div className="inline red">r</div>
            <div className="inline orange">a</div>
            <div className="inline yellow">i</div>
            <div className="inline white">n</div>
            <div className="inline green">b</div>
            <div className="inline blue">o</div>
            <div className="inline violet">w</div>
          </>
        );
      }

      return (
        <>
          <div className={classes} key={key}>
            {word}
          </div>
          <div className={'inline bg-black'}> </div>
        </>
      );
    });
  };

  const renderPowerLog = (log: string) => {
    const words = log.split(' ');

    return words.map((word: string, index) => {
      const codeClass = VALID_CODES.includes(word) ? word.toLowerCase() : '';
      const classes = classnames('inline power', codeClass);
      const key = `${word}-${index}`;

      return (
        <div className={classes} key={key}>
          {word}{' '}
        </div>
      );
    });
  };

  const renderPowerLogs = () => {
    if (!hasPowerLogs) return null;
    if (puzzle !== Puzzle.Menu) return null;

    return (
      <>
        <br />
        <h2>Powers</h2>
        {powerLogs.map((log, index) => (
          <div className="block" key={`${log}-${index}`}>
            {renderPowerLog(log)}
          </div>
        ))}
      </>
    );
  };

  const renderLogs = () => {
    return reversedLogs.map((log, index) => (
      <div className="block" key={`${log}-${index}`}>
        {renderLog(log)}
      </div>
    ));
  };

  return (
    <div className="">
      <h2>Logs</h2>
      {renderLogs()}
      {renderPowerLogs()}
    </div>
  );
};

export { Notes };
