const Home = ({ onStartQuiz }) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Quiz App!</h1>
        <button
          onClick={onStartQuiz}
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300"
        >
          Start Quiz
        </button>
      </div>
    );
  };
  
  export default Home;