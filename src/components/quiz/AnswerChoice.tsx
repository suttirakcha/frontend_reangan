import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface AnswerChoiceProps {
  isAnswered: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
  onAnswer: () => void;
  answer: string;
}

function AnswerChoice({
  isAnswered,
  isCorrect,
  isIncorrect,
  onAnswer,
  answer,
}: AnswerChoiceProps) {
  return (
    <Button
      className={cn(
        "bg-orange-200 hover:bg-orange-400 whitespace-normal hover:text-white w-full text-black text-4xl h-[160px]",
        {
          "!bg-orange-500 !text-white": isAnswered,
        },
        {
          "!bg-green-500 !text-white": isCorrect,
        },
        {
          "!bg-red-500 !text-white": isIncorrect,
        }
      )}
      onClick={onAnswer}
    >
      {answer}
    </Button>
  );
}

export default AnswerChoice;
