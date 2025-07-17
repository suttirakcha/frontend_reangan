import { cn } from "@/lib/utils";
import type { Question, Quiz } from "@/types";
import QuizHeader from "./QuizHeader";
import { useEffect, useState, type ReactNode } from "react";
import AnswerChoice from "./AnswerChoice";
import { Button } from "../ui/button";
import AnswerTyping from "./AnswerTyping";
import useQuizStore from "@/stores/useQuizStore";

interface QuizSectionProps {
  courseId: number;
  quizzes: Quiz;
  completedChildren: ReactNode;
  incorrectAnsweredQuestions: Question[];
}

function QuizSection({
  courseId,
  quizzes,
  completedChildren,
  incorrectAnsweredQuestions,
}: QuizSectionProps) {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [checkIfCorrect, setCheckIfCorrect] = useState(false);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [answeredChoice, setAnsweredChoice] = useState<number | null>(null);
  const [myAnswer, setMyAnswer] = useState("");
  const [progress, setProgress] = useState(0);
  const [calculatedExp, setCalculatedExp] = useState(0);

  const eachQuestion = quizzes?.questions[questionIndex];
  const isCorrect = myAnswer === eachQuestion?.correct_answer;

  useEffect(() => {
    setQuestionIndex(Math.floor(Math.random() * quizzes?.questions.length!));
    setProgress(100 / quizzes?.questions.length!);
  }, []);

  const skipQuestion = () => {
    if (isCorrect) {
      quizzes?.questions?.splice(questionIndex, 1);
    }

    setQuestionIndex(Math.floor(Math.random() * quizzes?.questions.length!));
    setMyAnswer("");
    setAnsweredChoice(null);
    setCheckIfCorrect(false);
  };

  const handleRandomQuestion = () => {
    setCheckIfCorrect(true);
    if (isCorrect) {
      setTotalAnswered((prev) => prev + 1);
      setCalculatedExp(10 - incorrectAnsweredQuestions?.length);
    }
    setTimeout(() => {
      if (!isCorrect && !incorrectAnsweredQuestions.includes(eachQuestion!)) {
        incorrectAnsweredQuestions.push(eachQuestion!);
      }
      skipQuestion();
    }, 1500);
  };

  const handleAnswer = (item: string, index: number) => {
    return () => {
      setMyAnswer(item);
      setAnsweredChoice(index + 1);
    };
  };

  return (
    <div>
      {quizzes?.questions.length === 0 ? (
        <>{completedChildren}</>
      ) : (
        <div className={cn("flex flex-col gap-10")}>
          <QuizHeader
            progress={progress * totalAnswered}
            courseId={courseId}
            onSkip={skipQuestion}
            disabled={checkIfCorrect}
          />

          {quizzes?.questions
            .map((question: Question) => {
              const answers = question.choices?.split("|");
              return (
                <main
                  className={cn(
                    "max-w-[600px] mx-auto flex flex-col w-full gap-8"
                  )}
                  key={question.id}
                >
                  {question.question_type === "multiple_choice" ? (
                    <>
                      <h1 className="title">{question.question}</h1>
                      <div className="grid grid-cols-2 gap-4">
                        {answers?.map((answer, index) => {
                          const isAnswered = answeredChoice === index + 1;
                          return (
                            <AnswerChoice
                              key={index + 1}
                              isAnswered={isAnswered}
                              isCorrect={
                                checkIfCorrect &&
                                answer === question.correct_answer
                              }
                              isIncorrect={
                                isAnswered && checkIfCorrect && !isCorrect
                              }
                              answer={answer}
                              onAnswer={handleAnswer(answer, index)}
                            />
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <AnswerTyping
                      question={question.question}
                      onChange={(e) => setMyAnswer(e.target.value)}
                    />
                  )}

                  <Button
                    disabled={checkIfCorrect || !myAnswer}
                    className="main-btn"
                    onClick={handleRandomQuestion}
                  >
                    Check
                  </Button>
                </main>
              );
            })
            .slice(questionIndex, questionIndex + 1)}
        </div>
      )}
    </div>
  );
}

export default QuizSection;
