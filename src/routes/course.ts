import { Hono } from "hono";
import courseValidator from "../validators/courseValidator.js";
import type { NewCourse, Course } from "../types/course.d.ts";
import * as db from "../database/course.js";

const courseApp = new Hono();

// GET all courses
courseApp.get("/", async (c) => {
  const courses = await db.getAllCourses();
  return c.json(courses);
});

// GET course by ID
courseApp.get("/:id", async (c) => {
  const { id } = c.req.param();
  const course = await db.getCourseById(id);
  if (!course) {
    const error: any = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }
  return c.json(course);
});

// POST a new course
courseApp.post("/", courseValidator, async (c) => {
  const newCourse: NewCourse = c.req.valid("json");
  const createdCourse = await db.createCourse(newCourse);
  return c.json(createdCourse, 201);
});

// PUT an existing course
courseApp.put("/:id", courseValidator, async (c) => {
  const { id } = c.req.param();
  const updateData: Partial<NewCourse> = c.req.valid("json");
  const updatedCourse = await db.updateCourse(id, updateData);
  if (!updatedCourse) {
    const error: any = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }
  return c.json(updatedCourse, 200);
});

// DELETE a course
courseApp.delete("/:id", async (c) => {
  const { id } = c.req.param();
  const deletedCourse = await db.deleteCourse(id);
  if (!deletedCourse) {
    const error: any = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }
  return c.json(
    { message: "Course deleted successfully", course: deletedCourse },
    200
  );
});

export default courseApp;
