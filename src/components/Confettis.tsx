import * as React from 'react';
import { Save, Progress, Move, Puzzle } from '../types';
import classnames from 'classnames';
import { clone, isEqual } from 'lodash';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

export interface ConfettisProps {
  className?: string;
  logs: string[];
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  setSave: React.Dispatch<React.SetStateAction<Save>>;
  save: Save;
  setPuzzle: React.Dispatch<React.SetStateAction<Puzzle>>;
}

const Confettis: React.FC<ConfettisProps> = (props) => {
  const { className, setSave, save, setPuzzle, setLogs, logs } = props;
  const { width, height } = useWindowSize();

  return (
    <div className="flex-one margin">
      <Confetti width={width} height={height} />
      <div className="flex-one">Congrats Faithy!</div>
      <div className="flex-one">You completed Coolr!</div>
      <div className="flex-one">Reward: coupon for the PS4/PS5 mystery game of your choice!</div>
      <div className="flex-one">Contact Sebi for additional details!</div>
    </div>
  );
};

export { Confettis };
