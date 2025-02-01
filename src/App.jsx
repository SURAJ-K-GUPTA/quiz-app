import { useState } from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

const App = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  return (
    <div>
      {isQuizStarted ? (
        <Quiz onFinish={() => setIsQuizStarted(false)} />
      ) : (
        <Home onStartQuiz={() => setIsQuizStarted(true)} />
      )}
    </div>
  );
};

export default App;