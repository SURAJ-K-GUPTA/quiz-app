import axios from "axios";

// const API_URL = "https://api.jsonserve.com/Uw5CrX";
// const API_URL = "/api/Uw5CrX"; // Use the proxy path
const API_URL = "https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX";

export const fetchQuizData = async () => {
    try {
      const response = await axios.get(API_URL);
      if (response.data && response.data.questions) {
        return response.data;
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      return { questions: [] }; // Return a fallback to avoid breaking the app
    }
  };