import * as React from 'react';
import { IoIosConstruct, IoMdColorFill } from 'react-icons/io';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { isMobile } from 'react-device-detect';
import { Color, Progress } from './types';
import { PuzzleSelection } from './components/PuzzleSelection';
import { Notes } from './components/Notes';

import classnames from 'classnames';
import {
  getDefaultSave,
  getLevelsText,
  canMix2,
  getNewLevelsMix2,
  getResultLevelMix2,
  getResultLevelMix3,
  canMix3,
  getNewLevelsMix3
} from './utils';

const App = () => {
  const [logs, setLogs] = React.useState([
    'Welcome to Coolr',
    'This is a puzzle game',
    'If you refresh the page, you lose progress',
    'Make sure to write down any 5-letter code'
  ]);

  const [save, setSave] = React.useState(getDefaultSave());
  const [levels, setLevels] = React.useState<Color[]>([]);
  const [level, setLevel] = React.useState<Color | undefined>();

  const onRejectLevel = (level: Color) => () => {
    setLogs([...logs, `Mix colors from floor 1 to access color ${level}`]);
  };

  const onChangeCode = (e: any) => {
    const code = e.currentTarget.value;

    if (code.length !== 5) return;

    if (code !== 'CHEAT') setLogs([...logs, `Failure: cheat code ${code} is invalid`]);
    else {
      setSave({ ...save, red: Progress.Done, green: Progress.Done, blue: Progress.Done });
      setLogs([
        ...logs,
        `Success: cheat code ${code} is valid`,
        'Save has been loaded',
        'red green blue are completed'
      ]);
    }
  };

  const onSelectLevel = (level: Color) => () => {
    let newLevels: Color[] = [];
    let additionalLogs = [];

    if (!canMix2(save)) {
      const hasLevel = levels.includes(level);
      newLevels = hasLevel ? [] : [level];

      setLevel(newLevels[0]);
      setLevels(newLevels);
    } else if (canMix3(save)) {
      newLevels = getNewLevelsMix3(levels, level);
      setLevels(newLevels);

      if (newLevels.length === 3) {
        const resultLevelMix3 = getResultLevelMix3(newLevels);

        setLevel(resultLevelMix3);
      } else if (newLevels.length === 2) {
        const resultLevelMix2 = getResultLevelMix2(newLevels);

        setLevel(resultLevelMix2);
      } else if (newLevels.length < 2) {
        setLevel(newLevels[0]);
      }
    } else if (canMix2(save)) {
      newLevels = getNewLevelsMix2(levels, level);
      setLevels(newLevels);

      if (newLevels.length === 2) {
        const resultLevelMix2 = getResultLevelMix2(newLevels);

        setLevel(resultLevelMix2);
      } else if (newLevels.length < 2) {
        setLevel(newLevels[0]);
      }
    }

    const levelsText = getLevelsText(newLevels);
    additionalLogs.push(levelsText);
    setLogs([...logs, ...additionalLogs]);
  };

  if (isMobile) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>Coolr</title>
          <link rel="canonical" href="https://sebranly.github.io/coolr" />
        </Helmet>
        <div className="mobile">
          <h1>Coolr: Puzzle Game</h1>
          <div>
            We are working hard to make this website accessible on mobile. In the meantime, please visit it on a
            computer instead. Thank you for your understanding!
          </div>
        </div>
        <br />
        <IoIosConstruct className="icon-mobile" size="100px" />
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        data-cross-origin="anonymous"
      />
      <Helmet>
        <title>Coolr</title>
        <link rel="canonical" href="https://sebranly.github.io/coolr" />
      </Helmet>
      <div className="main">
        <h1 className="white">Coolr</h1>
        <h2 className="white italic">Menu</h2>
        <div className="flex">
          <div className="flex-two">
            <PuzzleSelection levels={levels} onRejectLevel={onRejectLevel} onSelectLevel={onSelectLevel} save={save} />
            {level && (
              <div className="button">
                Enter color<div className={classnames('inline', level)}>{` ${level}`}</div>
              </div>
            )}
          </div>
          <div className="flex-two">
            <Notes logs={logs} save={save} />
            <br />
            <input className="text-center" type="text" onChange={onChangeCode} />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default App;
