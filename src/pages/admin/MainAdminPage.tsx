import DashboardSection from "@/components/dashboard/DashboardSection";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import useAdminCourseStore from "@/stores/useAdminCourseStore";
import useReportStore from "@/stores/useReportStore";
import { useEffect } from "react";

function MainAdminPage() {
  const { courses, getCourses } = useAdminCourseStore();
  const { reports, getReports } = useReportStore();

  useEffect(() => {
    const run = async () => {
      await getCourses();
      await getReports();
    };

    run();
  }, []);

  return (
    <DashboardSection
      title="Welcome to ReanGan Admin"
      description="The ReanGan system will be controlled by the admin, so you can manage anything for users."
    >
      <main className="flex flex-col gap-8">
        <div className="space-y-2">
          <h2 className="title-sm">Courses</h2>
          {courses.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-4">
              {courses
                .map((course) => (
                  <Card key={course.id}>
                    <CardHeader>
                      <h2 className="title-sm">ID: {course.id}</h2>
                      <CardDescription>{course.title}</CardDescription>
                    </CardHeader>
                  </Card>
                ))
                .slice(0, 2)}
            </div>
          ) : (
            <p>No courses shown here</p>
          )}
        </div>
        <div className="space-y-2">
          <h2 className="title-sm">Reports</h2>
          {reports.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-4">
              {reports
                .map((report) => (
                  <Card key={report.id}>
                    <CardHeader>
                      <h2 className="title-sm">ID: {report.id}</h2>
                      <CardDescription>{report.issue}</CardDescription>
                    </CardHeader>
                  </Card>
                ))
                .slice(0, 2)}
            </div>
          ) : (
            <p>No reports shown here</p>
          )}
        </div>
      </main>
    </DashboardSection>
  );
}

export default MainAdminPage;
