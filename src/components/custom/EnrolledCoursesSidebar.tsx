import type { DataDetail } from "@/types";

interface EnrolledCoursesSidebarProps {
  enrolledCourses: DataDetail[];
}

function EnrolledCoursesSidebar({
  enrolledCourses,
}: EnrolledCoursesSidebarProps) {
  return (
    <div className="col-span-1">
      <h1 className="title">Enrolled courses</h1>
      {enrolledCourses.length > 0 ? (
        <ul>
          {enrolledCourses.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      ) : (
        <p>You have not enrolled any courses yet</p>
      )}
    </div>
  );
}

export default EnrolledCoursesSidebar;
