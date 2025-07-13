import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import type { Question } from "@/types";

interface StatisticsSectionProps {
  courseId: number;
  exp: number;
  totalQuestions: number;
  incorrectAnswered: number;
  correctAnswered: number;
  onComplete: () => void;
  incorrectQuestions: Question[];
}

function StatisticsSection({
  courseId,
  exp,
  totalQuestions,
  incorrectAnswered,
  correctAnswered,
  onComplete,
  incorrectQuestions,
}: StatisticsSectionProps) {
  const navigate = useNavigate();
  const handleComplete = () => {
    onComplete();
    navigate(`/dashboard/course/${courseId}/lessons`);
  };

  const stats = [
    { title: "EXP", value: exp },
    { title: "Total questions", value: totalQuestions },
    { title: "Incorrect answered", value: incorrectAnswered },
    { title: "Correct answered", value: correctAnswered },
  ];

  return (
    <div className="flex m-auto w-full h-full max-w-[600px] border border-orange-500 p-8 rounded-lg">
      <div className="space-y-8 w-full">
        <div className="flex flex-col gap-4">
          <h1 className="title">Statistics</h1>
          <div className="flex flex-col gap-1">
            {stats.map((stat, index) => (
              <div
                className="title-sm flex items-center justify-between anim-fade-fast opacity-0"
                style={{ animationDelay: `${200 * index}ms` }}
              >
                <h2>{stat.title}:</h2>
                <p className="font-medium">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {incorrectAnswered ? (
          <div className="flex flex-col gap-4 anim-fade opacity-0" style={{ animationDelay: `${200 * stats.length}ms` }}>
            <h2 className="title">Previous mistakes</h2>
            <div className="flex flex-col gap-2">
              {incorrectQuestions.map((question) => (
                <div>
                  <h2 className="text-lg font-bold">{question.question}</h2>
                  <p className="text-lg font-medium">
                    Correct answer: {question.correct_answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <Button onClick={handleComplete} className="main-btn w-full">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

export default StatisticsSection;
