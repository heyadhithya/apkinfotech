"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import type {
  DemoPanelProps,
  DemoCourse,
  DemoModule,
  DemoLesson,
  DemoUser,
} from "../../lib/demo/types";
import "./academics.css";

const archiveImages = [
  "workshop-presentation",
  "technical-session",
  "project-review",
  "workshop-group",
  "workshop-conversation",
  "summer-internship",
  "learners",
  "internship-classroom",
  "docker-workshop",
  "college-engagement",
  "classroom",
  "classroom-teaching",
  "classroom-discussion",
];

function values(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  return Object.fromEntries(new FormData(event.currentTarget).entries());
}
function Field({
  label,
  name,
  value = "",
  multiline = false,
  required = true,
  type = "text",
}: {
  label: string;
  name: string;
  value?: string | number;
  multiline?: boolean;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="demo-field">
      {label}
      {multiline ? (
        <textarea
          className="demo-input"
          name={name}
          defaultValue={value}
          required={required}
          rows={4}
        />
      ) : (
        <input
          className="demo-input"
          name={name}
          type={type}
          defaultValue={value}
          required={required}
          min={type === "number" ? 1 : undefined}
          step={type === "number" ? 1 : undefined}
        />
      )}
    </label>
  );
}
function Tabs({
  items,
  active,
  onChange,
}: {
  items: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <nav className="demo-tabs" aria-label="Workspace sections">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          aria-current={active === item ? "page" : undefined}
          className={active === item ? "active" : ""}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}
function Empty({ children }: { children: React.ReactNode }) {
  return <p className="demo-empty">{children}</p>;
}

export function StudentWorkspace({ state, user, dispatch }: DemoPanelProps) {
  const [tab, setTab] = useState("Dashboard");
  const [courseId, setCourseId] = useState("");
  const enrolledIds = state.enrollments
    .filter((e) => e.userId === user.id)
    .map((e) => e.courseId);
  const enrolled = state.courses.filter((c) => enrolledIds.includes(c.id));
  const lessonIds = state.lessons
    .filter((l) =>
      state.modules.some(
        (m) => m.id === l.moduleId && enrolledIds.includes(m.courseId),
      ),
    )
    .map((l) => l.id);
  const completed = state.completions.filter(
    (c) => c.userId === user.id && lessonIds.includes(c.lessonId),
  );
  const applications = state.applications.filter(
    (a) => a.studentId === user.id,
  );
  const selected = enrolled.find((c) => c.id === courseId) ?? enrolled[0];
  return (
    <section className="demo-panel academics-panel">
      <div className="demo-heading">
        <div>
          <h1>
            Your next chapter, {user.name.replace(/^Demo /, "").split(" ")[0]}.
          </h1>
          <p className="demo-muted">
            Learn with purpose. Keep your career preparation moving.
          </p>
        </div>
      </div>
      <Tabs
        items={["Dashboard", "Internships", "Learning", "Profile"]}
        active={tab}
        onChange={setTab}
      />
      {tab === "Dashboard" && (
        <>
          <div className="academic-overview">
            <div>
              <h2>A little progress, every day.</h2>
              <p>
                You have completed {completed.length} of {lessonIds.length}{" "}
                lessons across {enrolled.length} enrolled demo courses.
              </p>
              <button
                className="demo-button"
                onClick={() => setTab("Learning")}
              >
                Continue learning
              </button>
            </div>
            <figure>
              <Image
                src="/images/workshop-presentation.webp"
                alt="A presenter at a past APK workshop"
                width={720}
                height={480}
              />
              <figcaption>Past APK activity</figcaption>
            </figure>
          </div>
          <div className="academic-ledger">
            <div>
              <strong>{enrolled.length}</strong>
              <span>Enrolled courses</span>
            </div>
            <div>
              <strong>{completed.length}</strong>
              <span>Lessons completed</span>
            </div>
            <div>
              <strong>
                {applications.filter((a) => a.status !== "withdrawn").length}
              </strong>
              <span>Active applications</span>
            </div>
          </div>
          <h2>Explore the course library</h2>
          <div className="academic-course-list">
            {state.courses
              .filter((c) => c.published)
              .map((course) => (
                <article
                  className="academic-course academic-library-course"
                  key={course.id}
                >
                  <figure>
                    <Image
                      src={course.image}
                      alt="An archived APK learning activity"
                      width={240}
                      height={160}
                    />
                    <figcaption>Past APK activity</figcaption>
                  </figure>
                  <div>
                    <span className="demo-badge">{course.category}</span>
                    <h3>{course.title}</h3>
                    <p className="demo-muted">{course.description}</p>
                  </div>
                  <button
                    className="demo-button secondary"
                    onClick={() => {
                      if (enrolledIds.includes(course.id)) {
                        setCourseId(course.id);
                        setTab("Learning");
                      } else if (
                        dispatch({
                          type: "enroll",
                          payload: { courseId: course.id },
                        })
                      ) {
                        setCourseId(course.id);
                        setTab("Learning");
                      }
                    }}
                  >
                    {enrolledIds.includes(course.id)
                      ? "Open course"
                      : "Enroll in demo course"}
                  </button>
                </article>
              ))}
          </div>
          {!state.courses.some((c) => c.published) && (
            <Empty>No published courses yet.</Empty>
          )}
        </>
      )}
      {tab === "Internships" && (
        <>
          <h2>Explore demo opportunities</h2>
          <p className="demo-muted">
            These synthetic opportunities let you try the application workflow.
          </p>
          <div className="academic-course-list">
            {state.opportunities
              .filter((o) => o.open)
              .map((opportunity) => {
                const application = applications.find(
                  (a) => a.opportunityId === opportunity.id,
                );
                return (
                  <article
                    className="academic-opportunity"
                    key={opportunity.id}
                  >
                    <div>
                      <h3>{opportunity.title}</h3>
                      <p>
                        {opportunity.company} · {opportunity.location} ·{" "}
                        {opportunity.mode}
                      </p>
                      <p className="demo-muted">{opportunity.description}</p>
                    </div>
                    {application ? (
                      <p className="demo-badge">{application.status}</p>
                    ) : (
                      <form
                        className="demo-form"
                        onSubmit={(event) => {
                          const data = values(event);
                          if (
                            dispatch({
                              type: "apply",
                              payload: {
                                opportunityId: opportunity.id,
                                motivation: data.motivation,
                              },
                            })
                          )
                            event.currentTarget.reset();
                        }}
                      >
                        <Field
                          label="Why are you interested?"
                          name="motivation"
                          multiline
                        />
                        <button className="demo-button">
                          Apply to demo opportunity
                        </button>
                      </form>
                    )}
                  </article>
                );
              })}
          </div>
          {!state.opportunities.some((o) => o.open) && (
            <Empty>No open opportunities yet.</Empty>
          )}
          <h2>Your applications</h2>
          {applications.length ? (
            applications.map((application) => {
              const opportunity = state.opportunities.find(
                (o) => o.id === application.opportunityId,
              );
              return (
                <article className="academic-course" key={application.id}>
                  <div>
                    <h3>{opportunity?.title ?? "Opportunity"}</h3>
                    <p>
                      <span className="demo-badge">{application.status}</span>
                    </p>
                    <p>{application.motivation}</p>
                    {application.interviewAt && (
                      <p>
                        Interview:{" "}
                        {new Date(application.interviewAt).toLocaleString()}
                      </p>
                    )}
                    {application.notes && (
                      <p className="demo-muted">
                        Placement notes: {application.notes}
                      </p>
                    )}
                  </div>
                  {["applied", "screening"].includes(application.status) && (
                    <button
                      className="demo-button secondary"
                      onClick={() =>
                        dispatch({
                          type: "application.withdraw",
                          payload: { id: application.id },
                        })
                      }
                    >
                      Withdraw application
                    </button>
                  )}
                </article>
              );
            })
          ) : (
            <Empty>Your applications will appear here after you apply.</Empty>
          )}
        </>
      )}
      {tab === "Learning" && (
        <>
          <h2>Your learning desk</h2>
          {!selected ? (
            <Empty>Enroll in a course from your dashboard to begin.</Empty>
          ) : (
            <>
              <label className="demo-field">
                Enrolled course
                <select
                  className="demo-input"
                  value={selected.id}
                  onChange={(event) => setCourseId(event.target.value)}
                >
                  {enrolled.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                      {!course.published ? " (unavailable)" : ""}
                    </option>
                  ))}
                </select>
              </label>
              <p className="demo-muted">{selected.description}</p>
              {!selected.published && (
                <Empty>
                  This course is currently unavailable. Your enrollment and
                  progress are saved. Choose another published course to
                  continue learning.
                </Empty>
              )}
              {state.modules
                .filter((m) => selected.published && m.courseId === selected.id)
                .sort((a, b) => a.position - b.position)
                .map((module) => (
                  <section className="academic-module" key={module.id}>
                    <h3>
                      {module.position}. {module.title}
                    </h3>
                    {state.lessons
                      .filter((l) => l.moduleId === module.id)
                      .sort((a, b) => a.position - b.position)
                      .map((lesson) => {
                        const done = completed.some(
                          (c) => c.lessonId === lesson.id,
                        );
                        const submission = state.submissions.find(
                          (s) =>
                            s.userId === user.id && s.lessonId === lesson.id,
                        );
                        return (
                          <details className="academic-lesson" key={lesson.id}>
                            <summary>
                              {lesson.position}. {lesson.title}
                              <span>{done ? "Completed" : "To do"}</span>
                            </summary>
                            <div className="academic-lesson-body">
                              <p className="academic-text">{lesson.content}</p>
                              <button
                                className="demo-button secondary"
                                disabled={done}
                                onClick={() =>
                                  dispatch({
                                    type: "complete",
                                    payload: { lessonId: lesson.id },
                                  })
                                }
                              >
                                {done
                                  ? "Lesson completed"
                                  : "Mark lesson complete"}
                              </button>
                              {lesson.assignment && (
                                <>
                                  <h4>Assignment</h4>
                                  <p className="academic-text">
                                    {lesson.assignment}
                                  </p>
                                  <form
                                    className="demo-form"
                                    onSubmit={(event) => {
                                      const data = values(event);
                                      dispatch({
                                        type: "submit",
                                        payload: {
                                          lessonId: lesson.id,
                                          content: data.content,
                                        },
                                      });
                                    }}
                                  >
                                    <Field
                                      label="Your response"
                                      name="content"
                                      value={submission?.content ?? ""}
                                      multiline
                                    />
                                    <button className="demo-button">
                                      {submission
                                        ? "Update response"
                                        : "Submit response"}
                                    </button>
                                  </form>
                                  {submission && (
                                    <div className="academic-feedback">
                                      <strong>
                                        {submission.status === "reviewed"
                                          ? "Academic feedback"
                                          : "Awaiting review"}
                                      </strong>
                                      <p>
                                        {submission.feedback ||
                                          "Your response is saved in this demo."}
                                      </p>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </details>
                        );
                      })}
                    {!state.lessons.some((l) => l.moduleId === module.id) && (
                      <Empty>Lessons are being prepared.</Empty>
                    )}
                  </section>
                ))}
              {selected.published &&
                !state.modules.some((m) => m.courseId === selected.id) && (
                  <Empty>No modules have been added yet.</Empty>
                )}
            </>
          )}
        </>
      )}
      {tab === "Profile" && (
        <>
          <h2>Your profile</h2>
          <p className="demo-muted">
            {user.name} · {user.email}
          </p>
          <form
            className="demo-form academic-editor"
            key={user.id}
            onSubmit={(event) => {
              const data = values(event);
              dispatch({
                type: "profile.save",
                payload: { college: data.college, bio: data.bio },
              });
            }}
          >
            <Field
              label="College"
              name="college"
              value={user.college}
              required={false}
            />
            <Field
              label="About you"
              name="bio"
              value={user.bio}
              multiline
              required={false}
            />
            <button className="demo-button">Save profile</button>
          </form>
        </>
      )}
    </section>
  );
}

export function AcademicWorkspace({ state, dispatch }: DemoPanelProps) {
  const [tab, setTab] = useState("Courses");
  const [editing, setEditing] = useState<DemoCourse | null>(null);
  const [moduleEditing, setModuleEditing] = useState<DemoModule | null>(null);
  const [lessonEditing, setLessonEditing] = useState<DemoLesson | null>(null);
  const [studentEditing, setStudentEditing] = useState<DemoUser | null>(null);
  const [courseId, setCourseId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const selectedCourse =
    state.courses.find((c) => c.id === courseId) ?? state.courses[0];
  const modules = state.modules
    .filter((m) => m.courseId === selectedCourse?.id)
    .sort((a, b) => a.position - b.position);
  const selectedModule = modules.find((m) => m.id === moduleId) ?? modules[0];
  const students = state.users.filter((u) => u.role === "student");
  return (
    <section className="demo-panel academics-panel">
      <div className="demo-heading">
        <div>
          <h1>Make room for learning.</h1>
          <p className="demo-muted">
            Curate the curriculum, support students and review their work.
          </p>
        </div>
      </div>
      <Tabs
        items={["Courses", "Students", "Assignments"]}
        active={tab}
        onChange={setTab}
      />
      {tab === "Courses" && (
        <>
          <div className="academic-editor-layout">
            <section>
              <h2>Course library</h2>
              {state.courses.map((course) => (
                <article className="academic-course" key={course.id}>
                  <div>
                    <h3>{course.title}</h3>
                    <span className="demo-badge">
                      {course.published ? "Published" : "Draft"}
                    </span>
                    <p className="demo-muted">{course.category}</p>
                  </div>
                  <div className="academic-actions">
                    <button
                      className="demo-button secondary"
                      onClick={() => {
                        setCourseId(course.id);
                        setModuleId("");
                        setModuleEditing(null);
                        setLessonEditing(null);
                      }}
                    >
                      Curriculum
                    </button>
                    <button
                      className="demo-button secondary"
                      onClick={() => setEditing(course)}
                    >
                      Edit course
                    </button>
                  </div>
                </article>
              ))}
            </section>
            <section className="academic-editor">
              <h2>{editing ? "Edit course" : "Create a course"}</h2>
              <form
                className="demo-form"
                key={editing?.id ?? "new-course"}
                onSubmit={(event) => {
                  const data = values(event);
                  if (
                    dispatch({
                      type: "course.save",
                      payload: {
                        ...data,
                        ...(editing ? { id: editing.id } : {}),
                        published: data.published === "on",
                      },
                    })
                  ) {
                    setEditing(null);
                    event.currentTarget.reset();
                  }
                }}
              >
                <Field
                  label="Course title"
                  name="title"
                  value={editing?.title}
                />
                <Field
                  label="Category"
                  name="category"
                  value={editing?.category}
                />
                <Field
                  label="Description"
                  name="description"
                  value={editing?.description}
                  multiline
                />
                <label className="demo-field">
                  Archive photograph
                  <select
                    className="demo-input"
                    name="image"
                    defaultValue={
                      editing?.image ?? "/images/workshop-presentation.webp"
                    }
                  >
                    {archiveImages.map((image) => (
                      <option key={image} value={`/images/${image}.webp`}>
                        {image.replaceAll("-", " ")}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="academic-checkbox">
                  <input
                    type="checkbox"
                    name="published"
                    defaultChecked={editing?.published ?? false}
                  />{" "}
                  Published for students
                </label>
                <div className="academic-actions">
                  <button className="demo-button">Save course</button>
                  {editing && (
                    <button
                      type="button"
                      className="demo-button secondary"
                      onClick={() => setEditing(null)}
                    >
                      Cancel edit
                    </button>
                  )}
                </div>
              </form>
            </section>
          </div>
          {selectedCourse && (
            <section className="academic-curriculum">
              <h2>Curriculum studio</h2>
              <label className="demo-field">
                Course
                <select
                  className="demo-input"
                  value={selectedCourse.id}
                  onChange={(event) => {
                    setCourseId(event.target.value);
                    setModuleId("");
                    setModuleEditing(null);
                    setLessonEditing(null);
                  }}
                >
                  {state.courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </label>
              <div className="academic-editor-layout">
                <section>
                  <h3>Modules</h3>
                  {modules.map((module) => (
                    <article className="academic-course" key={module.id}>
                      <div>
                        <h4>
                          {module.position}. {module.title}
                        </h4>
                      </div>
                      <div className="academic-actions">
                        <button
                          className="demo-button secondary"
                          onClick={() => {
                            setModuleId(module.id);
                            setLessonEditing(null);
                          }}
                        >
                          View lessons
                        </button>
                        <button
                          className="demo-button secondary"
                          onClick={() => {
                            setModuleId(module.id);
                            setModuleEditing(module);
                            setLessonEditing(null);
                          }}
                        >
                          Edit module
                        </button>
                      </div>
                    </article>
                  ))}
                  <form
                    className="demo-form"
                    key={moduleEditing?.id ?? `module-${selectedCourse.id}`}
                    onSubmit={(event) => {
                      const data = values(event);
                      if (
                        dispatch({
                          type: "module.save",
                          payload: {
                            ...data,
                            courseId: selectedCourse.id,
                            position: Number(data.position),
                            ...(moduleEditing ? { id: moduleEditing.id } : {}),
                          },
                        })
                      ) {
                        setModuleEditing(null);
                        event.currentTarget.reset();
                      }
                    }}
                  >
                    <h3>{moduleEditing ? "Edit module" : "Add module"}</h3>
                    <Field
                      label="Module title"
                      name="title"
                      value={moduleEditing?.title}
                    />
                    <Field
                      label="Module order"
                      name="position"
                      type="number"
                      value={moduleEditing?.position ?? modules.length + 1}
                    />
                    <div className="academic-actions">
                      <button className="demo-button">Save module</button>
                      {moduleEditing && (
                        <button
                          type="button"
                          className="demo-button secondary"
                          onClick={() => setModuleEditing(null)}
                        >
                          Cancel edit
                        </button>
                      )}
                    </div>
                  </form>
                </section>
                <section>
                  {selectedModule ? (
                    <>
                      <h3>Lessons in {selectedModule.title}</h3>
                      {state.lessons
                        .filter((l) => l.moduleId === selectedModule.id)
                        .sort((a, b) => a.position - b.position)
                        .map((lesson) => (
                          <article className="academic-course" key={lesson.id}>
                            <h4>
                              {lesson.position}. {lesson.title}
                            </h4>
                            <button
                              className="demo-button secondary"
                              onClick={() => setLessonEditing(lesson)}
                            >
                              Edit lesson
                            </button>
                          </article>
                        ))}
                      <form
                        className="demo-form"
                        key={lessonEditing?.id ?? `lesson-${selectedModule.id}`}
                        onSubmit={(event) => {
                          const data = values(event);
                          if (
                            dispatch({
                              type: "lesson.save",
                              payload: {
                                ...data,
                                moduleId: selectedModule.id,
                                position: Number(data.position),
                                ...(lessonEditing
                                  ? { id: lessonEditing.id }
                                  : {}),
                              },
                            })
                          ) {
                            setLessonEditing(null);
                            event.currentTarget.reset();
                          }
                        }}
                      >
                        <h3>{lessonEditing ? "Edit lesson" : "Add lesson"}</h3>
                        <Field
                          label="Lesson title"
                          name="title"
                          value={lessonEditing?.title}
                        />
                        <Field
                          label="Lesson order"
                          name="position"
                          type="number"
                          value={
                            lessonEditing?.position ??
                            state.lessons.filter(
                              (l) => l.moduleId === selectedModule.id,
                            ).length + 1
                          }
                        />
                        <Field
                          label="Lesson content"
                          name="content"
                          value={lessonEditing?.content}
                          multiline
                        />
                        <Field
                          label="Assignment prompt (optional)"
                          name="assignment"
                          value={lessonEditing?.assignment}
                          multiline
                          required={false}
                        />
                        <div className="academic-actions">
                          <button className="demo-button">Save lesson</button>
                          {lessonEditing && (
                            <button
                              type="button"
                              className="demo-button secondary"
                              onClick={() => setLessonEditing(null)}
                            >
                              Cancel edit
                            </button>
                          )}
                        </div>
                      </form>
                    </>
                  ) : (
                    <Empty>Add a module before adding lessons.</Empty>
                  )}
                </section>
              </div>
            </section>
          )}
        </>
      )}
      {tab === "Students" && (
        <>
          <h2>Student directory</h2>
          <p className="demo-muted">
            Manage synthetic student profiles and access.
          </p>
          {students.map((student) => (
            <article className="academic-course" key={student.id}>
              <div>
                <h3>{student.name}</h3>
                <p>{student.email}</p>
                <p className="demo-muted">
                  {student.college || "College not supplied"} ·{" "}
                  {
                    state.enrollments.filter((e) => e.userId === student.id)
                      .length
                  }{" "}
                  courses ·{" "}
                  {
                    state.completions.filter((c) => c.userId === student.id)
                      .length
                  }{" "}
                  completed lessons
                </p>
                <span className="demo-badge">
                  {student.active ? "Active" : "Inactive"}
                </span>
              </div>
              <button
                className="demo-button secondary"
                onClick={() => setStudentEditing(student)}
              >
                Edit student
              </button>
            </article>
          ))}
          {studentEditing && (
            <form
              className="demo-form academic-editor"
              key={studentEditing.id}
              onSubmit={(event) => {
                const data = values(event);
                if (
                  dispatch({
                    type: "user.save",
                    payload: {
                      ...studentEditing,
                      name: data.name,
                      college: data.college,
                      bio: data.bio,
                      active: data.active === "on",
                    },
                  })
                )
                  setStudentEditing(null);
              }}
            >
              <h3>Edit {studentEditing.name}</h3>
              <Field
                label="Student name"
                name="name"
                value={studentEditing.name}
              />
              <Field
                label="College"
                name="college"
                value={studentEditing.college}
                required={false}
              />
              <Field
                label="Bio"
                name="bio"
                value={studentEditing.bio}
                multiline
                required={false}
              />
              <label className="academic-checkbox">
                <input
                  name="active"
                  type="checkbox"
                  defaultChecked={studentEditing.active}
                />{" "}
                Active student access
              </label>
              <div className="academic-actions">
                <button className="demo-button">Save student</button>
                <button
                  type="button"
                  className="demo-button secondary"
                  onClick={() => setStudentEditing(null)}
                >
                  Cancel edit
                </button>
              </div>
            </form>
          )}
        </>
      )}
      {tab === "Assignments" && (
        <>
          <h2>Assignment review</h2>
          <p className="demo-muted">
            {state.submissions.filter((s) => s.status === "submitted").length}{" "}
            responses awaiting review.
          </p>
          {state.submissions.map((submission) => (
            <article className="academic-review" key={submission.id}>
              <div>
                <span className="demo-badge">{submission.status}</span>
                <h3>
                  {state.lessons.find((l) => l.id === submission.lessonId)
                    ?.title ?? "Lesson"}
                </h3>
                <p className="demo-muted">
                  {state.users.find((u) => u.id === submission.userId)?.name ??
                    "Student"}
                </p>
                <blockquote className="academic-text">
                  {submission.content}
                </blockquote>
              </div>
              <form
                className="demo-form"
                onSubmit={(event) => {
                  const data = values(event);
                  dispatch({
                    type: "submission.review",
                    payload: { id: submission.id, feedback: data.feedback },
                  });
                }}
              >
                <Field
                  label="Academic feedback"
                  name="feedback"
                  value={submission.feedback}
                  multiline
                />
                <button className="demo-button">Save feedback</button>
              </form>
            </article>
          ))}
          {!state.submissions.length && (
            <Empty>Student assignment responses will appear here.</Empty>
          )}
        </>
      )}
    </section>
  );
}
