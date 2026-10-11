import type { DemoAction, DemoApplication, DemoCourse, DemoInvoice, DemoRole, DemoState } from './types';
const roles: DemoRole[] = ['student', 'staff', 'hr', 'cto', 'admin', 'cfo', 'cbo'];
const images = ['/images/workshop-presentation.webp', '/images/technical-session.webp', '/images/project-review.webp', '/images/workshop-group.webp', '/images/workshop-conversation.webp', '/images/summer-internship.webp', '/images/learners.webp', '/images/internship-classroom.webp', '/images/docker-workshop.webp', '/images/college-engagement.webp', '/images/classroom.webp', '/images/classroom-teaching.webp', '/images/classroom-discussion.webp'];
const sampleDate = '2026-10-11T09:00:00.000Z';
/** Synthetic fixtures only. Archive photographs illustrate past activities, not these records. */
export function seedDemo(): DemoState {
    const users = roles.map(role => ({ id: `demo-${role}`, name: `Demo ${role === 'student' ? 'Asha — learner' : role === 'staff' ? 'Maya — academics' : role === 'hr' ? 'Ravi — placement' : role === 'cto' ? 'Dev — technology' : role === 'admin' ? 'Sam — administrator' : role === 'cfo' ? 'Priya — finance' : 'Nila — business'}`, email: `${role}@demo.example.test`, role, active: true, college: role === 'student' ? 'Demo College A (fictional)' : '', bio: 'Fictional identity for this browser demo.' }));
    users.push(...['2', '3'].map((n) => ({ id: `demo-student-${n}`, name: n === '2' ? 'Demo Arjun — learner' : 'Demo Leela — learner', email: `student${n}@demo.example.test`, role: 'student' as const, active: true, college: `Demo College ${n === '2' ? 'B' : 'A'} (fictional)`, bio: 'Fictional learner for workflow practice.' })));
    const courses: DemoCourse[] = [
        { id: 'demo-course-web', title: 'Demo · Web application studio', category: 'Development', description: 'Fictional learning pathway: build an accessible interface, model data and present a small project. This is sample curriculum, not a published APK course offer.', published: true, image: images[0] },
        { id: 'demo-course-career', title: 'Demo · Career preparation lab', category: 'Career', description: 'Fictional practice pathway covering a project portfolio, interview preparation and a mock application.', published: true, image: images[1] },
        { id: 'demo-course-cloud', title: 'Demo · Cloud delivery workshop', category: 'Technology', description: 'Fictional draft curriculum for deployment planning and a delivery checklist. Not an available programme.', published: false, image: images[2] },
    ];
    const modules = courses.flatMap((course, i) => [1, 2].map(position => ({ id: `${course.id}-module-${position}`, courseId: course.id, title: position === 1 ? ['Demo foundations', 'Demo portfolio', 'Demo delivery foundations'][i] : ['Demo project practice', 'Demo interview practice', 'Demo release practice'][i], position })));
    const lessons = modules.flatMap(module => [1, 2].map(position => ({ id: `${module.id}-lesson-${position}`, moduleId: module.id, title: position === 1 ? 'Explore the demo brief' : 'Build and reflect', position, content: position === 1 ? 'Read this fictional project brief. Describe the user goal, list the inputs and explain one useful outcome. All examples in this exercise are synthetic.' : 'Use the fictional brief to create a short implementation plan. Explain how you would check the result and identify one improvement.', assignment: position === 1 ? 'Write three observations about the fictional brief.' : 'Submit a concise plan and a reflection on the practice exercise.' })));
    return { version: 1, users, courses, modules, lessons,
        enrollments: [{ userId: 'demo-student', courseId: courses[0].id }, { userId: 'demo-student-2', courseId: courses[0].id }, { userId: 'demo-student-3', courseId: courses[1].id }],
        completions: [{ userId: 'demo-student', lessonId: lessons[0].id }, { userId: 'demo-student-2', lessonId: lessons[0].id }],
        submissions: [{ id: 'demo-submission-1', userId: 'demo-student-2', lessonId: lessons[0].id, content: 'Demo response: the fictional interface should explain its goal, validate input and show a clear result.', feedback: '', status: 'submitted' }],
        opportunities: [{ id: 'demo-opportunity-1', title: 'Demo · Frontend internship', company: 'Demo employer A (fictional)', location: 'Chennai (sample)', mode: 'Hybrid', description: 'Fictional internship for practicing an application and interview workflow. No real vacancy or employer partnership.', open: true }, { id: 'demo-opportunity-2', title: 'Demo · Technical operations internship', company: 'Demo employer B (fictional)', location: 'Remote (sample)', mode: 'Remote', description: 'Fictional opportunity for practicing a technical operations application. No real hiring commitment.', open: true }],
        applications: [{ id: 'demo-application-1', studentId: 'demo-student', opportunityId: 'demo-opportunity-1', motivation: 'Demo: I want to practise presenting my interface project.', status: 'applied', interviewAt: '', notes: '' }, { id: 'demo-application-2', studentId: 'demo-student-2', opportunityId: 'demo-opportunity-1', motivation: 'Demo: I enjoy accessible interface design.', status: 'interview', interviewAt: '2026-10-14T10:00:00.000Z', notes: 'Fictional interview scheduled for demo review.' }, { id: 'demo-application-3', studentId: 'demo-student-3', opportunityId: 'demo-opportunity-2', motivation: 'Demo: I want to practise release planning.', status: 'screening', interviewAt: '', notes: 'Demo portfolio review in progress.' }],
        leads: [{ id: 'demo-lead-1', name: 'Demo contact A', organization: 'Demo employer A (fictional)', email: 'a@employer.example.test', stage: 'new', value: 15000, notes: 'Fictional employer enquiry.', kind: 'employer' }, { id: 'demo-lead-2', name: 'Demo contact B', organization: 'Demo College B (fictional)', email: 'b@college.example.test', stage: 'qualified', value: 30000, notes: 'Demo workshop discussion; no actual partnership.', kind: 'college' }, { id: 'demo-lead-3', name: 'Demo contact C', organization: 'Demo employer C (fictional)', email: 'c@employer.example.test', stage: 'proposal', value: 45000, notes: 'Fictional proposal awaiting review.', kind: 'employer' }, { id: 'demo-lead-4', name: 'Demo contact D', organization: 'Demo College D (fictional)', email: 'd@college.example.test', stage: 'won', value: 20000, notes: 'Sample closed opportunity; no actual revenue.', kind: 'college' }, { id: 'demo-lead-5', name: 'Demo contact E', organization: 'Demo learner enquiry (fictional)', email: 'e@learner.example.test', stage: 'lost', value: 5000, notes: 'Practice enquiry closed.', kind: 'student' }],
        invoices: [{ id: 'demo-invoice-1', customer: 'Demo College A (fictional)', description: 'Sample workshop planning', amount: 24000, dueDate: '2026-10-20', status: 'draft' }, { id: 'demo-invoice-2', customer: 'Demo employer B (fictional)', description: 'Sample delivery support', amount: 36000, dueDate: '2026-10-15', status: 'sent' }, { id: 'demo-invoice-3', customer: 'Demo College C (fictional)', description: 'Sample learning activity', amount: 18000, dueDate: '2026-10-05', status: 'paid' }, { id: 'demo-invoice-4', customer: 'Demo employer D (fictional)', description: 'Cancelled fictional workshop', amount: 12000, dueDate: '2026-10-01', status: 'void' }],
        expenses: [{ id: 'demo-expense-1', description: 'Demo classroom materials', category: 'Learning', amount: 2500, date: '2026-10-08' }, { id: 'demo-expense-2', description: 'Demo hosting allocation', category: 'Technology', amount: 1800, date: '2026-10-09' }, { id: 'demo-expense-3', description: 'Demo workshop logistics', category: 'Operations', amount: 4200, date: '2026-10-10' }],
        projects: [{ id: 'demo-project-1', title: 'Demo learner workspace', ownerId: 'demo-cto', status: 'in-progress', priority: 'high', notes: 'Fictional technical delivery board.' }, { id: 'demo-project-2', title: 'Demo curriculum refresh', ownerId: 'demo-staff', status: 'review', priority: 'normal', notes: 'Sample lesson content review.' }, { id: 'demo-project-3', title: 'Demo interview calendar', ownerId: 'demo-hr', status: 'planned', priority: 'normal', notes: 'Practice scheduling workflow.' }, { id: 'demo-project-4', title: 'Demo access audit', ownerId: 'demo-admin', status: 'complete', priority: 'normal', notes: 'Fictional access review completed.' }],
        events: [{ id: 'demo-event-1', actorId: 'demo-admin', description: 'Synthetic demo workspace prepared; all records are fictional.', at: sampleDate }, { id: 'demo-event-2', actorId: 'demo-staff', description: 'Demo learning pathways prepared for practice.', at: sampleDate }, { id: 'demo-event-3', actorId: 'demo-hr', description: 'Fictional interview added to the demo pipeline.', at: sampleDate }],
    };
}
function fail(message: string): never { throw new Error(message); }
function text(p: Record<string, unknown>, key: string, max: number, optional = false): string {
    const value = p[key];
    if (optional && (value === undefined || value === ''))
        return '';
    if (typeof value !== 'string')
        return fail(`${key} must be text.`);
    const clean = value.trim();
    if (!optional && !clean)
        return fail(`${key} is required.`);
    if (clean.length > max)
        return fail(`${key} exceeds the maximum length of ${max}.`);
    return clean;
}
function choice<T extends string>(p: Record<string, unknown>, key: string, values: readonly T[]): T { const value = text(p, key, 80); if (!values.includes(value as T))
    return fail(`Invalid ${key}.`); return value as T; }
function flag(p: Record<string, unknown>, key: string): boolean { if (typeof p[key] !== 'boolean')
    return fail(`${key} must be true or false.`); return p[key] as boolean; }
function integer(p: Record<string, unknown>, key: string, zero = false): number { const value = p[key]; if (typeof value !== 'number' || !Number.isSafeInteger(value))
    return fail(`${key} must be a whole number.`); if (value < (zero ? 0 : 1) || value > 1000000000)
    return fail(`${key} must be ${zero ? 'non-negative' : 'positive'} and within the demo limit.`); return value; }
function date(p: Record<string, unknown>, key: string, time = false): string {
    const value = text(p, key, 40);
    const pattern = time ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})?$/ : /^\d{4}-\d{2}-\d{2}$/;
    if (!pattern.test(value) || !Number.isFinite(Date.parse(value)) || new Date(`${value.slice(0, 10)}T00:00:00Z`).toISOString().slice(0, 10) !== value.slice(0, 10))
        return fail(`${key} must be a valid ${time ? 'date and time' : 'date'}.`);
    if (time) {
        const hour = Number(value.slice(11, 13));
        const minute = Number(value.slice(14, 16));
        const second = value[16] === ':' ? Number(value.slice(17, 19)) : 0;
        if (hour > 23 || minute > 59 || second > 59)
            return fail(`${key} must be a valid date and time.`);
        // datetime-local controls have no zone; this simulator interprets them as UTC.
        const utc = /(?:Z|[+-]\d{2}:\d{2})$/.test(value) ? value : `${value}Z`;
        return new Date(utc).toISOString();
    }
    return value;
}
function email(p: Record<string, unknown>): string { const value = text(p, 'email', 160).toLowerCase(); if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.example\.test$/.test(value))
    return fail('Use a synthetic email ending in .example.test.'); return value; }
function find<T extends {
    id: string;
}>(records: T[], id: string, label: string): T { return records.find(x => x.id === id) ?? fail(`${label} was not found.`); }
function save<T extends {
    id: string;
}>(records: T[], record: T): void { const i = records.findIndex(x => x.id === record.id); if (i < 0)
    records.push(record);
else
    records[i] = record; }
function recordId<T extends {
    id: string;
}>(records: T[], p: Record<string, unknown>): string { const id = text(p, 'id', 160, true); if (id)
    find(records, id, 'Record'); return id || globalThis.crypto.randomUUID(); }
function lessonContext(s: DemoState, userId: string, lessonId: string) {
    const lesson = find(s.lessons, lessonId, 'Lesson');
    const lessonModule = find(s.modules, lesson.moduleId, 'Module');
    const course = find(s.courses, lessonModule.courseId, 'Course');
    if (!course.published)
        fail('Course must be published.');
    if (!s.enrollments.some(e => e.userId === userId && e.courseId === course.id))
        fail('Enroll in the course first.');
    const ordered = s.modules.filter(m => m.courseId === course.id).sort((a, b) => a.position - b.position || a.id.localeCompare(b.id)).flatMap(m => s.lessons.filter(l => l.moduleId === m.id).sort((a, b) => a.position - b.position || a.id.localeCompare(b.id)));
    if (ordered.slice(0, ordered.findIndex(l => l.id === lessonId)).some(l => !s.completions.some(c => c.userId === userId && c.lessonId === l.id)))
        fail('Complete the previous lessons first.');
    return lesson;
}
const permissions: Record<DemoAction['type'], DemoRole[]> = {
    'profile.save': ['student'], enroll: ['student'], complete: ['student'], submit: ['student'], 'submission.review': ['staff'], 'course.save': ['staff'], 'module.save': ['staff'], 'lesson.save': ['staff'], 'opportunity.save': ['hr'], apply: ['student'], 'application.update': ['hr'], 'application.withdraw': ['student'], 'lead.save': ['cbo'], 'invoice.save': ['cfo'], 'expense.save': ['cfo'], 'project.save': ['cto'], 'user.save': ['admin', 'staff'],
};
/** Browser-only domain logic: clone inputs, validate current identity, and never call a backend. */
export function applyAction(state: DemoState, userId: string, action: DemoAction): DemoState {
    const actor = state.users.find(user => user.id === userId) ?? fail('Demo identity was not found.');
    if (!actor.active)
        fail('This demo identity is inactive.');
    if (!action || !Object.hasOwn(permissions, action.type) || !permissions[action.type]?.includes(actor.role))
        fail('You do not have permission for this action.');
    if (!action.payload || typeof action.payload !== 'object' || Array.isArray(action.payload))
        fail('Action fields are required.');
    const s = structuredClone(state), p = action.payload;
    let description = '';
    switch (action.type) {
        case 'profile.save': {
            const user = find(s.users, userId, 'User');
            user.college = text(p, 'college', 200, true);
            user.bio = text(p, 'bio', 2000, true);
            description = 'Updated own fictional learner profile.';
            break;
        }
        case 'enroll': {
            const course = find(s.courses, text(p, 'courseId', 160), 'Course');
            if (!course.published)
                fail('Course must be published before enrollment.');
            if (!s.enrollments.some(e => e.userId === userId && e.courseId === course.id))
                s.enrollments.push({ userId, courseId: course.id });
            description = `Enrolled in ${course.title}.`;
            break;
        }
        case 'complete': {
            const lesson = lessonContext(s, userId, text(p, 'lessonId', 160));
            if (!s.completions.some(c => c.userId === userId && c.lessonId === lesson.id))
                s.completions.push({ userId, lessonId: lesson.id });
            description = `Completed demo lesson: ${lesson.title}.`;
            break;
        }
        case 'submit': {
            const lesson = lessonContext(s, userId, text(p, 'lessonId', 160));
            if (!lesson.assignment.trim())
                fail('This lesson has no assignment.');
            const content = text(p, 'content', 10000);
            const existing = s.submissions.find(x => x.userId === userId && x.lessonId === lesson.id);
            save(s.submissions, { id: existing?.id ?? globalThis.crypto.randomUUID(), userId, lessonId: lesson.id, content, feedback: '', status: 'submitted' });
            description = `Submitted own demo assignment: ${lesson.title}.`;
            break;
        }
        case 'submission.review': {
            const submission = find(s.submissions, text(p, 'id', 160), 'Submission');
            submission.feedback = text(p, 'feedback', 5000);
            submission.status = 'reviewed';
            description = 'Reviewed a fictional student assignment.';
            break;
        }
        case 'course.save': {
            const id = recordId(s.courses, p);
            const image = text(p, 'image', 200, true) || findDefaultImage(s.courses, id);
            if (!images.includes(image))
                fail('Choose an approved archive image.');
            save(s.courses, { id, title: text(p, 'title', 200), category: text(p, 'category', 80), description: text(p, 'description', 5000), published: flag(p, 'published'), image });
            description = 'Saved demo course details.';
            break;
        }
        case 'module.save': {
            const id = recordId(s.modules, p), courseId = text(p, 'courseId', 160);
            find(s.courses, courseId, 'Course');
            const existing = s.modules.find(x => x.id === id);
            if (existing && existing.courseId !== courseId)
                fail('Cannot move an existing module to a different course.');
            const position = integer(p, 'position');
            if (position > 1000)
                fail('Module position exceeds the demo limit.');
            if (s.modules.some(x => x.id !== id && x.courseId === courseId && x.position === position))
                fail('Another module already uses this position.');
            save(s.modules, { id, courseId, title: text(p, 'title', 200), position });
            description = 'Saved demo course module.';
            break;
        }
        case 'lesson.save': {
            const id = recordId(s.lessons, p), moduleId = text(p, 'moduleId', 160);
            find(s.modules, moduleId, 'Module');
            const existing = s.lessons.find(x => x.id === id);
            if (existing && existing.moduleId !== moduleId)
                fail('Cannot move an existing lesson to a different module.');
            const position = integer(p, 'position');
            if (position > 1000)
                fail('Lesson position exceeds the demo limit.');
            if (s.lessons.some(x => x.id !== id && x.moduleId === moduleId && x.position === position))
                fail('Another lesson already uses this position.');
            save(s.lessons, { id, moduleId, title: text(p, 'title', 200), content: text(p, 'content', 20000), position, assignment: text(p, 'assignment', 5000, true) });
            description = 'Saved demo lesson and assignment.';
            break;
        }
        case 'opportunity.save': {
            const id = recordId(s.opportunities, p);
            save(s.opportunities, { id, title: text(p, 'title', 200), company: text(p, 'company', 200), location: text(p, 'location', 200), mode: text(p, 'mode', 80), description: text(p, 'description', 5000), open: flag(p, 'open') });
            description = 'Saved fictional internship opportunity.';
            break;
        }
        case 'apply': {
            const opportunity = find(s.opportunities, text(p, 'opportunityId', 160), 'Opportunity');
            if (!opportunity.open)
                fail('This demo opportunity is closed.');
            if (s.applications.some(x => x.studentId === userId && x.opportunityId === opportunity.id))
                fail('You have already applied to this demo opportunity.');
            s.applications.push({ id: globalThis.crypto.randomUUID(), studentId: userId, opportunityId: opportunity.id, motivation: text(p, 'motivation', 5000), status: 'applied', interviewAt: '', notes: '' });
            description = `Applied to ${opportunity.title}.`;
            break;
        }
        case 'application.update': {
            const application = find(s.applications, text(p, 'id', 160), 'Application');
            const status = choice(p, 'status', ['applied', 'screening', 'interview', 'offered', 'placed', 'rejected', 'withdrawn'] as const);
            const transitions: Record<DemoApplication['status'], DemoApplication['status'][]> = { applied: ['screening', 'interview', 'rejected'], screening: ['interview', 'rejected'], interview: ['offered', 'rejected'], offered: ['placed', 'rejected'], placed: [], rejected: [], withdrawn: [] };
            if (status !== application.status && !transitions[application.status].includes(status))
                fail('Invalid application status transition.');
            if (status === 'interview')
                application.interviewAt = date({ ...p, interviewAt: p.interviewAt ?? application.interviewAt }, 'interviewAt', true);
            else if (p.interviewAt !== undefined)
                application.interviewAt = p.interviewAt === '' ? '' : date(p, 'interviewAt', true);
            application.status = status;
            application.notes = p.notes === undefined ? application.notes : text(p, 'notes', 5000, true);
            description = `Updated fictional application to ${status}.`;
            break;
        }
        case 'application.withdraw': {
            const application = find(s.applications, text(p, 'id', 160), 'Application');
            if (application.studentId !== userId)
                fail('You can only withdraw your own application.');
            if (!['applied', 'screening'].includes(application.status))
                fail('You can only withdraw an applied or screening application.');
            application.status = 'withdrawn';
            description = 'Withdrew own fictional application.';
            break;
        }
        case 'lead.save': {
            const id = recordId(s.leads, p);
            save(s.leads, { id, name: text(p, 'name', 200), organization: text(p, 'organization', 200), email: email(p), stage: choice(p, 'stage', ['new', 'qualified', 'proposal', 'won', 'lost'] as const), value: integer(p, 'value', true), notes: text(p, 'notes', 5000, true), kind: choice(p, 'kind', ['employer', 'college', 'student'] as const) });
            description = 'Saved fictional business lead; no message sent.';
            break;
        }
        case 'invoice.save': {
            const id = recordId(s.invoices, p);
            const status = choice(p, 'status', ['draft', 'sent', 'paid', 'void'] as const), existing = s.invoices.find(x => x.id === id);
            const transitions: Record<DemoInvoice['status'], DemoInvoice['status'][]> = { draft: ['sent', 'void'], sent: ['paid', 'void'], paid: [], void: [] };
            if (existing && status !== existing.status && !transitions[existing.status].includes(status))
                fail('Invalid invoice status transition.');
            if (!existing && status !== 'draft')
                fail('A new invoice must start in draft; invalid transition.');
            const record = { id, customer: text(p, 'customer', 200), description: text(p, 'description', 2000), amount: integer(p, 'amount'), dueDate: date(p, 'dueDate'), status };
            if (existing && ['paid', 'void'].includes(existing.status) && JSON.stringify(existing) !== JSON.stringify(record))
                fail('Final invoice records cannot be changed.');
            save(s.invoices, record);
            description = `Recorded demo invoice as ${status}; no money moved or invoice sent.`;
            break;
        }
        case 'expense.save': {
            const id = recordId(s.expenses, p);
            save(s.expenses, { id, description: text(p, 'description', 2000), category: text(p, 'category', 100), amount: integer(p, 'amount'), date: date(p, 'date') });
            description = 'Recorded fictional expense in whole INR rupees.';
            break;
        }
        case 'project.save': {
            const id = recordId(s.projects, p), ownerId = text(p, 'ownerId', 160);
            const owner = find(s.users, ownerId, 'Project owner');
            if (!owner.active)
                fail('Project owner must be active.');
            save(s.projects, { id, title: text(p, 'title', 200), ownerId, status: choice(p, 'status', ['planned', 'in-progress', 'review', 'complete'] as const), priority: choice(p, 'priority', ['normal', 'high'] as const), notes: text(p, 'notes', 5000, true) });
            description = 'Saved fictional technical delivery project.';
            break;
        }
        case 'user.save': {
            const id = recordId(s.users, p), existing = s.users.find(x => x.id === id);
            const role = choice(p, 'role', roles);
            if (actor.role === 'staff' && (role !== 'student' || (existing && existing.role !== 'student')))
                fail('Academic staff may only manage student identities.');
            const active = flag(p, 'active');
            if (existing?.role === 'admin' && existing.active && (!active || role !== 'admin') && !s.users.some(x => x.id !== id && x.role === 'admin' && x.active))
                fail('Cannot disable or demote the last active administrator.');
            const address = email(p);
            if (s.users.some(x => x.id !== id && x.email.toLowerCase() === address))
                fail('This synthetic email is already in use.');
            save(s.users, { id, name: text(p, 'name', 200), email: address, role, active, college: text(p, 'college', 200, true), bio: text(p, 'bio', 2000, true) });
            description = 'Saved synthetic demo identity and access.';
            break;
        }
        default: return fail('Unknown demo action.');
    }
    s.events.push({ id: globalThis.crypto.randomUUID(), actorId: userId, description, at: new Date().toISOString() });
    return s;
}
function findDefaultImage(courses: DemoCourse[], id: string): string { return courses.find(c => c.id === id)?.image ?? images[0]; }
