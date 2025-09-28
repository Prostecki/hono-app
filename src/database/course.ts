import { supabase } from "../lib/supabase.js";
import type { NewCourse } from "../types/course.d.ts";

export const getAllCourses = async () => {
  const { data, error } = await supabase.from("courses").select("*");
  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error("Failed to fetch courses from the database.");
  }
  return data;
};

export const getCourseById = async (id: string) => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("course_id", id)
    .single(); // .single() is used to get one object or null

  if (error && error.code !== "PGRST116") {
    // PGRST116 means no rows found, which is not a server error.
    console.error("Supabase error:", error.message);
    throw new Error("Failed to fetch the course from the database.");
  }
  return data;
};

export const createCourse = async (course: NewCourse) => {
  const { data, error } = await supabase
    .from("courses")
    .insert([course])
    .select()
    .single(); // .single() to get the created object back

  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error("Failed to create the course in the database.");
  }
  return data;
};

export const updateCourse = async (
  id: string,
  courseData: Partial<NewCourse>
) => {
  const { data, error } = await supabase
    .from("courses")
    .update(courseData)
    .eq("course_id", id)
    .select()
    .single();
  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error("Failed to update the course in the database.");
  }
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data, error } = await supabase
    .from("courses")
    .delete()
    .eq("course_id", id)
    .select()
    .single();
  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error("Failed to delete the course in the database.");
  }
  return data;
};
