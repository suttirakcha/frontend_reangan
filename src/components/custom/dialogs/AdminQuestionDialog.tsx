import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  questionsSchema,
  type QuestionDetailFields,
} from "@/schemas/courseDetailSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAdminQuizStore from "@/stores/useAdminQuizStore";
import type { Question, Quiz } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import useAdminLessonStore from "@/stores/useAdminLessonStore";

interface AdminQuestionDialogProps {
  trigger: ReactNode;
  question?: Question;
  quizzes?: Quiz[];
  id?: number;
}

function AdminQuestionDialog({
  trigger,
  question,
  quizzes,
  id,
}: AdminQuestionDialogProps) {
  const { t } = useTranslation();
  const { register, handleSubmit, formState, setValue } = useForm<QuestionDetailFields>({
    // resolver: zodResolver(questionsSchema),
  });
  const { errors, isSubmitting } = formState;
  const { lessons } = useAdminLessonStore();
  const { createQuestion, updateQuestion } = useAdminQuizStore();

  const onSubmit = async (data: QuestionDetailFields) => {
    try {
      const result = { ...data, quizId: +data.quizId! }
      const res = await (id ? updateQuestion(result, id) : createQuestion(result));
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err.response?.data.message || err.message);
    }
  };

  // const findQuestion =
  //   id && quizId
  //     ? lessons
  //         ?.find((lesson: any) => lesson.id === id)
  //         ?.quizzes.find((quiz: any) => quiz.id === quizId)
  //         ?.questions.find((question: any) => question.id === id)
  //     : undefined;

  // console.log("id", id);
  // console.log("quizid", quizId);

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {id ? "Update question" : "Create question"}
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col w-full gap-1">
            {t("Question")}
            <Input
              {...register("question")}
              placeholder={t("Enter the question")}
              defaultValue={id ? question?.question : ""}
            />
            {errors.question && (
              <p className="text-red-500 text-sm">
                {t(errors.question?.message!)}
              </p>
            )}
          </label>
          <label className="flex flex-col w-full gap-1">
            {t("Correct answer")}
            <Input
              {...register("correct_answer")}
              placeholder={t("Enter the correct answer")}
              defaultValue={id ? question?.correct_answer : ""}
            />
            {errors.correct_answer && (
              <p className="text-red-500 text-sm">
                {t(errors.correct_answer?.message!)}
              </p>
            )}
          </label>
          <label className="flex flex-col w-full gap-1">
            {t("Question type")}
            <Select
              {...register("question_type")}
              onValueChange={(val) => setValue("question_type", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple_choice">Multiple choice</SelectItem>
                <SelectItem value="typing">Typing</SelectItem>
              </SelectContent>
            </Select>
            {errors.question_type && (
              <p className="text-red-500 text-sm">
                {t(errors.question_type?.message!)}
              </p>
            )}
          </label>
          <label className="flex flex-col w-full gap-1">
            {t("Choices (Please separate the choices with | )")}
            <Input
              {...register("choices")}
              placeholder={t("Enter the correct answer")}
              defaultValue={id ? question?.choices : ""}
            />
            {errors.choices && (
              <p className="text-red-500 text-sm">
                {t(errors.choices?.message!)}
              </p>
            )}
          </label>
          <label className="flex flex-col w-full gap-1">
            {t("Quiz")}
            <Select
              {...register("quizId")}
              onValueChange={(val) => setValue("quizId", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Question type" />
              </SelectTrigger>
              <SelectContent>
                {quizzes?.map(quiz => (
                  <SelectItem value={String(quiz.id)} key={quiz.id}>{quiz.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.question_type && (
              <p className="text-red-500 text-sm">
                {t(errors.question_type?.message!)}
              </p>
            )}
          </label>
          <Button
            type="submit"
            className="main-btn w-full"
            disabled={isSubmitting}
          >
            {id ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AdminQuestionDialog;
