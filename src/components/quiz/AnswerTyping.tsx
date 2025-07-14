import { Textarea } from "@/components/ui/textarea";
import type { ChangeEvent } from "react";

interface AnswerTypingProps {
  question: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

function AnswerTyping({ question, onChange } : AnswerTypingProps) {
  return (
    <>
      <h1 className="title">Type your answer below</h1>
      <h1 className="font-medium text-lg">{question}</h1>
      <Textarea
        className="h-30"
        placeholder="Enter your answer here"
        onChange={onChange}
      />
    </>
  );
}

export default AnswerTyping;
