import * as React from 'react';
import { Save, Progress, RainbowColor, Puzzle } from '../types';
import classnames from 'classnames';
import { getPlural, getRandomInt, getRoomColor, getRupees, getRupeesColor } from '../utils';
import { RUPEES_INITIAL_COUNT } from '../constants';

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
        'One chest has a key to next room, the other has rupees',
        `You currently have ${RUPEES_INITIAL_COUNT} rupee. You are in room 1`,
        `Pick a chest`
      ]),
    []
  );

  const openChest = () => {
    const result = room === 6 ? 0 : getRandomInt(2);

    if (result === 1) {
      const newRoom = room + 1;
      setLogs([...logs, `Chest had the key! You enter room ${newRoom}`]);
      setRoom(newRoom);
    } else {
      const deltaRupees = getRupees(room);
      const newRupees = rupees + deltaRupees;

      const chestMsg = `Chest had ${deltaRupees} ${getPlural('rupee', deltaRupees)}, ${getRupeesColor(
        deltaRupees
      )} rupee`;
      if (newRupees >= 50) {
        setLogs([...logs, chestMsg, `50+ rupees collected`, 'Congrats! Color red is completed']);
        setSave({ ...save, red: Progress.Done });
        setPuzzle(Puzzle.Menu);
      } else if (newRupees < 0) {
        setLogs([...logs, chestMsg, `You wasted all your rupees`, 'Game Over, start again']);
        setPuzzle(Puzzle.Menu);
      } else {
        setLogs([
          ...logs,
          chestMsg,
          `You go back to room 1 and now have ${newRupees} ${getPlural('rupee', newRupees)}`
        ]);
        setRoom(1);
        setRupees(newRupees);
      }
    }
  };

  const [rupees, setRupees] = React.useState(RUPEES_INITIAL_COUNT);
  const [room, setRoom] = React.useState(1);

  const classesRoom = classnames(`room flex bg-${getRoomColor(room)}`);

  if (room === 6)
    return (
      <div className={classesRoom}>
        <div onClick={openChest} className="flex-one chest">
          Final Chest
        </div>
      </div>
    );

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
