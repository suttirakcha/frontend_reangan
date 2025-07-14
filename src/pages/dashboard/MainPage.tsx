import { quotes } from "@/lib/quotes";
import DashboardSection from "@/components/dashboard/DashboardSection";
import EnrolledCoursesSidebar from "@/components/custom/EnrolledCoursesSidebar";
import useCourseStore from "@/stores/useCourseStore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import useQuizStore from "@/stores/useQuizStore";
import useUserStore from "@/stores/useUserStore";
import { useTranslation } from "react-i18next";

function MainPage() {
  const { t } = useTranslation();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const user = useUserStore((state) => state.user);

  const { clearCourse, enrolledCourses, getEnrolledCourses } = useCourseStore();
  const { finishedQuizzes, getFinishedQuizzes } = useQuizStore();

  const findRecentFinishedQuiz = finishedQuizzes.map((quiz) =>
    Date.parse(quiz.finishedAt)
  );

  const recent = finishedQuizzes?.find(
    (quiz) =>
      Date.parse(quiz.finishedAt) === Math.max(...findRecentFinishedQuiz) &&
      quiz.userId === user?.id
  )?.courseId;

  const currentCourseIndex = enrolledCourses?.findIndex(
    (course) => course.id === recent
  );

  const [courseIndex] = useState(
    currentCourseIndex === -1 ? 0 : currentCourseIndex
  );

  useEffect(() => {
    clearCourse();
    getFinishedQuizzes();
    getEnrolledCourses();
  }, []);

  const totalQuizzes = enrolledCourses
    ? enrolledCourses[courseIndex]?.lessons?.reduce(
        (acc: any, curr: any) => acc + curr.quizzes.length,
        0
      )
    : 0;

  const totalFinishedQuizzes = enrolledCourses
    ? finishedQuizzes.filter(
        (quiz: any) =>
          quiz.userId === user?.id &&
          quiz.courseId === enrolledCourses[courseIndex]?.id
      ).length
    : 0;

  const completedQuizPercentage = enrolledCourses
    ? (totalFinishedQuizzes / totalQuizzes) * 100
    : 0;

  return (
    <DashboardSection
      title={t("Welcome to ReanGan")}
      description={t("What would you like to learn today?")}
      className="flex flex-col w-full"
    >
      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="dash-border w-full flex flex-col gap-4">
            <p className="text-xl font-medium text-center">{quote.text}</p>
            <p className="text-gray-500 text-end">{quote.author}</p>
          </div>
          <h2 className="title-sm">{t("Current progress")}</h2>
          <div className="dash-border w-full flex flex-col gap-4">
            {enrolledCourses ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <p className="text-xl font-medium">
                    {enrolledCourses[courseIndex]?.title} (
                    {completedQuizPercentage.toFixed(0)}%)
                  </p>
                  <Link
                    to={`/dashboard/course/${enrolledCourses[courseIndex]?.id}/lessons`}
                    className="text-sm text-orange-500 hover:text-orange-400"
                  >
                    {t("Continue")}
                  </Link>
                </div>
                <Progress
                  value={completedQuizPercentage || 0}
                  className="h-3"
                />
              </div>
            ) : (
              <p>
                {t("Let's explore the courses you might be interested in!")}
              </p>
            )}
          </div>
        </div>
        <EnrolledCoursesSidebar />
      </div>
    </DashboardSection>
  );
}

export default MainPage;
