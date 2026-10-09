import test from "node:test";
import assert from "node:assert/strict";
import * as data from "../src/app/course-data.ts";
test("official catalogue is available with all seven programmes", () => {
  assert.ok(data, "Official course catalogue must exist");
  assert.equal(data.courses.length, 7);
  assert.ok(data.courses.some((c) => c.title === "Full Stack Web Development"));
  assert.ok(
    data.courses.some((c) => c.title === "Graduate Engineering Training (GET)"),
  );
});
test("search is case insensitive, trims whitespace and intersects category", () => {
  assert.ok(data, "Course filtering must exist");
  assert.deepEqual(
    data.filterCourses("  vLsI ", "Hardware").map((c) => c.title),
    ["VLSI Design"],
  );
  assert.equal(data.filterCourses("VLSI", "Development").length, 0);
  assert.equal(data.filterCourses("", "Career").length, 2);
  assert.equal(
    data.filterCourses("no such programme", "All courses").length,
    0,
  );
});
