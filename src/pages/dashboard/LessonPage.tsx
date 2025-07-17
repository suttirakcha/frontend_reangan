import DashboardSection from "@/components/dashboard/DashboardSection";
import UnenrollDialog from "@/components/custom/dialogs/UnenrollDialog";
import Loading from "@/components/custom/Loading";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCourseStore from "@/stores/useCourseStore";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "@/components/custom/BackBtn";
import useQuizStore from "@/stores/useQuizStore";
import useUserStore from "@/stores/useUserStore";
import QuizCard from "@/components/dashboard/QuizCard";
import { useTranslation } from "react-i18next";

function LessonPage() {
  const { t } = useTranslation();
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { currentCourse, getLessonsFromEnrolledCourse, loading } =
    useCourseStore();

  const user = useUserStore((state) => state.user);

  const { getCurrentQuiz, finishedQuizzes, getFinishedQuizzes } =
    useQuizStore();

  useEffect(() => {
    if (!currentCourse) {
      getLessonsFromEnrolledCourse(Number(courseId));
    }

    const fetchQuizzes = async () => {
      await getFinishedQuizzes();
    };

    fetchQuizzes();
  }, [currentCourse, finishedQuizzes]);

  if (loading) {
    return <Loading />;
  }

  if (!currentCourse) {
    return;
  }

  const handleStartQuiz = async (
    courseId: number,
    lessonId: number,
    quizId: number
  ) => {
    await getCurrentQuiz(courseId, lessonId, quizId);
    if (getCurrentQuiz!)
      navigate(`/course/${courseId}/lesson/${lessonId}/quiz/${quizId}`);
  };

  return (
    <DashboardSection
      title={currentCourse?.title}
      description={currentCourse?.description || ""}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <BackBtn text={t("Back to Courses")} link="/dashboard/explore" />
          <UnenrollDialog courseId={+courseId!} />
        </div>
        {currentCourse.lessons.map((lesson, index) => {
          const { quizzes } = lesson;
          return (
            <div className="flex items-center gap-4" key={lesson.id}>
              <Card className="w-full max-w-[280px]" key={index}>
                <CardHeader>
                  <p className="text-sm font-medium">{t("Chapter", {index: index + 1})}: </p>
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
              </Card>
              <div className="w-full flex flex-1 gap-4 overflow-auto">
                {quizzes.map((quiz) => {
                  const finishedIndex = finishedQuizzes.findIndex(
                    (q: any) =>
                      q.userId === user?.id &&
                      q.courseId === +courseId! &&
                      q.quizId === +quiz.id!
                  );
                  return (
                    <QuizCard
                      key={quiz.id}
                      title={quiz.title}
                      index={finishedIndex}
                      onStartQuiz={() =>
                        handleStartQuiz(+courseId!, +lesson.id!, +quiz.id!)
                      }
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardSection>
  );
}

export default LessonPage;
