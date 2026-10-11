export type DemoRole = 'student' | 'staff' | 'hr' | 'cto' | 'admin' | 'cfo' | 'cbo';
export type DemoUser = {id:string;name:string;email:string;role:DemoRole;active:boolean;college:string;bio:string};
export type DemoCourse = {id:string;title:string;category:string;description:string;published:boolean;image:string};
export type DemoModule = {id:string;courseId:string;title:string;position:number};
export type DemoLesson = {id:string;moduleId:string;title:string;content:string;position:number;assignment:string};
export type DemoEnrollment = {userId:string;courseId:string};
export type DemoCompletion = {userId:string;lessonId:string};
export type DemoSubmission = {id:string;userId:string;lessonId:string;content:string;feedback:string;status:'submitted'|'reviewed'};
export type DemoOpportunity = {id:string;title:string;company:string;location:string;mode:string;description:string;open:boolean};
export type DemoApplication = {id:string;studentId:string;opportunityId:string;motivation:string;status:'applied'|'screening'|'interview'|'offered'|'placed'|'rejected'|'withdrawn';interviewAt:string;notes:string};
export type DemoLead = {id:string;name:string;organization:string;email:string;stage:'new'|'qualified'|'proposal'|'won'|'lost';value:number;notes:string;kind:'employer'|'college'|'student'};
export type DemoInvoice = {id:string;customer:string;description:string;amount:number;dueDate:string;status:'draft'|'sent'|'paid'|'void'};
export type DemoExpense = {id:string;description:string;category:string;amount:number;date:string};
export type DemoProject = {id:string;title:string;ownerId:string;status:'planned'|'in-progress'|'review'|'complete';priority:'normal'|'high';notes:string};
export type DemoEvent = {id:string;actorId:string;description:string;at:string};
export type DemoState = {version:1;users:DemoUser[];courses:DemoCourse[];modules:DemoModule[];lessons:DemoLesson[];enrollments:DemoEnrollment[];completions:DemoCompletion[];submissions:DemoSubmission[];opportunities:DemoOpportunity[];applications:DemoApplication[];leads:DemoLead[];invoices:DemoInvoice[];expenses:DemoExpense[];projects:DemoProject[];events:DemoEvent[]};
export type DemoAction = {type:'profile.save'|'enroll'|'complete'|'submit'|'submission.review'|'course.save'|'module.save'|'lesson.save'|'opportunity.save'|'apply'|'application.update'|'application.withdraw'|'lead.save'|'invoice.save'|'expense.save'|'project.save'|'user.save';payload:Record<string,unknown>};
export type DemoPanelProps = {state:DemoState;user:DemoUser;dispatch:(action:DemoAction)=>boolean};
export const demoRoles: {id:DemoRole;title:string;description:string}[] = [
{id:'student',title:'Student',description:'Learn, apply and build your career'},
{id:'staff',title:'Academics',description:'Courses, curriculum and student progress'},
{id:'hr',title:'Placement & HR',description:'Candidates, interviews and placements'},
{id:'cto',title:'CTO',description:'Technical delivery and team operations'},
{id:'admin',title:'Administrator',description:'People, access and activity'},
{id:'cfo',title:'Finance',description:'Demo invoices, receivables and expenses'},
{id:'cbo',title:'Business',description:'Leads, opportunities and partnerships'}];
