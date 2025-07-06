import { useEffect, useState } from "react";
import { quotes } from "@/lib/quotes";
import DashboardSection from "@/components/custom/DashboardSection";

function MainPage() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  // useEffect(() => {}, []);

  return (
    <DashboardSection
      title="Welcome to ReanGan"
      description="What would you like to learn today"
      className="flex flex-col w-full"
    >
      <div className="border border-orange-500 rounded-md w-full p-6 flex flex-col gap-4">
        <p className="text-xl font-medium text-center">{quote.text}</p>
        <p className="text-gray-500 text-end">{quote.author}</p>
      </div>
    </DashboardSection>
  );
}

export default MainPage;
