import * as React from 'react';
import { Color, Save, RainbowColor } from '../types';
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
        Object.values(Color).includes(word as any) || Object.values(RainbowColor).includes(word as any)
          ? `${word} italic`
          : '';
      const successClass = word === 'Success:' ? 'green' : '';
      const failureClass = word === 'Failure:' ? 'red' : '';
      const classes = classnames(additionalClass, successClass, failureClass, 'inline');

      return (
        <div className={classes} key={`${word}-${index}`}>
          {word}{' '}
        </div>
      );
    });
  };

  const renderPowerLog = (log: string) => (
    <div className="inline" key={log}>
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
