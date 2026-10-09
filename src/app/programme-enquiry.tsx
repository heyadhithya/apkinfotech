import { courses, registrationUrl } from "./course-data";

export default function ProgrammeEnquiry() {
  return (
    <section id="enquiry" className="enquiry-section">
      <div className="wrap enquiry-grid">
        <div>
          <h2>Course enquiries</h2>
          <p>Ask about the programme, upcoming batches, fees, and entry requirements.</p>
        </div>
        <div>
          <form action="https://wa.me/918939410255" method="get" target="_blank" rel="noreferrer">
            <label htmlFor="enquiry-programme">Which programme are you interested in?</label>
            <select id="enquiry-programme" name="text" defaultValue="Hello APK Infotech, please help me choose a programme. Please share current batches, fees, and entry requirements.">
              <option value="Hello APK Infotech, please help me choose a programme. Please share current batches, fees, and entry requirements.">Help me choose</option>
              {courses.map((course) => (
                <option key={course.id} value={`Hello APK Infotech, I'm interested in ${course.title}. Please share current batches, fees, and entry requirements.`}>
                  {course.title}
                </option>
              ))}
            </select>
            <button className="button primary" type="submit">Continue on WhatsApp <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.7" /></svg></button>
            <p className="enquiry-note">Opens a draft. You review and send it in WhatsApp.</p>
          </form>
          <a className="text-link" href={registrationUrl} target="_blank" rel="noreferrer">Prefer to register your interest? Use the official form.</a>
        </div>
      </div>
    </section>
  );
}
