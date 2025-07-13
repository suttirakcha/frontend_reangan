import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface QuizCardProps {
  title: string;
  onStartQuiz: () => void;
  index: number;
}

function QuizCard({ title, onStartQuiz, index }: QuizCardProps) {
  return (
    <div
      className={cn(
        "bg-gray-200 p-5 rounded-4xl min-w-[280px] flex flex-col gap-4",
        { "bg-orange-200": index !== -1 }
      )}
    >
      <h2
        className={cn("text-2xl font-medium", {
          "text-orange-800": index !== -1,
        })}
      >
        {title}
      </h2>
      <Button className="main-btn w-fit" onClick={onStartQuiz}>
        Start
      </Button>
    </div>
  );
}

export default QuizCard;
