const Timer = ({ timeLeft }) => {
    return (
      <div className="mt-4 text-xl font-bold text-gray-700">
        ⏳ Time Left: <span className="text-blue-600">{timeLeft}</span> seconds
      </div>
    );
  };
  
  export default Timer;