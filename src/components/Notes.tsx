import * as React from 'react';
import { Color } from '../types';
import classnames from 'classnames';

export interface NotesProps {
  className?: string;
  logs: string[];
}

const Notes: React.FC<NotesProps> = (props) => {
  const { className, logs } = props;
  const reversedLogs = [...logs].reverse().slice(0, 10);

  const renderLog = (log: string) => {
    const words = log.split(' ');

    return words.map((word: string, index) => {
      const additionalClass = Object.values(Color).includes(word as any) ? word : '';
      const classes = classnames(additionalClass, 'inline');

      return (
        <div className={classes} key={`${word}-${index}`}>
          {word}{' '}
        </div>
      );
    });
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
    </div>
  );
};

export { Notes };
