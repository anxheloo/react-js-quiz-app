import { useEffect, useState, useMemo } from "react";
import questions from "../questions";
import summaryLogo from "../quiz-complete (1).png";
import QuestionTimer from "./QuestionTimer";

const Quiz = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [width, setWidth] = useState(100);
  const [timer, setTimer] = useState(5);

  let progressInterval;

  console.log("THis are userAnswers:", userAnswers);
  console.log("THis are correctAnswers:", correctAnswers);

  function storeTheSelectedAnswer(selectedAnswer) {
    if (activeQuestionIndex < questions.length) {
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
      clearInterval(progressInterval); // Clear the interval when an answer is selected
      setWidth(100); // Reset the width to 0
      setTimer(5);
      setActiveQuestionIndex((prevIndex) => prevIndex + 1);

      if (selectedAnswer === questions[activeQuestionIndex].answers[0]) {
        setCorrectAnswers((prevAnswers) => [
          ...prevAnswers,
          {
            Question: questions[activeQuestionIndex].text,
            userSelectedAnswer: selectedAnswer,
            isCorrect: true,
          },
        ]);
      }
    }
  }

  const answerButtons = useMemo(() => {
    if (activeQuestionIndex < questions.length) {
      return questions[activeQuestionIndex].answers
        .map((answer) => (
          <button
            className="answerButton"
            style={styles.answer}
            key={answer}
            onClick={() => storeTheSelectedAnswer(answer)}
          >
            {answer}
          </button>
        ))
        .sort(() => Math.random() - 0.5);
    } else {
      return;
    }
  }, [activeQuestionIndex]);

  return (
    <>
      {activeQuestionIndex < questions.length ? (
        <div style={styles.quizContainer} className="quizContainer">
          <h2 style={{ color: "white", marginBottom: "2rem" }}>
            {questions[activeQuestionIndex].text}
          </h2>
          <div style={styles.answers}>
            {/* {questions[activeQuestionIndex].answers
              .map((answer) => (
                <button
                  className="answerButton"
                  style={styles.answer}
                  key={answer}
                  onClick={() => storeTheSelectedAnswer(answer)}
                >
                  {answer}
                </button>
              ))
              .sort(() => Math.random() - 0.5)} */}

            {answerButtons}
          </div>

          <QuestionTimer
            key={activeQuestionIndex}
            activeQuestionIndex={activeQuestionIndex}
            width={width}
            setWidth={setWidth}
            timer={timer}
            setTimer={setTimer}
            progressInterval={progressInterval}
            storeTheSelectedAnswer={storeTheSelectedAnswer}
          ></QuestionTimer>
        </div>
      ) : (
        <div className="summary">
          <img src={summaryLogo} alt="summary logo"></img>
          <h2>
            Quiz Completed! These are your scores: {correctAnswers.length}
          </h2>
        </div>
      )}
    </>
  );
};

const styles = {
  quizContainer: {
    backgroundColor: "#2d174f",
    borderRadius: 10,
    textAlign: "center",
    paddingBottom: 20,
    paddingTop: 20,
    width: "50%",
    margin: "30px auto",
    boxShadow: "0px 0px 10px #000000",
  },

  answers: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },

  answer: {
    padding: 10,
    borderRadius: 20,
    borderStyle: "none",
    width: "90%",
  },

  nextBtnContainer: {
    textAlign: "center",
    margin: "50px 0",
  },

  nextBtn: {
    padding: 10,
    width: "50%",
    borderRadius: 20,
    borderStyle: "none",
  },
};

export default Quiz;
