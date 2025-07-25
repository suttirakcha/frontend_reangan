import SubmitReportDialog from "@/components/custom/dialogs/SubmitReportDialog";
import Loading from "@/components/custom/Loading";
import AnswerChoice from "@/components/quiz/AnswerChoice";
import AnswerTyping from "@/components/quiz/AnswerTyping";
import QuizHeader from "@/components/quiz/QuizHeader";
import StatisticsSection from "@/components/quiz/StatisticsSection";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useQuizStore from "@/stores/useQuizStore";
import useStatStore from "@/stores/useStatStore";
import type { Question } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function QuizPage() {
  const { courseId, lessonId, quizId } = useParams();

  const {
    currentQuiz,
    getCurrentQuiz,
    clearQuiz,
    incorrectAnsweredQuestions,
    loading,
    completeQuiz,
  } = useQuizStore();

  const { updateExp, statistics } = useStatStore();

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [checkIfCorrect, setCheckIfCorrect] = useState(false);
  const [progress, setProgress] = useState(0);

  const [totalAnswered, setTotalAnswered] = useState(0);
  const [answeredChoice, setAnsweredChoice] = useState<number | null>(null);
  const [myAnswer, setMyAnswer] = useState("");
  const [calculatedExp, setCalculatedExp] = useState(0);

  useEffect(() => {
    const getQuestions = async () => {
      if (currentQuiz) clearQuiz();
      await getCurrentQuiz(+courseId!, +lessonId!, +quizId!);
    };

    getQuestions();
    setQuestionIndex(
      Math.floor(Math.random() * currentQuiz?.questions.length!)
    );
    setProgress(100 / currentQuiz?.questions.length!);
  }, []);

  const handleCompleteQuiz = async () => {
    try {
      completeQuiz(+courseId!, +lessonId!, +quizId!);
      await updateExp({
        exp: statistics?.exp! + calculatedExp,
        correct_answered:
          statistics?.correct_answered! +
          (totalAnswered - incorrectAnsweredQuestions?.length),
        incorrect_answered:
          statistics?.incorrect_answered! + incorrectAnsweredQuestions?.length,
      });
    } catch (err: any) {
      console.log(err.response?.data.message || err.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const eachQuestion = currentQuiz?.questions[questionIndex];
  const isCorrect = myAnswer === eachQuestion?.correct_answer;

  const skipQuestion = () => {
    if (isCorrect) {
      currentQuiz?.questions?.splice(questionIndex, 1);
    }

    setQuestionIndex(
      Math.floor(Math.random() * currentQuiz?.questions.length!)
    );
    setMyAnswer("");
    setAnsweredChoice(null);
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
      setCheckIfCorrect(false);
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
      {currentQuiz?.questions.length === 0 ? (
        <StatisticsSection
          courseId={+courseId!}
          exp={calculatedExp || 0}
          onComplete={handleCompleteQuiz}
          totalQuestions={totalAnswered}
          incorrectAnswered={incorrectAnsweredQuestions?.length}
          correctAnswered={totalAnswered - incorrectAnsweredQuestions?.length}
          incorrectQuestions={incorrectAnsweredQuestions}
        />
      ) : (
        <div className={cn("flex flex-col gap-10")}>
          <QuizHeader
            progress={progress * totalAnswered}
            courseId={+courseId!}
            onSkip={skipQuestion}
            disabled={checkIfCorrect}
          />

          {currentQuiz?.questions
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
                      value={myAnswer}
                      isCorrect={checkIfCorrect && isCorrect}
                      isIncorrect={checkIfCorrect && !isCorrect}
                      question={question.question}
                      onChange={(e) => setMyAnswer(e.target.value)}
                    />
                  )}

                  <div className="space-y-2 text-right">
                    <Button
                      disabled={checkIfCorrect || !myAnswer}
                      className="main-btn w-full"
                      onClick={handleRandomQuestion}
                    >
                      Check
                    </Button>
                    <SubmitReportDialog quizId={+quizId!} />
                  </div>
                </main>
              );
            })
            .slice(questionIndex, questionIndex + 1)}
        </div>
      )}
    </div>
  );
}

export default QuizPage;
