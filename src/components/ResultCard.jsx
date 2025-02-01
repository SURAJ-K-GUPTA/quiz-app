const ResultCard = ({ score, maxScore, quizData, userAnswers, onRestart }) => {
    // Categorize questions
    const correctAnswers = quizData.filter(
      (question, index) => userAnswers[index]?.is_correct
    );
    const incorrectAnswers = quizData.filter(
      (question, index) =>
        userAnswers[index] && !userAnswers[index]?.is_correct
    );
    const unansweredQuestions = quizData.filter(
      (question, index) => !userAnswers[index]
    );
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Quiz Completed!</h2>
        <p className="text-xl text-gray-700">
          You scored <span className="font-bold text-blue-600">{score}</span> out of{" "}
          <span className="font-bold text-purple-600">{maxScore}</span>.
        </p>
  
        {/* Correct Answers */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-green-600 mb-4">Correct Answers</h3>
          {correctAnswers.map((question, index) => (
            <div key={question.id} className="mt-4 p-4 bg-green-50 rounded-lg shadow-sm">
              <p className="font-bold text-gray-800">{question.question}</p>
              <p className="text-sm text-gray-600 mt-2">
                Your Answer: <span className="font-semibold">{userAnswers[quizData.indexOf(question)]?.description}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Correct Answer: <span className="font-semibold">{question.options.find((opt) => opt.is_correct)?.description}</span>
              </p>
              <details className="mt-3">
                <summary className="text-blue-600 cursor-pointer font-semibold">
                  View Solution
                </summary>
                <p className="mt-2 text-sm text-gray-700">
                  {question.detailedSolution}
                </p>
              </details>
            </div>
          ))}
        </div>
  
        {/* Incorrect Answers */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-red-600 mb-4">Incorrect Answers</h3>
          {incorrectAnswers.map((question, index) => (
            <div key={question.id} className="mt-4 p-4 bg-red-50 rounded-lg shadow-sm">
              <p className="font-bold text-gray-800">{question.question}</p>
              <p className="text-sm text-gray-600 mt-2">
                Your Answer: <span className="font-semibold">{userAnswers[quizData.indexOf(question)]?.description}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Correct Answer: <span className="font-semibold">{question.options.find((opt) => opt.is_correct)?.description}</span>
              </p>
              <details className="mt-3">
                <summary className="text-blue-600 cursor-pointer font-semibold">
                  View Solution
                </summary>
                <p className="mt-2 text-sm text-gray-700">
                  {question.detailedSolution}
                </p>
              </details>
            </div>
          ))}
        </div>
  
        {/* Unanswered Questions */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">Unanswered Questions</h3>
          {unansweredQuestions.map((question, index) => (
            <div key={question.id} className="mt-4 p-4 bg-blue-50 rounded-lg shadow-sm">
              <p className="font-bold text-gray-800">{question.question}</p>
              <p className="text-sm text-gray-600 mt-2">
                Correct Answer: <span className="font-semibold">{question.options.find((opt) => opt.is_correct)?.description}</span>
              </p>
              <details className="mt-3">
                <summary className="text-blue-600 cursor-pointer font-semibold">
                  View Solution
                </summary>
                <p className="mt-2 text-sm text-gray-700">
                  {question.detailedSolution}
                </p>
              </details>
            </div>
          ))}
        </div>
  
        {/* Restart Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  };
  
  export default ResultCard;