import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CourseCardProps } from "@/types";
import { useTranslation } from "react-i18next";

function CourseCard({
  title,
  description,
  checkIfEnrolled,
  onEnroll,
  onAccessCourse,
}: CourseCardProps) {
  const { t } = useTranslation();
  return (
    <Card className="w-full justify-between">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl flex justify-between">
          {title}
          {!checkIfEnrolled && (
            <Badge
              variant="secondary"
              className="bg-orange-200 rounded-full h-6 text-orange-800"
            >
              {t("Enrolled")}
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="main-btn !w-fit" onClick={checkIfEnrolled ? onEnroll : onAccessCourse}>
          {t(checkIfEnrolled ? "Enroll" : "Go to the course")}
        </Button>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
