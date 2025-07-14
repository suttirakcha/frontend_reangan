import useCourseStore from "@/stores/useCourseStore";
import { ChevronRightCircle } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function EnrolledCoursesSidebar() {
  const { t } = useTranslation();
  const enrolledCourses = useCourseStore((state) => state.enrolledCourses);
  const getEnrolledCourses = useCourseStore(
    (state) => state.getEnrolledCourses
  );

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="col-span-1 space-y-2">
      <h1 className="title">{t("Enrolled courses")}</h1>
      {enrolledCourses && enrolledCourses.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {enrolledCourses.map((course) => (
            <li key={course.id}>
              <Link to={`/dashboard/course/${course.id}/lessons`} className="group flex w-full items-center justify-between hover:text-orange-500 duration-200">
                {course.title}
                <ChevronRightCircle className="text-orange-500 -z-1 w-5 h-5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-0 duration-200" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>{t("You have not enrolled any courses yet")}</p>
      )}
    </div>
  );
}

export default EnrolledCoursesSidebar;
