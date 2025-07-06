import DashboardSection from "@/components/custom/DashboardSection";
import Loading from "@/components/custom/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCourseStore from "@/stores/useCourseStore";
import { ChevronLeftCircle } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function LessonPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const currentCourse = useCourseStore((state) => state.currentCourse);
  const getLessonsFromEnrolledCourse = useCourseStore(
    (state) => state.getLessonsFromEnrolledCourse
  );
  const loading = useCourseStore((state) => state.loading);

  useEffect(() => {
    if (!currentCourse) {
      getLessonsFromEnrolledCourse(Number(courseId));
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!currentCourse) {
    return;
  }

  return (
    <DashboardSection
      title={currentCourse?.title}
      description={currentCourse?.description || ""}
    >
      <div className="flex flex-col gap-4">
        <Link to="/dashboard/explore" className="flex items-center gap-2 w-fit">
          <ChevronLeftCircle />
          Back to Course
        </Link>
        {currentCourse.lessons.map((lesson, index) => {
          const { quizzes } = lesson;
          return (
            <div className="flex items-center gap-4">
              <Card className="w-full max-w-[280px]" key={index}>
                <CardHeader>
                  <p className="text-sm font-medium">Chapter {index + 1}: </p>
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
              </Card>
              <div className="w-full flex flex-1 gap-4 overflow-auto">
                {quizzes.map((quiz) => (
                  <div className="bg-orange-200 p-5 rounded-4xl min-w-[280px] flex flex-col gap-4">
                    <h2 className="text-2xl font-medium">{quiz.title}</h2>
                    <Button
                      className="main-btn w-fit"
                      onClick={() => navigate("/quiz")}
                    >
                      Start
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardSection>
  );
}

export default LessonPage;
