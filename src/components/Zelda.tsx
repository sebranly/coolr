import * as React from 'react';
import { Save, Progress, RainbowColor, Puzzle } from '../types';
import classnames from 'classnames';
import { clone, isEqual } from 'lodash';
import { getRandomInt, getRoomColor, getRupees } from '../utils';

export interface ZeldaProps {
  className?: string;
  logs: string[];
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  setSave: React.Dispatch<React.SetStateAction<Save>>;
  save: Save;
  setPuzzle: React.Dispatch<React.SetStateAction<Puzzle>>;
}

const Zelda: React.FC<ZeldaProps> = (props) => {
  const { className, setSave, save, setPuzzle, setLogs, logs } = props;

  React.useEffect(
    () =>
      setLogs([
        ...logs,
        'Objective: Collect 50 Rupees',
        'Entering room 1 costs 3 rupees',
        'One chest has a key to next room, the other has rupees',
        'You currently have 10 rupees. You are in room 1'
      ]),
    []
  );

  const openChest = () => {
    const result = getRandomInt(2);

    if (result === 1) {
      const newRoom = room + 1;
      setLogs([...logs, `Chest had the key! You enter room ${newRoom}`]);
      setRoom(newRoom);
    } else {
      const deltaRupees = getRupees(room);
      const newRupees = rupees + deltaRupees - 3;

      if (newRupees >= 50) {
        setLogs([
          ...logs,
          `Chest had ${deltaRupees} rupees`,
          `50+ rupees collected`,
          'Congrats! Color red is completed'
        ]);
        setSave({ ...save, red: Progress.Done });
        setPuzzle(Puzzle.Menu);
      } else if (newRupees < 0) {
        setLogs([...logs, `Chest had ${deltaRupees} rupees`, `You wasted all your rupees`, 'Game Over, start again']);
        setPuzzle(Puzzle.Menu);
      } else {
        setLogs([
          ...logs,
          `Chest had ${deltaRupees} rupees`,
          'You go back to room 1 and pay 3 rupees',
          `You now have ${newRupees} rupees`
        ]);
        setRoom(1);
        setRupees(newRupees);
      }
    }
  };

  const [rupees, setRupees] = React.useState(10);
  const [room, setRoom] = React.useState(1);

  const classesRoom = classnames(`room flex bg-${getRoomColor(room)}`);

  return (
    <div className={classesRoom}>
      <div onClick={openChest} className="flex-one chest">
        Chest 1
      </div>
      <div onClick={openChest} className="flex-one chest">
        Chest 2
      </div>
    </div>
  );
};

export { Zelda };
