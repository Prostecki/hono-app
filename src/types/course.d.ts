export interface NewCourse {
  course_id?: string;
  title: string;
  instructor: string;
  credits: number;
  start_date?: string;
  end_date?: string;
  department?: string;
  description?: string;
}

export interface Course extends NewCourse {
  course_id: string;
}
