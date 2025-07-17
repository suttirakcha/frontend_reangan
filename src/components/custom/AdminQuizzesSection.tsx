import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Quiz } from "@/types";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Check, Edit, Trash2 } from "lucide-react";
import useAdminQuizStore from "@/stores/useAdminQuizStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizzesSchema } from "@/schemas/courseDetailSchema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAdminLessonStore from "@/stores/useAdminLessonStore";

interface AdminQuizzesSectionProps {
  lessonId: number;
  quizzes: Quiz[];
}

function AdminQuizzesSection({ lessonId, quizzes }: AdminQuizzesSectionProps) {
  const { t } = useTranslation();
  const [quizId, setQuizId] = useState(null);
  const { createQuiz, updateQuiz, deleteQuiz } = useAdminQuizStore();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(quizzesSchema),
  });

  const { getLessons } = useAdminLessonStore();

  const onSubmit = async (data) => {
    try {
      const res = await (quizId
        ? updateQuiz(data, quizId)
        : createQuiz({
            title: data.title,
            lessonId,
          }));
      toast.success(res.data.message);
      await getLessons();
      setQuizId(null);
    } catch (err: any) {
      toast.error(err.response?.data.message || err.message);
    }
  };

  const handleDelete = async (id: number) => {
    deleteQuiz(id);
    await getLessons();
  }

  const QuizForm = ({ id, defaultValue }: { id?: number, defaultValue?: string }) => {
    return (
      <form className="flex gap-2 w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("title")}
          placeholder={t(id ? "Update quiz" : "Add quiz")}
          defaultValue={defaultValue || ""}
        />
        <Button type="submit" className="main-btn w-fit">
          <Check />
        </Button>
      </form>
    );
  };

  return (
    <Dialog>
      <DialogTrigger>View Quizzes</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage quizzes</DialogTitle>
        </DialogHeader>

        <QuizForm />

        {quizzes?.length > 0 ? (
          <>
            {quizzes?.map((quiz) => (
              <div className="flex items-start justify-between w-full gap-4">
                {quizId !== quiz.id ? (
                  <Accordion type="single" collapsible key={quiz.id} className="w-full">
                    <AccordionItem value={quiz.title}>
                      <AccordionTrigger className="p-0">
                        {quiz.title} ({quiz.questions?.length || 0} question
                        {quiz.questions?.length === 1 ? "" : "s"})
                      </AccordionTrigger>
                      <AccordionContent>
                        {quiz.questions?.map((question) => (
                          <div className="border-b pb-4">
                            <h2 className="title-sm">{question.question}</h2>
                            <p className="text-lg">
                              Answer: {question.correct_answer}
                            </p>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <QuizForm defaultValue={quiz.title} id={quiz.id}/>
                )}
                <div className="flex items-center gap-2">
                  <Edit onClick={() => setQuizId(quizId ? null : +quiz.id!)} className="h-5 w-5" />
                  <Trash2 onClick={() => handleDelete(+quiz.id!)} className="h-5 w-5" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>No quizzes shown here</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AdminQuizzesSection;
