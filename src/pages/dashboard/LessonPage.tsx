import DashboardSection from "@/components/dashboard/DashboardSection";
import UnenrollDialog from "@/components/custom/dialogs/UnenrollDialog";
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
import { toast } from "sonner";

function LessonPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const currentCourse = useCourseStore((state) => state.currentCourse);
  const getLessonsFromEnrolledCourse = useCourseStore(
    (state) => state.getLessonsFromEnrolledCourse
  );
  const loading = useCourseStore((state) => state.loading);
  const unenrollCourse = useCourseStore((state) => state.unenrollCourse);

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

  const handleUnenroll = async (courseId: number) => {
    try {
      const res = await unenrollCourse(courseId);
      toast.success(res.data.message);
      navigate("/dashboard/explore")
    } catch (err: any) {
      toast.error(err.response?.data.error || err.message);
    }
  }

  return (
    <DashboardSection
      title={currentCourse?.title}
      description={currentCourse?.description || ""}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard/explore"
            className="flex items-center gap-2 w-fit"
          >
            <ChevronLeftCircle />
            Back to Course
          </Link>
          <UnenrollDialog onConfirm={() => handleUnenroll(+courseId!)}/>
        </div>
        {currentCourse.lessons.map((lesson, index) => {
          const { quizzes } = lesson;
          return (
            <div className="flex items-center gap-4" key={lesson.id}>
              <Card className="w-full max-w-[280px]" key={index}>
                <CardHeader>
                  <p className="text-sm font-medium">Chapter {index + 1}: </p>
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
              </Card>
              <div className="w-full flex flex-1 gap-4 overflow-auto">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-orange-200 p-5 rounded-4xl min-w-[280px] flex flex-col gap-4">
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
