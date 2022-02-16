import { useEffect, useState } from "react";

const ColorChoice = ({colorPallete, kingColorIndex, onColorClick, resetFlag, currDifficultyLvl}) => {
  const [clickStatus, setClickStatus] = useState();

  useEffect(() => {
    setClickStatus(new Array(currDifficultyLvl).fill(0));
  }, []);

  useEffect(() => {
    setClickStatus(new Array(currDifficultyLvl).fill(0));
  }, [resetFlag]);

  const onClickHandler = (key) => {
    if (key !== kingColorIndex) {
      setClickStatus((prevState) => {
        prevState[key] = 2;
        return [...prevState];
      });
      onColorClick("wrong");
    } else if (key === kingColorIndex) {
      setClickStatus(() => {
        return new Array(currDifficultyLvl).fill(1);
      });
      onColorClick("correct");
    }
  };

  return (
    <div className=" grid grid-cols-3 grid-flow-row gap-4 m-10 justify-around py-10 pl-20 pb-40">
      {colorPallete?.map((rgbColor) => (
        <div
          key={rgbColor.key}
          className={
            " w-52 h-52 rounded-3xl " +
            (clickStatus && clickStatus[rgbColor.key] === 0 && "cursor-pointer")
          }
          onClick={() => onClickHandler(rgbColor.key)}
          style={{
            backgroundColor:
            clickStatus[rgbColor.key] === 0
                ? rgbColor.rgb
                : clickStatus[rgbColor.key] === 1
                ? colorPallete[kingColorIndex].rgb
                : `rgb(0,0,0)`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default ColorChoice;
