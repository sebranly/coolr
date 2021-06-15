import * as React from 'react';
import { Color, Move, Save, RainbowColor } from '../types';
import classnames from 'classnames';
import { getPowerLogs } from '../utils';

export interface NotesProps {
  className?: string;
  logs: string[];
  save: Save;
}

const Notes: React.FC<NotesProps> = (props) => {
  const { className, logs, save } = props;
  const powerLogs = getPowerLogs(save);
  const reversedLogs = [...logs].reverse().slice(0, 5);

  const hasPowerLogs = powerLogs.length > 0;

  const renderLog = (log: string) => {
    const words = log.split(' ');

    return words.map((word: string, index) => {
      const additionalClass =
        Object.values(Color).includes(word as any) ||
        Object.values(RainbowColor).includes(word as any) ||
        Object.values(Move).includes(word as any)
          ? `${word} italic`
          : '';

      const successClass = word === 'Success:' ? 'green' : '';
      const failureClass = word === 'Failure:' ? 'red' : '';
      const objectiveClass = word === 'Objective:' ? 'orange' : '';
      const classes = classnames(objectiveClass, additionalClass, successClass, failureClass, 'inline');
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
        <div className={classes} key={key}>
          {word}{' '}
        </div>
      );
    });
  };

  const renderPowerLog = (log: string) => (
    <div className="inline power" key={log}>
      {log}
    </div>
  );

  const renderPowerLogs = () => {
    if (!hasPowerLogs) return null;

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
