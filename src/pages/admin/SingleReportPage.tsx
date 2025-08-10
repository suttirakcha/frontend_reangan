import DashboardSection from "@/components/dashboard/DashboardSection";
import { Button } from "@/components/ui/button";
import useReportStore from "@/stores/useReportStore";
import type { Report } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleReportPage() {
  const { reportId } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const { getReportById, resolveIssues } = useReportStore();

  useEffect(() => {
    const run = async () => {
      const res = await getReportById(+reportId!);
      setReport(res.data.report);
    };

    run();
  }, []);

  return (
    <DashboardSection
      title={`Report ID: ${report?.id}`}
      description="View report from the user"
    >
      <div className="dash-border space-y-4">
        <h1 className="title">{report?.issue}</h1>
        <p>{report?.detail}</p>
      </div>

      <div className="flex items-center justify-between mt-6 w-full">
        <h2>Was this issue resolved?</h2>
        <Button
          className="main-btn"
          onClick={() => resolveIssues(+reportId!, !report?.isResolved)}
          disabled={report?.isResolved}
        >
          {report?.isResolved ? "Issue was resolved" : "Yes"}
        </Button>
      </div>
    </DashboardSection>
  );
}

export default SingleReportPage;
