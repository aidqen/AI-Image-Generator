'use client'

import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNavigationFooter({ items }) {
    const isMobile = useIsMobile();
    const pathname = usePathname();

    if (!isMobile) return null;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 h-[64px]">
            <div 
            className="absolute bottom-0 h-[100px] w-full backdrop-blur-sm nav-blur-bg pointer-events-none bg-black/40 bg-opacity-90" 
            style={{mask: 'linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.99) 14%, rgba(0, 0, 0, 0.953) 26.2%, rgba(0, 0, 0, 0.894) 36.8%, rgba(0, 0, 0, 0.824) 45.9%, rgba(0, 0, 0, 0.74) 53.7%, rgba(0, 0, 0, 0.647) 60.4%, rgba(0, 0, 0, 0.55) 66.2%, rgba(0, 0, 0, 0.45) 71.2%, rgba(0, 0, 0, 0.353) 75.6%, rgba(0, 0, 0, 0.26) 79.6%, rgba(0, 0, 0, 0.176) 83.4%, rgba(0, 0, 0, 0.106) 87.2%, rgba(0, 0, 0, 0.047) 91.1%, rgba(0, 0, 0, 0.01) 95.3%, rgba(0, 0, 0, 0) 100%)', WebkitMask: 'linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.99) 14%, rgba(0, 0, 0, 0.953) 26.2%, rgba(0, 0, 0, 0.894) 36.8%, rgba(0, 0, 0, 0.824) 45.9%, rgba(0, 0, 0, 0.74) 53.7%, rgba(0, 0, 0, 0.647) 60.4%, rgba(0, 0, 0, 0.55) 66.2%, rgba(0, 0, 0, 0.45) 71.2%, rgba(0, 0, 0, 0.353) 75.6%, rgba(0, 0, 0, 0.26) 79.6%, rgba(0, 0, 0, 0.176) 83.4%, rgba(0, 0, 0, 0.106) 87.2%, rgba(0, 0, 0, 0.047) 91.1%, rgba(0, 0, 0, 0.01) 95.3%, rgba(0, 0, 0, 0) 100%)'}} 
            />
            <div className="relative bottom-0 h-full border-0 px-6 py-2">
                <div className="flex justify-between h-full items-center w-full">
                    {items.map((item) => {
                        const isActive = pathname === item.url;
                        return (
                            <Link
                                key={item.title}
                                href={item.url}
                                className="flex flex-col items-center gap-1.5"
                            >
                                <div className={`p-1.5 rounded-lg transition-colors  ${isActive ? 'text-[#f2330d]' : 'text-[#8f94a3]'}`}>
                                    {item.icon}
                                </div>
                                <span className={`text-[11px] font-medium ${isActive ? 'text-white' : 'text-[#6C727F]'}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}