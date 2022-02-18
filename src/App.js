import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import ColorChoice from "./components/ColorChoice";
import { addScore } from "./Redux/Actions/AddScoreAction";
import { resetScore } from "./Redux/Actions/ResetScoreAction";
import { setHighScore } from "./Redux/Actions/SetHighScoreAction";

function App() {
  const currentScore = useSelector(state => state.currScore);
  const highScore = useSelector(state => state.highScore);
  const playerHistory = useSelector(state => state.playeHistory);
  const dispatch = useDispatch();

  const [currDifficultyLvl, setCurrDifficultyLvl] = useState();
  const [colorPallete, setColorPallete] = useState();
  const [kingColorIndex, setKingColorIndex] = useState();
  const [result, setResult] = useState();
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setCurrDifficultyLvl(difficulty.hardLvl);
    setColorPallete(CreatePallete(currDifficultyLvl));
    setKingColorIndex(Math.floor(Math.random() * currDifficultyLvl));
    setResult("neutral");
  }, []);
  

  const difficulty = {
    easyLvl: 3,
    hardLvl: 6,
  };


  const rndColorGen = () => {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    // If final color is too dark, then the generator will rerun to get get brighter colors
    if (red + green + blue < 30) {
      rndColorGen();
    }
    return `rgb(${red},${green},${blue})`;
  };
  const CreatePallete = (count) => {
    const palletColor = [];
    for (let i = 0; i < count; i++) {
      palletColor.push({ key: i, rgb: rndColorGen() });
    }
    return palletColor;
  };

  useEffect(() => {
    resetHandler();
  }, [currDifficultyLvl]);

  const colorClickHandler = (status) => {
    if (status === "wrong") {
      setResult("wrong");
      if (currentScore > highScore){
        dispatch(setHighScore(currentScore));
      }
      dispatch(resetScore(currentScore));
    } else if (status === "correct") {
      setResult("correct");
      dispatch(addScore(currentScore));
      setTimeout(resetHandler, 1500);
    }
  };

  const resetHandler = () => {
    setReset(!reset);
    setColorPallete(CreatePallete(currDifficultyLvl));
    setKingColorIndex(Math.floor(Math.random() * currDifficultyLvl));
    setResult("neutral");
  };

  const onEasyClickHandler = () => {
    setCurrDifficultyLvl(difficulty.easyLvl);
  };
  const onHardClickHandler = () => {
    setCurrDifficultyLvl(difficulty.hardLvl);
  };


  return (
    <div className=" bg-black">
      <div className=" text-center font-extrabold text-4xl text-white bg-emerald-500 py-5">
        REACT COLOR PICKER GAME
        <br />
        <span className=" text-5xl font-semibold uppercase">
          {/* Here Below, colorPallete is not defined on the first render so we first check if it is defined or not  */}
          {colorPallete && colorPallete[kingColorIndex]?.rgb}
        </span>
      </div>
      <div className=" flex font-bold text-white bg-sky-500 justify-center py-2 px-20 align-middle">
        <div
          className=" mr-32 p-1 hover:bg-emerald-700 rounded-md cursor-pointer"
          onClick={resetHandler}
        >
          RESET COLOR PALLETE?
        </div>
        <div
          className={
            " mr-32 p-1 rounded-md " +
            (result === "correct"
              ? " text-lime-500 bg-white"
              : result === "wrong" && " text-red-600 bg-white")
          }
        >
          {result === "neutral"
            ? "RESULT"
            : result === "wrong"
            ? "WRONG ANSWER!"
            : result === "correct" && "CORRECT ANSWER!"}
        </div>
        <div className="flex justify-between">
          <div
            onClick={onEasyClickHandler}
            className={
              "mx-2 p-1 rounded-md " +
              (currDifficultyLvl === difficulty.easyLvl
                ? " bg-emerald-700"
                : "cursor-pointer")
            }
          >
            EASY
          </div>
          <div
            onClick={onHardClickHandler}
            className={
              "mx-2 p-1 rounded-md " +
              (currDifficultyLvl === difficulty.hardLvl
                ? " bg-emerald-700"
                : "cursor-pointer")
            }
          >
            HARD
          </div>
        </div>
      </div>

      <div className="flex font-black text-black bg-white justify-around py-2 px-20 align-middle ">
        <div>Current Score: {currentScore}</div>
        <div><button>Last Color Clicked: {playerHistory}</button></div>
        <div>Previous High Score: {highScore}</div>
      </div>

      <ColorChoice
        colorPallete={colorPallete}
        kingColorIndex={kingColorIndex}
        onColorClick={colorClickHandler}
        resetFlag={reset}
        currDifficultyLvl={currDifficultyLvl}
      />
    </div>
  );
}

export default App;
