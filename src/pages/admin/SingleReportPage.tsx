import DashboardSection from "@/components/dashboard/DashboardSection";
import useReportStore from "@/stores/useReportStore";
import type { Report } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function SingleReportPage() {
  const { reportId } = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const { getReportById } = useReportStore();

  useEffect(() => {
    const run = async () => {
      const res = await getReportById(+reportId!);
      setReport(res.data.report);
    }

    run();
  }, [])

  return (
    <DashboardSection title={`Report ID: ${report?.id}`} description="View report from the user">
      <div className="dash-border space-y-4">
        <h1 className="title">{report?.issue}</h1>
        <p>{report?.detail}</p>
      </div>
    </DashboardSection>
  )
}

export default SingleReportPage