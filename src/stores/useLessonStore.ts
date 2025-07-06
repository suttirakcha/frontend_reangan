import { create } from "zustand";

const useQuizStore = create((set) => ({
  currentQuiz: null,
}))

export default useQuizStore;