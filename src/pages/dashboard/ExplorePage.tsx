import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DashboardSection from "@/components/dashboard/DashboardSection";
import EnrolledCoursesSidebar from "@/components/custom/EnrolledCoursesSidebar";
import Loading from "@/components/custom/Loading";
import useCourseStore from "@/stores/useCourseStore";
import useUserStore from "@/stores/useUserStore";
import CourseCard from "@/components/dashboard/CourseCard";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

function ExplorePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const [searchResult, setSearchResult] = useState("");

  const { loading, courses, getCourses, enrollCourse, getEnrolledCourses } =
    useCourseStore();

  const handleEnrollCourse = async (id: number) => {
    try {
      const res = await enrollCourse(id);
      toast.success(t(res.data.message));
      getCourses();
      getEnrolledCourses();
    } catch (err: any) {
      toast.error(t(err.response?.data.message || err.message));
    }
  };

  useEffect(() => {
    getCourses();
  }, [courses]);

  if (loading) {
    return <Loading />;
  }

  const filteredCourses = searchResult
    ? courses?.filter((course) =>
        course.title.toLowerCase().includes(searchResult.toLowerCase())
      )
    : courses;

  return (
    <DashboardSection
      title={t("Explore")}
      description={t("Explore the courses you want to enroll")}
      className="grid xl:grid-cols-3 gap-12"
    >
      <div className="xl:col-span-2 max-xl:order-1">
        {filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredCourses.map((course: any) => {
              const checkIfEnrolled = course.enrolledCourse.every(
                (cor: any) => cor.userId !== user!.id
              );
              return (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  checkIfEnrolled={checkIfEnrolled}
                  onEnroll={() => handleEnrollCourse(course.id)}
                  onAccessCourse={() =>
                    navigate(`/dashboard/course/${course.id}/lessons`)
                  }
                />
              );
            })}
          </div>
        ) : (
          <p>{t("No courses found")}</p>
        )}
      </div>
      <div className="space-y-4">
        <Input
          placeholder={t("Search courses")}
          onChange={(e) => setSearchResult(e.target.value)}
        />
        <EnrolledCoursesSidebar />
      </div>
    </DashboardSection>
  );
}

export default ExplorePage;
