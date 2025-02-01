import { useState, useEffect } from "react";
import { fetchQuizData } from "../utils/api";
import QuizCard from "../components/QuizCard";
import ProgressBar from "../components/ProgressBar";
import ResultCard from "../components/ResultCard";
import Timer from "../components/Timer";

const Quiz = ({ onFinish }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [showSolution, setShowSolution] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]); // Track user answers
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions
  const [correctAnswerMarks, setCorrectAnswerMarks] = useState(4); // Default value
  const [negativeMarks, setNegativeMarks] = useState(1); // Default value

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData();
        console.log(data); // Log the API response

        // Transform the data to match the expected format
        const transformedData = data.questions.map((question) => ({
          id: question.id,
          question: question.description,
          options: question.options,
          detailedSolution: question.detailed_solution,
          readingMaterial: question.reading_material?.content || null,
        }));

        if (transformedData.length > 0) {
          setQuizData(transformedData);
          setCorrectAnswerMarks(parseInt(data.correct_answer_marks) || 4); // Use API value or default
          setNegativeMarks(parseInt(data.negative_marks) || 1); // Use API value or default
        } else {
          setError("No quiz data available.");
        }
      } catch (err) {
        setError("Failed to load quiz data.");
      } finally {
        setIsLoading(false);
      }
    };
    loadQuizData();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleAnswer(null); // Mark as unanswered if time runs out
    }
  }, [timeLeft, isFinished]);

  const handleAnswer = (selectedOption) => {
    if (answeredQuestions[currentQuestion]) {
      // If the question is already answered, do not update the score again
      return;
    }

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedOption; // Track user's answer
    setUserAnswers(updatedAnswers);

    if (selectedOption) {
      if (selectedOption.is_correct) {
        setScore(score + correctAnswerMarks); // Add marks for correct answers
      } else {
        setScore(score - negativeMarks); // Deduct marks for incorrect answers
      }
    }

    // Mark the question as answered
    setAnsweredQuestions((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = true;
      return updated;
    });

    setShowSolution(true); // Show solution after answering
    setSelectedOption(selectedOption); // Set the selected option
  };

  const handleNext = () => {
    if (!selectedOption) {
      // If no answer is selected, mark as unanswered
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestion] = null; // Mark as unanswered
      setUserAnswers(updatedAnswers);
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30); // Reset timer for the next question
      setShowSolution(false); // Hide solution for the next question
      setSelectedOption(null); // Reset selected option
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0); // Reset score to 0
    setIsFinished(false);
    setTimeLeft(30);
    setShowSolution(false);
    setSelectedOption(null);
    setUserAnswers([]);
    setAnsweredQuestions([]); // Reset answered questions
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (quizData.length === 0) {
    return <div className="text-red-500 text-center mt-8">No quiz data available.</div>;
  }

  const maxScore = quizData.length * correctAnswerMarks; // Calculate maximum score

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {isFinished ? (
        <ResultCard
          score={score}
          maxScore={maxScore}
          quizData={quizData}
          userAnswers={userAnswers}
          onRestart={handleRestart}
        />
      ) : (
        <>
          <ProgressBar progress={((currentQuestion + 1) / quizData.length) * 100} />
          <QuizCard
            question={quizData[currentQuestion].question}
            options={quizData[currentQuestion].options}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestion}
            totalQuestions={quizData.length}
            showSolution={showSolution}
            detailedSolution={quizData[currentQuestion].detailedSolution}
            readingMaterial={quizData[currentQuestion].readingMaterial}
            selectedOption={selectedOption}
            onNext={handleNext}
            score={score} // Pass the score to QuizCard
          />
          <Timer timeLeft={timeLeft} />
        </>
      )}
    </div>
  );
};

export default Quiz;