import { cn } from "@/lib/utils";
import type { Question } from "@/types";

interface QuestionSectionProps {
  index: number;
  questions: Question[];
}

function QuestionSection({ index, questions }: QuestionSectionProps) {
  return (
    <div>
      {questions.map((question, index) => {
        return (
          <main
            className={cn("max-w-[600px] mx-auto flex flex-col w-full gap-8")}
            key={index}
          >
            <h1 className="title">{question.question}</h1>
          </main>
        );
      }).slice(index, index + 1)}
    </div>
  );
}

export default QuestionSection;
