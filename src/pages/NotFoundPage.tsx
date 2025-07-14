import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="h-full flex items-center w-full justify-center">
      <div className="flex flex-col items-center gap-3">
        <Frown className="w-20 h-20" />
        <h1 className="title">404 NOT FOUND</h1>
        <Link to="/">
          <Button className="main-btn w-full">Back to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
