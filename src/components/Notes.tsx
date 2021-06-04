import * as React from 'react';
import { Color } from '../types';
import classnames from 'classnames';
import { MIX_ONE_COLOR_MSG, MIX_TWO_COLORS_MSG } from '../constants';

export interface NotesProps {
  className?: string;
  logs: string[];
}

const Notes: React.FC<NotesProps> = (props) => {
  const { className, logs } = props;
  const regularLogs = logs.filter((log) => ![MIX_ONE_COLOR_MSG, MIX_TWO_COLORS_MSG].includes(log));
  const powerLogs = logs.filter((log) => [MIX_ONE_COLOR_MSG, MIX_TWO_COLORS_MSG].includes(log));
  const reversedLogs = [...regularLogs].reverse().slice(0, 5);
  const reversedPowerLogs = [...powerLogs].reverse();

  const hasPowerLogs = powerLogs.length > 0;

  const renderLog = (log: string) => {
    const words = log.split(' ');

    return words.map((word: string, index) => {
      const additionalClass = Object.values(Color).includes(word as any) ? `${word} italic` : '';
      const classes = classnames(additionalClass, 'inline');

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
        {reversedPowerLogs.map((log, index) => (
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
