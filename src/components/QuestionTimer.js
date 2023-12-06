import React, { useEffect } from "react";

const QuestionTimer = ({
  activeQuestionIndex,
  width,
  timer,
  setWidth,
  setTimer,
  progressInterval,
  storeTheSelectedAnswer,
}) => {
  useEffect(() => {
    const startProgress = () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      progressInterval = setInterval(() => {
        if (width <= 0) {
          storeTheSelectedAnswer(null);
        } else {
          setWidth((prevWidth) => prevWidth - (1 / 5) * 100);
          setTimer((prevTimer) => prevTimer - 1);
        }
      }, 1000);
    };

    startProgress();

    return () => clearInterval(progressInterval);
  }, [width, activeQuestionIndex]);

  return (
    <>
      <div>{timer}</div>
      <div style={styles.myProgress}>
        <div
          className="myBar"
          style={{
            width: `${width}%`,
            height: "30px",
            backgroundColor: "#04aa6d",
            transition: "width 1s linear",
          }}
        ></div>
      </div>
    </>
  );
};

const styles = {
  myProgress: {
    width: "100%",
    height: "30px",
    backgroundColor: "#ddd",
    overflow: "hidden",
  },
};

export default QuestionTimer;
