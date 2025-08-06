import DashboardSection from "@/components/dashboard/DashboardSection";
import useAdminCourseStore from "@/stores/useAdminCourseStore";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminLessonDialog from "@/components/custom/dialogs/AdminLessonDialog";
import { type DataDetail, type Quiz } from "@/types";
import useAdminLessonStore from "@/stores/useAdminLessonStore";
import DeleteLessonDialog from "@/components/custom/dialogs/DeleteLessonDialog";
import { Button } from "@/components/ui/button";
import AdminQuizzesDialog from "@/components/custom/dialogs/AdminQuizzesDialog";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdminQuestionDialog from "@/components/custom/dialogs/AdminQuestionDialog";

function SingleCoursePage() {
  const { courseId } = useParams();
  const { getCourseById } = useAdminCourseStore();
  const { lessons, getLessons } = useAdminLessonStore();
  const [quizId, setQuizId] = useState<number | null>(null);
  const [course, setCourse] = useState<DataDetail | null>(null);
  const [lessonId, setLessonId] = useState(null);

  useEffect(() => {
    const run = async () => {
      const res = await getCourseById(+courseId!);
      setCourse(res.data.course);

      await getLessons();
    };

    run();
  }, []);

  const filteredLessons = lessons?.filter(
    (lesson: any) => lesson.courseId === +courseId!
  );

  const allQuizzes = filteredLessons?.reduce<Quiz[]>(
    (acc, curr) => [...acc, ...curr.quizzes],
    []
  ) ?? [];

  return (
    <DashboardSection
      title={`Course ID: ${courseId}`}
      description="Manage courses here"
      className="space-y-6"
    >
      <div className="dash-border space-y-4">
        <h1 className="title">{course?.title}</h1>
        <p>{course?.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="title">Lessons</h1>
        <AdminLessonDialog
          trigger={<Button className="main-btn w-fit">Add lesson</Button>}
          courseId={+courseId!}
        />
      </div>
      {filteredLessons?.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-base">Title</TableHead>
              <TableHead className="font-bold text-base max-w-[400px]">
                Description
              </TableHead>
              <TableHead className="font-bold text-base">Quizzes</TableHead>
              <TableHead className="font-bold text-base text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLessons?.map((lesson: any) => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.title}</TableCell>
                <TableCell className="max-w-[400px] overflow-hidden text-ellipsis">
                  {lesson.description}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <AdminQuizzesDialog
                    quizzes={lesson?.quizzes!}
                    lessonId={lesson?.id!}
                  />
                </TableCell>
                <TableCell
                  className="flex items-center justify-center gap-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AdminLessonDialog
                    trigger={
                      <Edit
                        onClick={() => setLessonId(lesson.id)}
                        className="w-5 h-5"
                      />
                    }
                    id={+lessonId!}
                  />
                  <DeleteLessonDialog
                    id={+lessonId!}
                    setId={() => setLessonId(lesson.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No lessons found</p>
      )}

      <div className="flex items-center justify-between">
        <h1 className="title">Questions</h1>
        <AdminQuestionDialog
          trigger={<Button className="main-btn w-fit">Add question</Button>}
          quizzes={allQuizzes}
        />
      </div>

      {filteredLessons?.map((lesson) => {
        const totalQuizzes = lesson?.quizzes;
        return (
          <>
            {totalQuizzes?.map((quiz) => (
              <div className="space-y-4" key={quiz.id}>
                <h2 className="title-sm">{quiz.title}</h2>
                <div className="grid grid-cols-3 gap-4">
                  {quiz?.questions?.map((question) => (
                    <Card key={question.id}>
                      <CardHeader>
                        <CardTitle>{question.question}</CardTitle>
                        <CardDescription>
                          <p>Answer: {question.correct_answer}</p>
                          <p>Type: {question.question_type}</p>
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <AdminQuestionDialog
                          trigger={<Edit />}
                          question={question}
                          quizzes={allQuizzes}
                          id={+question.id!}
                        />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </>
        );
      })}
    </DashboardSection>
  );
}

export default SingleCoursePage;
