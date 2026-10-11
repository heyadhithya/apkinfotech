import type { Metadata } from 'next';
import Portal from './portal';
import './portal.css';
export const metadata: Metadata = {title:'Student & learning portal',robots:{index:false,follow:false}};
export default function PortalPage() { return <Portal />; }
