import { useEffect, useState } from "react";
import ColorChoice from "./components/ColorChoice";

function App() {
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
    } else if (status === "correct") {
      setResult("correct");
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
          RESET ?
        </div>
        <div className=" mr-32 p-1">
          {result === "neutral"
            ? "RESULT"
            : result === "wrong"
            ? "WRONG ANSWER!"
            : result === "correct" && "CORRECT!"}
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
