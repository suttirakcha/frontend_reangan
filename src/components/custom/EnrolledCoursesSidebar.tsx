import useCourseStore from "@/stores/useCourseStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function EnrolledCoursesSidebar() {
  const enrolledCourses = useCourseStore((state) => state.enrolledCourses);
  const getEnrolledCourses = useCourseStore(
    (state) => state.getEnrolledCourses
  );

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="col-span-1 space-y-2">
      <h1 className="title">Enrolled courses</h1>
      {enrolledCourses && enrolledCourses.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {enrolledCourses.map((course) => (
            <li key={course.id} className="flex items-center justify-between">
              <Link to={`/dashboard/course/${course.id}/lessons`}>
                {course.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not enrolled any courses yet</p>
      )}
    </div>
  );
}

export default EnrolledCoursesSidebar;
