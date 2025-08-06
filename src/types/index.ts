import type { CourseDetailFields, LessonDetailFields, QuestionDetailFields } from "@/schemas/courseDetailSchema";
import type {
  ForgotPasswordFields,
  ResetPasswordFields,
} from "@/schemas/forgotPasswordSchema";
import type { LoginFields } from "@/schemas/loginSchema";
import type { RegisterFields } from "@/schemas/registerSchema";
import type { UserFields } from "@/schemas/userSchema";
import type { AxiosResponse } from "axios";
import type { ReactNode } from "react";

export interface FormInputProps {
  label: string;
  field: string;
  error: string;
}

export interface DashboardSectionProps {
  title: string;
  description: string;
  className?: string;
}

export interface CourseCardProps {
  title: string;
  description?: string;
  checkIfEnrolled: boolean;
  onEnroll: () => void;
  onAccessCourse: () => void;
}

export type User = {
  id?: number;
  username: string;
  email: string;
  role: string;
};

export type Menu = {
  text: string;
  link: string;
  icon: ReactNode;
};

export type Report = {
  id?: number;
  issue: string;
  detail: string;
  isResolved: boolean;
  quizId: number;
};

export type CurrentCourse = DataDetail & { lessons: Lesson[] };
export type LoginPromise = LoginFields & { message: string; result: User };
export type RegisterPromise = RegisterFields & { message: string };
export type UserPromise = UserFields & { message: string };

export type UserState = {
  user: User | null;
  // accessToken: string | null;
  resetPasswordToken: string | null;
  login: (user: LoginFields) => Promise<AxiosResponse<LoginPromise>>;
  register: (user: RegisterFields) => Promise<AxiosResponse<RegisterPromise>>;
  logout: () => void;
  updateUser: (data: UserFields) => Promise<AxiosResponse<UserPromise>>;
  deleteUser: () => Promise<AxiosResponse>;
  requestForgotPassword: (data: ForgotPasswordFields) => Promise<AxiosResponse>;
  resetPassword: (
    data: ResetPasswordFields,
    token: string
  ) => Promise<AxiosResponse>;
};

export type CourseState = {
  id?: number;
  courses: DataDetail[];
  enrolledCourses: EnrolledCourse[];
  loading: boolean;
  currentCourse: CurrentCourse | null;
  getCourses: () => Promise<void>;
  getEnrolledCourses: () => Promise<void>;
  enrollCourse: (courseId: number) => Promise<AxiosResponse>;
  unenrollCourse: (courseId: number) => Promise<AxiosResponse>;
  getLessonsFromEnrolledCourse: (courseId: number) => Promise<void>;
  clearCourse: () => void;
};

export type AdminCourseState = {
  courses: Course[];
  getCourses: () => Promise<void>;
  getCourseById: (id: number) => Promise<AxiosResponse>;
  createCourse: (data: DataDetail) => Promise<AxiosResponse>;
  updateCourse: (data: DataDetail, courseId: number) => Promise<AxiosResponse>;
  deleteCourse: (courseId: number) => Promise<AxiosResponse>;
};

export type AdminLessonState = {
  lessons: Lesson[];
  getLessons: () => Promise<void>;
  createLesson: (data: LessonDetailFields) => Promise<AxiosResponse>;
  updateLesson: (data: LessonDetailFields, courseId: number) => Promise<AxiosResponse>;
  deleteLesson: (courseId: number) => Promise<AxiosResponse>;
};

export type AdminQuizState = {
  createQuiz: (data: { title: string }) => Promise<AxiosResponse>;
  updateQuiz: (data: { title: string }, id: number) => Promise<AxiosResponse>;
  deleteQuiz: (id: number) => Promise<AxiosResponse>;
  createQuestion: (data: QuestionDetailFields) => Promise<AxiosResponse>;
  updateQuestion: (data: QuestionDetailFields, id: number) => Promise<AxiosResponse>;
  deleteQuestion: (id: number) => Promise<AxiosResponse>;
}

export type QuizState = {
  currentQuiz: Quiz | null;
  incorrectAnsweredQuestions: Question[];
  loading: boolean;
  finishedQuizzes: FinishedQuiz[];
  getFinishedQuizzes: () => Promise<void>;
  getCurrentQuiz: (
    courseId: number,
    lessonId: number,
    quizId: number
  ) => Promise<void>;
  completeQuiz: (courseId: number, lessonId: number, quizId: number) => void;
  clearQuiz: () => void;
};

export type ReportState = {
  reports: Report[];
  getReports: () => Promise<void>;
  getReportById: (reportId: number) => Promise<AxiosResponse>;
  sendReport: (data: Report) => Promise<AxiosResponse>;
};

export type DataDetail = {
  id?: number;
  title: string;
  description?: string;
};

export type Course = DataDetail & { lessons: Lesson[] }
export type Lesson = DataDetail & { quizzes: Quiz[], courseId?: number };

export type QuestionType = "multiple_choice" | "typing";

export type Question = {
  id?: number;
  question: string;
  correct_answer: string;
  choices?: string;
  question_type: QuestionType;
};

export type Quiz = {
  id?: number;
  title: string;
  questions: Question[];
};

export type FinishedQuiz = {
  userId: number;
  courseId: number;
  quizId: number;
  finishedAt: string;
};

export type StatisticsID = {
  id?: number;
  userId?: number;
};

export type Statistics = StatisticsID & {
  exp: number;
  incorrect_answered: number;
  correct_answered: number;
};

export type StatisticsState = {
  statistics: Statistics | null;
  getStatistics: () => Promise<void>;
  createStatistics: () => Promise<void>;
  updateExp: (data: Statistics) => Promise<void>;
};

export type EnrolledCourse = DataDetail & { lessons: Lesson[] };

export type SettingsState = {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  language: string;
  setLanguage: (val: string) => void;
};
