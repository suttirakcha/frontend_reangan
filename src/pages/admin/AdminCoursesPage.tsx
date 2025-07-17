import DashboardSection from "@/components/dashboard/DashboardSection";
import { useEffect, useState } from "react";
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
import useAdminCourseStore from "@/stores/useAdminCourseStore";
import { Button } from "@/components/ui/button";
import AdminCourseDialog from "@/components/custom/dialogs/AdminCourseDialog";
import { Edit } from "lucide-react";
import DeleteCourseDialog from "@/components/custom/dialogs/DeleteCourseDialog";
import { useNavigate } from "react-router-dom";

function AdminCoursesPage() {
  const navigate = useNavigate();
  const { courses, getCourses } = useAdminCourseStore();
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    const run = async () => {
      await getCourses();
    };

    run();
  }, []);

  return (
    <DashboardSection
      title="Courses"
      description="Manage courses here"
      className="space-y-6"
    >
      <AdminCourseDialog
        trigger={<Button className="main-btn w-fit">Add course</Button>}
      />
      {courses.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-base">Title</TableHead>
              <TableHead className="font-bold text-base max-w-[400px]">
                Description
              </TableHead>
              <TableHead className="font-bold text-base text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course: any) => (
              <TableRow
                key={course.id}
                className="cursor-pointer"
                onClick={() => navigate(`/admin/courses/${course.id}`)}
              >
                <TableCell>{course.title}</TableCell>
                <TableCell className="max-w-[400px] overflow-hidden text-ellipsis">
                  {course.description}
                </TableCell>
                <TableCell className="flex items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
                  <AdminCourseDialog
                    trigger={<Edit onClick={() => setCourseId(course.id)} className="w-5 h-5"/>}
                    id={courseId!}
                  />
                  <DeleteCourseDialog
                    id={courseId!}
                    setId={() => setCourseId(course.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No courses found</p>
      )}
    </DashboardSection>
  );
}

export default AdminCoursesPage;
