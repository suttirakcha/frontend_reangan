import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronsRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type QuestionType = "multiple_choice" | "typing";

const mockQuestions = [
  {
    id: "abc",
    question: "I ___ a boy.",
    correct_answer: "am",
  },
  {
    id: "abccd",
    question: "He ___ a boy.",
    correct_answer: "is",
  },
  {
    id: "abccd",
    question: "She ___ a girl.",
    correct_answer: "is",
  },
];

function QuizPage() {
  const { lessonId } = useParams();
  const { quizId } = useParams();
  const [progress, setProgress] = useState(20);
  const [questionIndex, setQuestionIndex] = useState(
    Math.floor(Math.random() * mockQuestions.length)
  );
  const [questionType, setQuestionType] =
    useState<QuestionType>("multiple_choice");

  const handleRandomQuestion = () => {
    setQuestionIndex(Math.floor(Math.random() * mockQuestions.length));
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-4 items-end">
        <div className="flex items-center gap-8 w-full">
          <X className="h-10 w-10 text-gray-500" />
          <Progress value={progress} className="h-3.5" />
        </div>
        <Button className="main-btn w-30" onClick={handleRandomQuestion}>
          <ChevronsRight className="!w-6 !h-6" />
          Skip
        </Button>
      </header>

      {mockQuestions
        .map((quiz, index) => {
          const handleAnswer = (answer: string) => {
            if (answer === quiz.correct_answer) {
              mockQuestions.splice(index, 1);
              console.log("correct");
            } else {
              console.log("incorrect");
            }

            handleRandomQuestion();
          };
          return (
            <main
              className="max-w-[600px] mx-auto flex flex-col w-full gap-8"
              key={index}
            >
              <h1 className="title">{quiz.question}</h1>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  className="bg-orange-200 hover:bg-orange-500 hover:text-white w-full text-black text-4xl h-[160px]"
                  onClick={() => handleAnswer("am")}
                >
                  am
                </Button>
                <Button
                  className="bg-orange-200 hover:bg-orange-500 hover:text-white w-full text-black text-4xl h-[160px]"
                  onClick={() => handleAnswer("is")}
                >
                  is
                </Button>
                <Button
                  className="bg-orange-200 hover:bg-orange-500 hover:text-white w-full text-black text-4xl h-[160px]"
                  onClick={() => handleAnswer("are")}
                >
                  be
                </Button>
                <Button
                  className="bg-orange-200 hover:bg-orange-500 hover:text-white w-full text-black text-4xl h-[160px]"
                  onClick={() => handleAnswer("are")}
                >
                  are
                </Button>
              </div>
            </main>
          );
        })
        .slice(questionIndex, questionIndex + 1)}
    </div>
  );
}

export default QuizPage;
