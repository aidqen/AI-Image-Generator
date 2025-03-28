'use client'
import { Compass, Folder, History, Sparkles } from "lucide-react"
import { useSelector } from "react-redux"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileNavigationFooter } from "./MobileNavigationFooter"
import { DesktopSidebar } from "./DesktopSidebar"

export function AppNavigation() {
    const isMobile = useIsMobile();
    
    const items = [
        {
            title: "Generate",
            url: "/generate",
            icon: (<Sparkles style={{ width: '28px', height: '28px' }} />),
        },
        {
            title: "Explore",
            url: "/explore",
            icon: (<Compass style={{ width: '28px', height: '28px' }} />),
        },
        {
            title: "History",
            url: "/history",
            icon: (<History style={{ width: '28px', height: '28px' }} />),
        },
        {
            title: "Collection",
            url: "/collection",
            icon: (<Folder style={{ width: '28px', height: '28px' }} />),
        },
    ]

    if (isMobile) {
        return <MobileNavigationFooter items={items} />
    } else {
        return <DesktopSidebar items={items} />
    }
}