import { getDb } from '../src/lib/portal/store.ts';
// Explicit, opt-in synthetic content. Creates no accounts or credentials.
const db=getDb();
db.exec('BEGIN IMMEDIATE');
try {
 for(const [id,title,description] of [
 ['demo-web-internship','Demo: web project internship','Synthetic practice opportunity. Build a small accessible web page and explain your decisions. This is not a real vacancy.'],
 ['demo-testing-internship','Demo: software testing internship','Synthetic practice opportunity. Explore a sample application, record reproducible defects and propose checks. This is not a real vacancy.']
 ]) db.prepare('INSERT OR IGNORE INTO internships VALUES(?,?,?,?,?,?,?,?,?)').run(id,title,description,'Demo workspace','Practice only','Self-paced practice','2099-12-31','published',1);
 const courses=[
 {id:'demo-web-foundations',title:'Demo: accessible web foundations',description:'A short synthetic practice course covering semantic HTML and accessible forms.',lessons:[
 ['Semantic page structure','Use one main landmark for the primary content. Organize sections with headings in a logical order. Use a button for an action and a link for navigation. Meaningful elements help assistive technology understand a page.','Sketch the headings and landmarks for a student profile page. Explain your choices.'],
 ['Accessible forms','Associate every input with a visible label. State required fields and show errors next to the relevant input. Preserve entered values after a failed submission. Test the form using only the keyboard.','Write a checklist for testing a registration form with a keyboard.']
 ]},
 {id:'demo-testing-foundations',title:'Demo: practical testing foundations',description:'A short synthetic practice course covering reproducible bug reports and boundary checks.',lessons:[
 ['Reproducible reports','Record the environment, exact steps, expected behavior and actual behavior. Reduce the steps until the issue is easy to repeat. Include useful evidence without passwords or personal information.','Write a sample bug report for a form that loses entered data after an error.'],
 ['Boundary checks','Test an ordinary valid value, the smallest and largest permitted values, and values just outside the limits. Include empty input, whitespace and invalid types. Check both the visible error and whether stored data changed.','List boundary checks for an assignment field limited to 10000 characters.']
 ]}
 ];
 for(const course of courses){
 db.prepare('INSERT OR IGNORE INTO courses VALUES(?,?,?,?,?)').run(course.id,course.title,course.description,'published',1);
 const moduleId=`${course.id}-module`;
 db.prepare('INSERT OR IGNORE INTO modules VALUES(?,?,?,?)').run(moduleId,course.id,'Practice foundations',1);
 course.lessons.forEach(([title,content,assignment],index)=>db.prepare('INSERT OR IGNORE INTO lessons VALUES(?,?,?,?,?,?)').run(`${course.id}-lesson-${index+1}`,moduleId,title,content,index+1,assignment));
 }
 db.exec('COMMIT'); console.log('Synthetic demo content is ready. No accounts or passwords were created.');
}catch(error){db.exec('ROLLBACK');throw error;}
