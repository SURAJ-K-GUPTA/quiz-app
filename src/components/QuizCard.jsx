import { motion } from "framer-motion";

const QuizCard = ({
  question,
  options,
  onAnswer,
  currentQuestion,
  totalQuestions,
  showSolution,
  detailedSolution,
  readingMaterial,
  selectedOption,
  onNext,
  score,
}) => {
  // Find the correct answer
  const correctAnswer = options.find((option) => option.is_correct);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 max-h-[80vh] overflow-y-auto relative"
    >
      {/* Score Display */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-full shadow-md">
        Score: {score}
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">{question}</h2>
      <div className="space-y-4">
        {options.map((option) => {
          let buttonColor = "bg-gradient-to-r from-blue-500 to-purple-500"; // Default color
          if (selectedOption) {
            if (option.is_correct) {
              buttonColor = "bg-gradient-to-r from-green-500 to-green-600"; // Correct answer
            } else if (selectedOption.id === option.id) {
              buttonColor = "bg-gradient-to-r from-red-500 to-red-600"; // Incorrectly selected answer
            }
          }
          return (
            <motion.button
              key={option.id}
              onClick={() => onAnswer(option)}
              disabled={showSolution} // Disable after selection
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full ${buttonColor} text-white py-3 px-6 rounded-lg shadow-md transition-all duration-300`}
            >
              {option.description}
            </motion.button>
          );
        })}
      </div>
      {showSolution && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
          <h3 className="font-bold text-lg text-gray-700">Solution:</h3>
          <p className="mt-2 text-gray-600">{detailedSolution}</p>
        </motion.div>
      )}
      {readingMaterial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
          <h3 className="font-bold text-lg text-gray-700">Reading Material:</h3>
          <div
            className="mt-2 text-gray-600"
            dangerouslySetInnerHTML={{ __html: readingMaterial }}
          />
        </motion.div>
      )}
      <div className="mt-6 text-gray-600">
        Question {currentQuestion + 1} of {totalQuestions}
      </div>
      {/* Always show the Next button */}
      <div className="flex justify-end mt-6">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuizCard;