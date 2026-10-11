import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DemoApp from './demo-app';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {title:'APK Infotech | Careers & learning',robots:{index:false,follow:false}};
export default function DemoPage(){if(process.env.PORTAL_DEMO_MODE!=='true')notFound();return <DemoApp/>;}
