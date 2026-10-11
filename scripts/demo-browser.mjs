import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright');
const base=process.env.DEMO_BASE_URL||'http://localhost:3200';
const output=resolve(process.env.DEMO_SCREENSHOTS||'.data/demo-evidence');mkdirSync(output,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',error=>errors.push(error.message));
async function capture(name){await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0)});await page.waitForTimeout(180);await page.screenshot({path:output+'/'+name+'.png',fullPage:true});}
async function axe(){await page.addScriptTag({path:require.resolve('axe-core')});const result=await page.evaluate(()=>window.axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));assert.deepEqual(result.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[]);}
async function role(name){await page.getByRole('navigation',{name:'Demo role workspaces'}).getByRole('button',{name,exact:false}).click();await page.waitForTimeout(80);}
async function saved(){await page.getByRole('status').filter({hasText:'Saved to this demo session.'}).waitFor();assert.equal(await page.locator('.demo-error').count(),0,(await page.locator('.demo-error').allTextContents()).join(' '));}
try{
 await page.goto(base+'/demo');await page.getByRole('heading',{name:'Build skills.'}).waitFor();await axe();await capture('01-platform-home');
 await page.getByRole('button',{name:/Student Learn, apply/}).click();await page.getByRole('heading',{name:/Your next chapter/}).waitFor();await capture('02-student-dashboard');
 await page.getByRole('button',{name:'Profile',exact:true}).click();await page.getByLabel('College',{exact:true}).fill('Demo review college');await page.getByRole('button',{name:'Save profile',exact:true}).click();await saved();await page.reload();await page.getByRole('button',{name:'Profile',exact:true}).click();assert.equal(await page.getByLabel('College',{exact:true}).inputValue(),'Demo review college');
 await page.getByRole('button',{name:'Learning',exact:true}).click();await page.locator('details.academic-lesson').nth(1).locator('summary').click();await page.getByRole('button',{name:'Mark lesson complete',exact:true}).first().click();await saved();await page.getByLabel('Your response',{exact:true}).nth(1).fill('Synthetic evaluation response for the lesson.');await page.getByRole('button',{name:'Submit response',exact:true}).first().click();await saved();await axe();await capture('03-student-learning');
 await role('Academics');await page.getByRole('heading',{name:'Make room for learning.'}).waitFor();await axe();await capture('04-academic-workspace');
 await role('Placement & HR');await page.getByRole('button',{name:'Review Demo Asha — learner',exact:true}).click();await page.locator('select[name=status]').selectOption('screening');await page.getByLabel('Placement team notes').fill('Synthetic portfolio reviewed.');await page.getByRole('button',{name:'Save candidate update'}).click();await saved();await axe();await capture('05-placement-office');
 await role('CTO');await page.getByLabel('Project title',{exact:true}).fill('Demo browser verification project');await page.getByLabel('Delivery owner').selectOption('demo-cto');await page.getByRole('button',{name:'Save project',exact:true}).click();await saved();await page.getByText('Demo browser verification project',{exact:true}).waitFor();await axe();await capture('06-technology');
 await role('Administrator');await page.getByRole('button',{name:'Deactivate Demo Arjun — learner'}).click();await saved();await page.getByRole('button',{name:'Activate Demo Arjun — learner'}).waitFor();await axe();await capture('07-administration');
 await role('Finance');await page.getByRole('button',{name:'Mark paid (demo)',exact:true}).first().click();await saved();await axe();await capture('08-finance');
 await role('Business');await page.getByRole('button',{name:'Create lead',exact:true}).click();await page.getByLabel('Demo contact name').fill('Demo browser contact');await page.getByLabel('Demo organization').fill('Demo browser employer');await page.getByLabel('Demo email (use example.test)').fill('review@demo.example.test');await page.getByRole('button',{name:'Save lead',exact:true}).click();await saved();await page.getByText('Demo browser employer',{exact:true}).waitFor();await axe();await capture('09-business-crm');
 await page.setViewportSize({width:390,height:844});await axe();await capture('10-mobile-crm');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,'mobile overflow');
 await role('Student');await page.getByRole('button',{name:'Internships',exact:true}).click();await page.getByText('screening',{exact:true}).first().waitFor();await axe();await capture('11-mobile-student');
 await page.getByRole('button',{name:'Reset demo',exact:true}).click();await page.getByRole('dialog').waitFor();await page.keyboard.press('Escape');assert.equal(await page.getByRole('dialog').count(),0);await page.getByRole('button',{name:'Reset demo',exact:true}).click();await page.getByRole('button',{name:'Reset sample data',exact:true}).click();await page.getByRole('heading',{name:'Build skills.'}).waitFor();await capture('12-mobile-home');
 assert.deepEqual(errors,[]);console.log('PASS: all seven demo roles, persisted profile, learning completion/submission, HR review, CTO create, admin activation, CFO simulation, CRM create, cross-role student status, mobile overflow, reset/Escape and axe checks.');
}finally{await browser.close();}
