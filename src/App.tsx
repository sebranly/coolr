import * as React from 'react';
import { IoIosConstruct } from 'react-icons/io';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { isMobile } from 'react-device-detect';
import { Color, Mode, Progress, Puzzle } from './types';
import { PuzzleSelection } from './components/PuzzleSelection';
import { Notes } from './components/Notes';
import { DinoCrisis } from './components/DinoCrisis';
import { Hexa } from './components/Hexa';
import { Konami } from './components/Konami';
import { SleepingDogs } from './components/SleepingDogs';
import { Spyro } from './components/Spyro';
import { Zelda } from './components/Zelda';
import { Confettis } from './components/Confettis';
import { Credits } from './components/Credits';

import classnames from 'classnames';
import {
  getDefaultSave,
  getPuzzleColor,
  getPuzzleText,
  getLevelsText,
  canMix2,
  getNewLevelsMix2,
  getResultLevelMix2,
  getResultLevelMix3,
  getColorBackgroundPuzzle,
  canMix3,
  getNewLevelsMix3,
  isValidCode,
  getColorPuzzle,
  getCodesInvalidMsg
} from './utils';
import { CODE_BLUE, CODE_CYAN, CODE_GREEN, CODE_LENGTH, CODE_MAGENTA, CODE_RED, CODE_YELLOW } from './constants';

const App = () => {
  const [mode, setMode] = React.useState(Mode.Additive);
  const [logs, setLogs] = React.useState([
    'Welcome to Coolr',
    'This is a puzzle game',
    'If you refresh the page, you lose progress',
    `Make sure to write down any ${CODE_LENGTH}-letter cheat code`
  ]);

  const [code, setCode] = React.useState('');
  const [save, setSave] = React.useState(getDefaultSave());
  const [levels, setLevels] = React.useState<Color[]>([]);
  const [level, setLevel] = React.useState<Color | undefined>();
  // TODO: change
  const [puzzle, setPuzzle] = React.useState(Puzzle.Credits);

  const onRejectLevel = (level: Color) => () => {
    const floorIndex = mode === Mode.Additive ? 1 : 2;
    const isBlackInaccessible = level === Color.Black && mode === Mode.Additive;
    const isWhiteInaccessible = level === Color.White && mode === Mode.Subtractive;

    const isInaccessible = isBlackInaccessible || isWhiteInaccessible;
    if (isInaccessible) {
      setLogs([...logs, `${level} cannot be accessed in ${mode} mixing`]);
    } else {
      setLogs([...logs, `Mix colors from floor ${floorIndex} to access color ${level}`]);
    }
  };

  const toggleMode = () => {
    const newMode = mode === Mode.Additive ? Mode.Subtractive : Mode.Additive;
    setMode(newMode);

    const levelsText = getLevelsText([], newMode);
    setLogs([...logs, `You are now using ${newMode} mixing!`, levelsText]);
    setLevel(undefined);
    setLevels([]);
  };

  const onChangeCode = (e: any) => {
    const newCode = e.currentTarget.value.toUpperCase();

    if (!newCode || /^[A-Z]+$/.test(newCode)) {
      if (newCode.length <= CODE_LENGTH) {
        setCode(newCode);

        if (newCode.length === CODE_LENGTH) {
          const msgInvalid = `Failure: cheat code ${newCode} is invalid`;

          if (isValidCode(newCode)) {
            const newLogs = [...logs, `Success: cheat code ${newCode} is valid`, 'Save has been loaded'];
            const floor1 = { red: Progress.Done, green: Progress.Done, blue: Progress.Done };

            if (newCode === CODE_RED) {
              setSave({ ...save, red: Progress.Done });
              newLogs.push('Color red is completed');
            } else if (newCode === CODE_GREEN) {
              setSave({ ...save, green: Progress.Done });
              newLogs.push('Color green is completed');
            } else if (newCode === CODE_BLUE) {
              setSave({ ...save, blue: Progress.Done });
              newLogs.push('Color blue is completed');
            } else if (newCode === CODE_CYAN) {
              setSave({ ...save, ...floor1, cyan: Progress.Done });
              newLogs.push('Colors red green blue cyan are completed');
            } else if (newCode === CODE_MAGENTA) {
              setSave({ ...save, ...floor1, magenta: Progress.Done });
              newLogs.push('Colors red green blue magenta are completed');
            } else if (newCode === CODE_YELLOW) {
              setSave({ ...save, ...floor1, yellow: Progress.Done });
              newLogs.push('Colors red green blue yellow are completed');
            }

            setLogs(newLogs);
            setPuzzle(Puzzle.Menu);
          } else if (newCode.length === CODE_LENGTH) {
            const additionalMsgInvalid = getCodesInvalidMsg(newCode);
            const logsInvalid = additionalMsgInvalid
              ? [...logs, msgInvalid, additionalMsgInvalid]
              : [...logs, msgInvalid];

            setLogs(logsInvalid);
          }
        }
      }
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
        const resultLevelMix3 = getResultLevelMix3(newLevels, mode);

        setLevel(resultLevelMix3);
        const levelSave = resultLevelMix3;
        if (levelSave && (save as any)[levelSave] !== Progress.Done) {
          setSave({ ...save, [levelSave]: Progress.Available });
        }
      } else if (newLevels.length === 2) {
        const resultLevelMix2 = getResultLevelMix2(newLevels, mode);

        setLevel(resultLevelMix2);
        const levelSave = resultLevelMix2;
        if (levelSave && (save as any)[levelSave] !== Progress.Done) {
          setSave({ ...save, [levelSave]: Progress.Available });
        }
      } else if (newLevels.length < 2) {
        setLevel(newLevels[0]);
      }
    } else if (canMix2(save)) {
      newLevels = getNewLevelsMix2(levels, level);
      setLevels(newLevels);

      if (newLevels.length === 2) {
        const resultLevelMix2 = getResultLevelMix2(newLevels, mode);

        setLevel(resultLevelMix2);
        const levelSave = resultLevelMix2;
        if (levelSave && (save as any)[levelSave] !== Progress.Done) {
          setSave({ ...save, [levelSave]: Progress.Available });
        }
      } else if (newLevels.length < 2) {
        setLevel(newLevels[0]);
      }
    }

    const levelsText = getLevelsText(newLevels, mode);
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
          <h1>Coolr</h1>
          <h2>Puzzle Game</h2>
          <div className="margin">
            This puzzle game is not accessible on mobile. Please visit it on a computer instead. Thank you for your
            understanding!
          </div>
        </div>
        <br />
        <IoIosConstruct className="icon-mobile" size="100px" />
      </HelmetProvider>
    );
  }

  const renderSubheader = () => {
    const subheader = getPuzzleText(puzzle);
    const colorClass = getColorPuzzle(puzzle);
    const backgroundColorClass = getColorBackgroundPuzzle(puzzle);

    return (
      <h2 className="italic">
        <div className={`inline ${colorClass} bg-${backgroundColorClass}`}>{subheader.charAt(0)}</div>
        {subheader.substring(1)}
      </h2>
    );
  };

  const classesMixing = classnames('button', {
    additive: mode === Mode.Additive,
    subtractive: mode === Mode.Subtractive
  });

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
        {renderSubheader()}

        <div className="flex">
          <div className="flex-one margin">
            {puzzle === Puzzle.Menu && (
              <>
                <PuzzleSelection
                  levels={levels}
                  mode={mode}
                  onRejectLevel={onRejectLevel}
                  onSelectLevel={onSelectLevel}
                  save={save}
                />
                {level && (
                  <div onClick={() => setPuzzle(getPuzzleColor(level))} className="button">
                    Enter color
                    <div className={classnames('inline', level)}>{` ${level}`}</div>
                  </div>
                )}
              </>
            )}
            {puzzle === Puzzle.Confettis && (
              <Confettis logs={logs} setPuzzle={setPuzzle} setLogs={setLogs} setSave={setSave} save={save} />
            )}
            {puzzle === Puzzle.Credits && (
              <Credits logs={logs} setPuzzle={setPuzzle} setLogs={setLogs} setSave={setSave} save={save} />
            )}
            {puzzle === Puzzle.DinoCrisis && (
              <DinoCrisis logs={logs} setPuzzle={setPuzzle} setLogs={setLogs} setSave={setSave} save={save} />
            )}
            {puzzle === Puzzle.Hexa && (
              <Hexa logs={logs} setPuzzle={setPuzzle} setLogs={setLogs} setSave={setSave} save={save} />
            )}
            {puzzle === Puzzle.Konami && (
              <Konami logs={logs} setPuzzle={setPuzzle} setLogs={setLogs} setSave={setSave} save={save} />
            )}
            {puzzle === Puzzle.SleepingDogs && (
              <SleepingDogs logs={logs} setPuzzle={setPuzzle} setLogs={setLogs} setSave={setSave} save={save} />
            )}
            {puzzle === Puzzle.Spyro && (
              <Spyro logs={logs} setPuzzle={setPuzzle} setLogs={setLogs} setSave={setSave} save={save} />
            )}
            {puzzle === Puzzle.Zelda && (
              <Zelda logs={logs} setPuzzle={setPuzzle} setLogs={setLogs} setSave={setSave} save={save} />
            )}
            {puzzle !== Puzzle.Menu && (
              <div onClick={() => setPuzzle(Puzzle.Menu)} className="button">
                Back to menu
              </div>
            )}
          </div>
          {puzzle !== Puzzle.Confettis && (
            <div className="flex-one margin">
              <Notes puzzle={puzzle} logs={logs} save={save} />
              {puzzle === Puzzle.Menu && <br />}
              {puzzle === Puzzle.Menu && (
                <input className="text-center" value={code} type="text" onChange={onChangeCode} />
              )}
              {save.white === Progress.Done && puzzle === Puzzle.Menu && (
                <div className={classesMixing} onClick={toggleMode}>
                  Toggle Mixing
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default App;
