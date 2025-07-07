import type { LoginFields } from "@/schemas/loginSchema";
import type { RegisterFields } from "@/schemas/registerSchema";
import type { UserFields } from "@/schemas/userSchema";
import type { AxiosResponse } from "axios";

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

export type User = {
  id?: number;
  username: string;
  email: string;
}

export type CurrentCourse = DataDetail & { lessons: Lesson[] }
export type LoginPromise = LoginFields & { message: string };
export type RegisterPromise = RegisterFields & { message: string };
export type UserPromise = UserFields & { message: string };

export type UserState = {
  user: User | null;
  accessToken: string | null;
  login: (user: LoginFields) => Promise<AxiosResponse<LoginPromise>>;
  register: (user: RegisterFields) => Promise<AxiosResponse<RegisterPromise>>;
  logout: () => void;
  updateUser: (data: UserFields) => Promise<AxiosResponse<UserPromise>>;
}

export type CourseState = {
  id?: number;
  courses: DataDetail[];
  enrolledCourses: DataDetail[];
  loading: boolean;
  currentCourse: CurrentCourse | null;
  getCourses: () => Promise<void>;
  getEnrolledCourses: () => Promise<void>;
  enrollCourse: (courseId: number) => Promise<AxiosResponse>;
  unenrollCourse: (courseId: number) => Promise<AxiosResponse>;
  getLessonsFromEnrolledCourse: (courseId: number) => Promise<void>;
}

export type DataDetail = {
  id?: number;
  title: string;
  description?: string
}

export type Question = {
  id?: number;
  question: string;
  correct_answer: string;
}

export type Quiz = {
  id?: number;
  title: string;
  questions: Question[]
}

export type Lesson = DataDetail & { quizzes: Quiz[] }