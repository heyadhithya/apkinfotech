"use client";
import { useState, type FormEvent } from "react";
import type { PortalAction, PortalPayload, PortalSnapshot, Course, Lesson } from "../../lib/portal/types";
import { mutate } from "./portal-client";
import "./student.css";
type Tab = "Overview" | "Internships" | "My learning" | "Profile";
const tabs: Tab[] = ["Overview", "Internships", "My learning", "Profile"];
const date = (value: string) => value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Not specified";
function LessonView({ lesson, data, lessons, completed, pending, run }: {
    lesson: Lesson;
    data: PortalSnapshot;
    lessons: Lesson[];
    completed: Set<string>;
    pending: boolean;
    run: (action: PortalAction, payload: PortalPayload, success: string) => Promise<void>;
}) {
    const submission = data.submissions.find((item) => item.lessonId === lesson.id);
    const index = lessons.findIndex((item) => item.id === lesson.id);
    const unlocked = lessons.slice(0, index).every((item) => completed.has(item.id));
    return <article className="student-reader">
      <p className="portal-muted">Lesson {index + 1} of {lessons.length} · {completed.has(lesson.id) ? "Completed" : unlocked ? "Ready to learn" : "Complete earlier lessons to continue"}</p>
      <h3>{lesson.title}</h3>
      {unlocked ? <>
        <div className="student-plain-text">{lesson.content || "Content will be added by APK staff."}</div>
        <button className="portal-button" disabled={pending || completed.has(lesson.id)} onClick={() => void run("lesson.complete", { lessonId: lesson.id }, "Lesson completed. Your progress is saved.")}>{completed.has(lesson.id) ? "Lesson completed" : pending ? "Saving…" : "Mark lesson complete"}</button>
        {lesson.assignment && <section className="student-assignment">
          <h4>Assignment</h4><p className="student-plain-text">{lesson.assignment}</p>
          <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = new FormData(event.currentTarget); void run("submission.save", { lessonId: lesson.id, content: form.get("content") }, "Assignment submitted for staff review."); }}>
            <label className="portal-field">Your response<textarea className="portal-input" name="content" defaultValue={submission?.content ?? ""} required maxLength={10000} rows={8} disabled={pending}/></label>
            <p className="portal-muted">Plain text only, up to 10,000 characters. Saving again replaces your previous response.</p>
            <button className="portal-button" disabled={pending}>{pending ? "Saving…" : submission ? "Update response" : "Submit response"}</button>
          </form>
          {submission && <div className="student-feedback"><span className="portal-badge">{submission.status}</span><p>Last saved {date(submission.updatedAt)}</p><h4>Staff feedback</h4><p className="student-plain-text">{submission.feedback || "Your response is awaiting feedback."}</p></div>}
        </section>}
      </> : <p className="portal-empty">Read and complete the earlier lessons in order. Choose the next available lesson from the course outline.</p>}
    </article>;
}
export default function StudentPanel({ data, onRefresh }: {
    data: PortalSnapshot;
    onRefresh: () => Promise<void>;
}) {
    const [tab, setTab] = useState<Tab>("Overview");
    const [now] = useState(() => Date.now());
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedLesson, setSelectedLesson] = useState("");
    const [search, setSearch] = useState("");
    const completed = new Set(data.completions.map((item) => item.lessonId));
    const enrolled = new Set(data.enrollments.map((item) => item.courseId));
    const orderedLessons = (course: Course) => data.modules.filter((module) => module.courseId === course.id).sort((a, b) => a.position - b.position).flatMap((module) => data.lessons.filter((lesson) => lesson.moduleId === module.id).sort((a, b) => a.position - b.position));
    const run = async (action: PortalAction, payload: PortalPayload, success: string) => {
        setPending(true);
        setError("");
        setMessage("");
        try {
            await mutate(action, payload);
            await onRefresh();
            setMessage(success);
        }
        catch (cause) {
            setError(cause instanceof Error ? cause.message : "Unable to save. Please try again.");
        }
        finally {
            setPending(false);
        }
    };
    const go = (next: Tab) => { setTab(next); setMessage(""); setError(""); };
    const activeCourse = data.courses.find((course) => course.id === selectedCourse && enrolled.has(course.id));
    const lessons = activeCourse ? orderedLessons(activeCourse) : [];
    const nextLesson = lessons.find((lesson) => !completed.has(lesson.id));
    const activeLesson = lessons.find((lesson) => lesson.id === selectedLesson) ?? nextLesson ?? lessons[0];
    const changeCourse = (id: string) => { setSelectedCourse(id); setSelectedLesson(""); };
    return <div className="student-panel" aria-busy={pending}>
    <nav className="portal-tabs student-tabs" aria-label="Student sections">{tabs.map((item) => <button key={item} type="button" aria-current={tab === item ? "page" : undefined} className={tab === item ? "student-tab-active" : ""} onClick={() => go(item)}>{item}</button>)}</nav>
    {error && <p className="portal-message student-error" role="alert">{error}</p>}
    {message && <p className="portal-message" role="status">{message}</p>}
    {tab === "Overview" && <section className="portal-section">
      <div className="student-section-heading"><div><h2>Your next step</h2><p className="portal-muted">Welcome, {data.user.name}. Keep your applications and learning in one place.</p></div><button className="portal-button" onClick={() => go("Profile")}>Edit profile</button></div>
      <div className="student-overview">
        <section><h3>Continue learning</h3>{data.enrollments.length ? <ul className="student-list">{data.courses.filter((course) => enrolled.has(course.id)).map((course) => { const all = orderedLessons(course); const done = all.filter((lesson) => completed.has(lesson.id)).length; return <li key={course.id}><div><strong>{course.title}</strong><p className="portal-muted">{course.status === "draft" ? "Temporarily unavailable · enrollment saved" : `${done} of ${all.length} lessons complete`}</p></div><button className="portal-button" disabled={course.status !== "published"} onClick={() => { changeCourse(course.id); go("My learning"); }}>{course.status === "published" ? "Open course" : "Temporarily unavailable"}</button></li>; })}</ul> : <div className="portal-empty"><p>You have not enrolled in a course yet.</p><button className="portal-button" onClick={() => go("My learning")}>Browse learning courses</button></div>}</section>
        <section><h3>Applications</h3><p>{data.applications.filter((item) => ["submitted", "reviewing"].includes(item.status)).length} applications awaiting a decision.</p><p className="portal-muted">View each opportunity, application status and any change from APK staff.</p><button className="portal-button" onClick={() => go("Internships")}>View internships</button></section>
      </div>
    </section>}
    {tab === "Internships" && <section className="portal-section"><h2>Internships</h2><p className="portal-muted">Read the opportunity details before applying. An application does not guarantee selection.</p>
      <label className="portal-field student-search">Find an internship<input className="portal-input" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, location or mode"/></label>
      <div className="student-opportunities">{data.internships.filter((item) => `${item.title} ${item.location} ${item.mode}`.toLowerCase().includes(search.trim().toLowerCase())).map((item) => {
                const application = data.applications.find((entry) => entry.internshipId === item.id);
                const deadlinePassed = !!item.deadline && new Date(`${item.deadline.slice(0, 10)}T23:59:59.999Z`).getTime() < now;
                const closed = item.status !== "published" || deadlinePassed;
                return <article className="student-opportunity" key={item.id}><div className="student-section-heading"><h3>{item.title}</h3><div className="student-badges">{item.isDemo && <span className="portal-badge">Demo opportunity</span>}<span className="portal-badge">{closed ? "Closed" : "Open"}</span></div></div>
          <dl className="student-details"><div><dt>Location</dt><dd>{item.location || "Not specified"}</dd></div><div><dt>Mode</dt><dd>{item.mode || "Not specified"}</dd></div><div><dt>Duration</dt><dd>{item.duration || "Not specified"}</dd></div><div><dt>Apply by</dt><dd>{date(item.deadline)}</dd></div></dl>
          <p className="student-plain-text">{item.description}</p>{item.isDemo && <p className="portal-muted">Synthetic content for trying this portal. This is not a real vacancy.</p>}
          {application ? <div className="student-application"><h4>Your application <span className="portal-badge">{application.status}</span></h4><p className="portal-muted">Submitted {date(application.createdAt)} · Updated {date(application.updatedAt)}</p><details><summary>View your motivation</summary><p className="student-plain-text">{application.motivation}</p></details>{["submitted", "reviewing"].includes(application.status) && <button className="portal-button student-secondary" disabled={pending} onClick={() => void run("application.withdraw", { id: application.id }, "Application withdrawn.")}>Withdraw application</button>}</div> : closed ? <p className="portal-muted">This opportunity is no longer accepting applications.</p> : <details className="student-apply"><summary>Apply for this internship</summary><form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); void run("application.submit", { internshipId: item.id, motivation: form.get("motivation") }, "Application submitted. You can track its status here."); }}><label className="portal-field">Why would you like to join?<textarea className="portal-input" name="motivation" required maxLength={5000} rows={4} disabled={pending}/></label><p className="portal-muted">Share relevant interests and experience, up to 5,000 characters.</p><button className="portal-button" disabled={pending}>{pending ? "Submitting…" : "Submit application"}</button></form></details>}
        </article>;
            })}{!data.internships.some((item) => `${item.title} ${item.location} ${item.mode}`.toLowerCase().includes(search.trim().toLowerCase())) && <p className="portal-empty">{search ? "No internships match your search. Try a different title or location." : "No opportunities are published yet. Check back when APK adds a listing."}</p>}</div>
    </section>}
    {tab === "My learning" && <section className="portal-section"><h2>My learning</h2><p className="portal-muted">Enroll in a published course, then work through its lessons in order.</p>
      {activeCourse ? <><button className="portal-button student-secondary" onClick={() => changeCourse("")}>Back to courses</button><div className="student-course-heading"><h3>{activeCourse.title}</h3>{activeCourse.isDemo && <span className="portal-badge">Demo course</span>}{activeCourse.status === "published" && <><p className="portal-muted">{lessons.filter((lesson) => completed.has(lesson.id)).length} of {lessons.length} lessons complete</p><progress max={lessons.length || 1} value={lessons.filter((lesson) => completed.has(lesson.id)).length} aria-label="Course progress"/><span>{lessons.length ? Math.round(lessons.filter((lesson) => completed.has(lesson.id)).length / lessons.length * 100) : 0}%</span></>}</div>
        {activeCourse.status !== "published" ? <p className="portal-empty">This course is temporarily unavailable. Your enrollment and saved progress are retained. Check back when APK republishes the course.</p> : lessons.length ? <div className="student-learning-layout"><aside className="student-outline" aria-label="Course outline">{data.modules.filter((module) => module.courseId === activeCourse.id).sort((a, b) => a.position - b.position).map((module) => <section key={module.id}><h4>{module.title}</h4><ol>{data.lessons.filter((lesson) => lesson.moduleId === module.id).sort((a, b) => a.position - b.position).map((lesson) => <li key={lesson.id}><button aria-current={lesson.id === activeLesson?.id ? "step" : undefined} onClick={() => setSelectedLesson(lesson.id)}>{lesson.title}<small>{completed.has(lesson.id) ? "Completed" : lesson.id === nextLesson?.id ? "Up next" : "Not completed"}</small></button></li>)}</ol></section>)}</aside>{activeLesson && <LessonView key={`${activeLesson.id}-${data.submissions.find((item) => item.lessonId === activeLesson.id)?.updatedAt ?? "new"}`} lesson={activeLesson} data={data} lessons={lessons} completed={completed} pending={pending} run={run}/>}</div> : <p className="portal-empty">This course has no published lessons yet. Your enrollment is saved.</p>}</> : <div className="student-course-list">{data.courses.map((course) => <article key={course.id} className="student-course-row"><div><h3>{course.title}</h3>{course.isDemo && <span className="portal-badge">Demo course</span>}<p className="student-plain-text">{course.description}</p>{course.status !== "published" && <p className="portal-muted">Your enrollment is saved. Learning will resume when APK republishes this course.</p>}{course.isDemo && <p className="portal-muted">Synthetic learning content for demonstrating the portal.</p>}</div><button className="portal-button" disabled={pending || course.status !== "published"} onClick={() => enrolled.has(course.id) ? changeCourse(course.id) : void run("enrollment.create", { courseId: course.id }, "Enrollment saved. Open the course to begin.")}>{course.status !== "published" ? "Temporarily unavailable" : enrolled.has(course.id) ? "Open course" : pending ? "Saving…" : "Enroll in course"}</button></article>)}{!data.courses.length && <p className="portal-empty">No learning courses are published yet. APK staff will add courses here.</p>}</div>}
    </section>}
    {tab === "Profile" && <section className="portal-section student-profile"><h2>Your profile</h2><p className="portal-muted">Keep the details APK staff can review with your application up to date.</p><p><strong>{data.user.name}</strong><br />{data.user.email}</p><form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); void run("profile.save", Object.fromEntries(form.entries()), "Profile saved."); }}><div className="student-profile-grid">{([{ name: "college", label: "College", max: 200 }, { name: "discipline", label: "Discipline / field of study", max: 200 }, { name: "graduationYear", label: "Graduation year", max: 4 }, { name: "phone", label: "Phone", max: 30 }, { name: "portfolioUrl", label: "Portfolio URL", max: 500 }] as const).map((field) => <label className="portal-field" key={field.name}>{field.label}<input className="portal-input" name={field.name} defaultValue={data.profile[field.name]} maxLength={field.max} type={field.name === "portfolioUrl" ? "url" : field.name === "phone" ? "tel" : "text"} inputMode={field.name === "graduationYear" ? "numeric" : undefined} pattern={field.name === "graduationYear" ? "[0-9]{4}" : undefined} disabled={pending}/></label>)}</div><label className="portal-field">About you<textarea className="portal-input" name="bio" defaultValue={data.profile.bio} maxLength={2000} rows={5} disabled={pending}/></label><p className="portal-muted">Add a short introduction, up to 2,000 characters. All profile fields are optional.</p><button className="portal-button" disabled={pending}>{pending ? "Saving…" : "Save profile"}</button></form></section>}
  </div>;
}
