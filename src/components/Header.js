import HeaderImage from "../quiz-complete.png";

const Header = () => {
  return (
    <header style={styles.header}>
      <img src={HeaderImage} style={styles.imgStyle} alt="Quiz logo"></img>
      <h1 style={{ color: "white" }}>ReactQuiz</h1>
    </header>
  );
};

const styles = {
  header: {
    textAlign: "center",
  },

  imgStyle: {
    width: 50,
  },
};

export default Header;
