import DashboardSection from "@/components/dashboard/DashboardSection";
import useReportStore from "@/stores/useReportStore";
import { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { CircleCheck, XCircle } from "lucide-react";

function ReportsPage() {
  const navigate = useNavigate();
  const { reports, getReports } = useReportStore();

  useEffect(() => {
    const run = async () => {
      await getReports();
    };

    run();
  }, []);

  return (
    <DashboardSection
      title="Reports"
      description="Here are reports that users have created to allow admins and/or developers to resolve issues"
    >
      {reports.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-base">Report ID</TableHead>
              <TableHead className="font-bold text-base">Issues</TableHead>
              <TableHead className="font-bold text-base text-center">
                Resolved
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report: any) => (
              <TableRow
                key={report.id}
                className="cursor-pointer"
                onClick={() => navigate(`/admin/reports/${report.id}`)}
              >
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.issue}</TableCell>
                <TableCell className="flex justify-center">
                  {report.isResolved ? (
                    <CircleCheck className="text-green-600" />
                  ) : (
                    <XCircle className="text-red-600" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No reports found</p>
      )}
    </DashboardSection>
  );
}

export default ReportsPage;
