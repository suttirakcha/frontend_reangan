import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { ChangeEvent } from "react";

interface AnswerTypingProps {
  question: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  isCorrect: boolean;
  isIncorrect: boolean;
}

function AnswerTyping({ question, onChange, value, isCorrect, isIncorrect }: AnswerTypingProps) {
  return (
    <>
      <h1 className="title">Type your answer below</h1>
      <h1 className="font-medium text-lg">{question}</h1>
      <Textarea
        className={cn("h-30", {
          "border-red-500 bg-red-100": isIncorrect,
          "border-green-500 bg-green-100": isCorrect,
        })}
        value={value}
        disabled={isCorrect || isIncorrect}
        placeholder="Enter your answer here"
        onChange={onChange}
      />
    </>
  );
}

export default AnswerTyping;
