import { ChevronsRight, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useQuizStore from "@/stores/useQuizStore";
import { useTranslation } from "react-i18next";

interface QuizHeaderProps {
  courseId: number;
  progress: number;
  onSkip: () => void;
  disabled?: boolean;
}

function QuizHeader({ progress, courseId, onSkip, disabled }: QuizHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { clearQuiz } = useQuizStore();

  const handleQuit = () => {
    clearQuiz();
    navigate(`/dashboard/course/${courseId}/lessons`);
  };

  return (
    <header className="flex flex-col gap-4 items-end">
      <div className="flex items-center gap-8 w-full">
        <X
          className="h-10 w-10 text-gray-500 cursor-pointer"
          onClick={handleQuit}
        />
        <Progress value={progress} className="h-3.5" />
      </div>
      <div className="flex items-center gap-2">
        <Button disabled={disabled} className="main-btn w-30" onClick={onSkip}>
          <ChevronsRight className="!w-6 !h-6" />
          {t("Skip")}
        </Button>
      </div>
    </header>
  );
}

export default QuizHeader;
