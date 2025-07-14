import useStatStore from "@/stores/useStatStore";
import { useEffect } from "react";

const StatCard = () => {
  const statistics = useStatStore((state) => state.statistics);
  const getStatistics = useStatStore((state) => state.getStatistics);

  useEffect(() => {
    const fetchStat = async () => {
      await getStatistics();
    };

    fetchStat();
  }, []);

  return (
    <div className="dash-border">
      <div className="flex items-center justify-between">
        <h2 className="title-sm">Total EXP:</h2>
        <p className="title-sm">{statistics?.exp || 0}</p>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="title-sm">Incorrect answered:</h2>
        <p className="title-sm">{statistics?.incorrect_answered || 0}</p>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="title-sm">Correct answered:</h2>
        <p className="title-sm">{statistics?.correct_answered || 0}</p>
      </div>
    </div>
  );
};

export default StatCard;
