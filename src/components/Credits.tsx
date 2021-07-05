import * as React from 'react';
import { Save, Progress, Move, Puzzle, Color } from '../types';
import classnames from 'classnames';
import { clone, isEqual } from 'lodash';
import { getNextColorGuess } from '../utils';

export interface CreditsProps {
  className?: string;
  logs: string[];
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  setSave: React.Dispatch<React.SetStateAction<Save>>;
  save: Save;
  setPuzzle: React.Dispatch<React.SetStateAction<Puzzle>>;
}

const Credits: React.FC<CreditsProps> = (props) => {
  const { className, setSave, save, setPuzzle, setLogs, logs } = props;
  const initialClues = ['Coolr puzzles were inspired by actual video games'];

  React.useEffect(
    () => setLogs([...logs, 'Objective: Match each video title with its puzzle color', ...initialClues]),
    []
  );

  const { Cyan, Yellow, Magenta, Blue, Green, Red } = Color;
  const [guesses, setGuesses] = React.useState([Green, Green, Green, Green, Green, Green]);
  const correctGuesses = [Cyan, Yellow, Magenta, Blue, Green, Red];

  const onClick = (index: number) => {
    const newGuesses = clone(guesses);

    newGuesses[index] = getNextColorGuess(guesses[index]);

    if (isEqual(newGuesses, correctGuesses)) {
      setLogs([...logs, 'You completed Coolr credits by matching the videos', 'Congrats! Color white is completed']);
      setSave({ ...save, white: Progress.Done });
      setPuzzle(Puzzle.Menu);
    } else {
      setGuesses(newGuesses);
    }
  };

  return (
    <div className="margin">
      <div>
        <iframe
          className="flex-one"
          width="180"
          src="https://www.youtube.com/embed/EnG7jxtJn6o"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        <iframe
          className="flex-one"
          width="180"
          src="https://www.youtube.com/embed/n8R9J__3ozc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        <iframe
          className="flex-one"
          width="180"
          src="https://www.youtube.com/embed/RyaqHNdsqxw"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      <div>
        <iframe
          className="flex-one"
          width="180"
          src="https://www.youtube.com/embed/MkSYX0N07CQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        <iframe
          className="flex-one"
          width="180"
          src="https://www.youtube.com/embed/XTZ4QwLhZSc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        <iframe
          className="flex-one"
          width="180"
          src="https://www.youtube.com/embed/q8bynLcL8lI"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      <div>
        <div className={`clickable-title ${guesses[0]}`} onClick={() => onClick(0)}>
          How to Hack Security Cameras in Sleeping Dogs
        </div>
        <div className={`clickable-title ${guesses[1]}`} onClick={() => onClick(1)}>
          All puzzles in Idol Springs Spyro
        </div>
        <div className={`clickable-title ${guesses[2]}`} onClick={() => onClick(2)}>
          How to Actually Win Facade
        </div>
        <div className={`clickable-title ${guesses[3]}`} onClick={() => onClick(3)}>
          The Konami Code | Gaming Historian
        </div>
        <div className={`clickable-title ${guesses[4]}`} onClick={() => onClick(4)}>
          Dino Crisis 1 -= Batteries Puzzle =-
        </div>
        <div className={`clickable-title ${guesses[5]}`} onClick={() => onClick(5)}>
          OoT Treasure Chest Game 2nd Try No Lens
        </div>
      </div>
    </div>
  );
};

export { Credits };
