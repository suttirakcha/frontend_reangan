import DashboardSection from "@/components/dashboard/DashboardSection";
import EnrolledCoursesSidebar from "@/components/custom/EnrolledCoursesSidebar";
import Loading from "@/components/custom/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCourseStore from "@/stores/useCourseStore";
import useUserStore from "@/stores/useUserStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ExplorePage() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const loading = useCourseStore((state) => state.loading);
  const courses = useCourseStore((state) => state.courses);
  const getCourses = useCourseStore((state) => state.getCourses);
  const enrollCourse = useCourseStore((state) => state.enrollCourse);
  const getEnrolledCourses = useCourseStore(
    (state) => state.getEnrolledCourses
  );

  const handleEnrollCourse = async (id: number) => {
    try {
      const res = await enrollCourse(id);
      toast.success(res.data.message);
      getCourses();
      getEnrolledCourses();
    } catch (err: any) {
      toast.error(err.response?.data.error || err.message);
    }
  };

  useEffect(() => {
    getCourses();
  }, [courses]);

  if (loading) {
    return <Loading />;
  }

  return (
    <DashboardSection
      title="Explore"
      description="Explore the courses you want to enroll"
      className="grid grid-cols-3 gap-12"
    >
      <div className="col-span-2">
        {courses.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-4">
            {courses.map((course: any) => (
              <Card key={course.id} className="w-full justify-between">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {course.enrolledCourse.every(
                    (cor: any) => cor.userId !== user!.id
                  ) ? (
                    <Button
                      className="main-btn !w-fit"
                      onClick={() => handleEnrollCourse(course.id)}
                    >
                      Enroll
                    </Button>
                  ) : (
                    <Button
                      className="main-btn !w-fit"
                      onClick={() =>
                        navigate(`/dashboard/course/${course.id}/lessons`)
                      }
                    >
                      Go to the course
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No courses found</p>
        )}
      </div>

      <EnrolledCoursesSidebar />
    </DashboardSection>
  );
}

export default ExplorePage;
