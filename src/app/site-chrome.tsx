'use client';
import {usePathname} from 'next/navigation';
import Navigation from './navigation';
import Footer from './footer';
export function SiteHeader({demoEnabled}:{demoEnabled:boolean}){const path=usePathname();return demoEnabled&&(path==='/'||path.startsWith('/demo'))?null:<Navigation/>;}
export function SiteFooter({demoEnabled}:{demoEnabled:boolean}){const path=usePathname();return demoEnabled&&(path==='/'||path.startsWith('/demo'))?null:<Footer/>;}
