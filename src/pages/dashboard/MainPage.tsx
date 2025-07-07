import { quotes } from "@/lib/quotes";
import DashboardSection from "@/components/dashboard/DashboardSection";
import EnrolledCoursesSidebar from "@/components/custom/EnrolledCoursesSidebar";

function MainPage() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <DashboardSection
      title="Welcome to ReanGan"
      description="What would you like to learn today?"
      className="flex flex-col w-full"
    >
      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2">
          <div className="border border-orange-500 rounded-md w-full p-6 flex flex-col gap-4">
            <p className="text-xl font-medium text-center">{quote.text}</p>
            <p className="text-gray-500 text-end">{quote.author}</p>
          </div>
        </div>
        <EnrolledCoursesSidebar />
      </div>
    </DashboardSection>
  );
}

export default MainPage;
