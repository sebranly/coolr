import * as React from 'react';
import { IoIosConstruct, IoMdColorFill } from 'react-icons/io';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { isMobile } from 'react-device-detect';
import { Color } from './types';
import { PuzzleSelection } from './components/PuzzleSelection';
import { Notes } from './components/Notes';

import classnames from 'classnames';
import { getDefaultSave, getLevelsText, canMix2, getNewLevelsMix2, getResultLevelMix2 } from './utils';

const App = () => {
  const [logs, setLogs] = React.useState(['Welcome to Coolr', 'This is a puzzle game']);

  const [save, setSave] = React.useState(getDefaultSave());
  const [levels, setLevels] = React.useState<Color[]>([]);
  const [level, setLevel] = React.useState<Color | undefined>();

  const onSelectLevel = (level: Color) => () => {
    let newLevels: Color[] = [];

    if (!canMix2(save)) {
      const hasLevel = levels.includes(level);
      newLevels = hasLevel ? [] : [level];

      setLevel(newLevels[0]);
      setLevels(newLevels);
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
    setLogs([...logs, levelsText]);
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
        <div className="flex">
          <div className="flex-three">
            <PuzzleSelection onSelectLevel={onSelectLevel} save={save} />
          </div>
          <div className="flex-two">
            <Notes logs={logs} />
          </div>
        </div>
        {level && (
          <div className="button">
            Enter level<div className={classnames('inline', level)}>{` ${level}`}</div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
};

export default App;
