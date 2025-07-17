import DashboardSection from "@/components/dashboard/DashboardSection";
import useAdminCourseStore from "@/stores/useAdminCourseStore";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import AdminLessonDialog from "@/components/custom/dialogs/AdminLessonDialog";
import { type DataDetail } from "@/types";
import useAdminLessonStore from "@/stores/useAdminLessonStore";
import DeleteLessonDialog from "@/components/custom/dialogs/DeleteLessonDialog";
import { Button } from "@/components/ui/button";
import AdminQuizzesSection from "@/components/custom/AdminQuizzesSection";

function SingleCoursePage() {
  const { courseId } = useParams();
  const { getCourseById } = useAdminCourseStore();
  const { lessons, getLessons } = useAdminLessonStore();
  const [course, setCourse] = useState<DataDetail | null>(null);
  const [lessonId, setLessonId] = useState(null);

  useEffect(() => {
    const run = async () => {
      const res = await getCourseById(+courseId!);
      setCourse(res.data.course);

      await getLessons();
    };

    run();
  }, []);

  const filteredLessons = lessons?.filter(
    (lesson: any) => lesson.courseId === +courseId!
  );

  return (
    <DashboardSection
      title={`Course ID: ${courseId}`}
      description="Manage courses here"
      className="space-y-6"
    >
      <div className="dash-border space-y-4">
        <h1 className="title">{course?.title}</h1>
        <p>{course?.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="title">Lessons</h1>
        <AdminLessonDialog
          trigger={<Button className="main-btn w-fit">Add lesson</Button>}
          courseId={+courseId!}
        />
      </div>
      {filteredLessons?.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-base">Title</TableHead>
              <TableHead className="font-bold text-base max-w-[400px]">
                Description
              </TableHead>
              <TableHead className="font-bold text-base">Quizzes</TableHead>
              <TableHead className="font-bold text-base text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLessons?.map((lesson: any) => (
              <TableRow key={lesson.id}>
                <TableCell>{lesson.title}</TableCell>
                <TableCell className="max-w-[400px] overflow-hidden text-ellipsis">
                  {lesson.description}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <AdminQuizzesSection
                    quizzes={lesson?.quizzes!}
                    lessonId={lesson?.id!}
                  />
                </TableCell>
                <TableCell
                  className="flex items-center justify-center gap-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AdminLessonDialog
                    trigger={
                      <Edit
                        onClick={() => setLessonId(lesson.id)}
                        className="w-5 h-5"
                      />
                    }
                    id={+lessonId!}
                  />
                  <DeleteLessonDialog
                    id={+lessonId!}
                    setId={() => setLessonId(lesson.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No lessons found</p>
      )}
    </DashboardSection>
  );
}

export default SingleCoursePage;
