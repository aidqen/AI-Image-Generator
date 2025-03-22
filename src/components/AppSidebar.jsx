'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Logo } from "./svgs/Logo"
import { Folder, Grid2x2, History, Sparkles, X } from "lucide-react"
import { useSelector } from "react-redux"
import { TOGGLE_SIDEBAR } from "@/store/reducers/system.reducer"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { toggleSidebar } from "@/store/actions/system.actions"
import Link from "next/link"

export function AppSidebar() {
    const isMobile = useIsMobile();
    const open = useSelector((state) => state.systemModule.isSidebarOpen)
    const items = [
        {
            title: "Generate",
            url: "/generate",
            icon: (<Sparkles style={{ width: '22px', height: '20px' }} />),
        },
        {
            title: "Feed",
            url: "/feed",
            icon: (<Grid2x2 style={{ width: '22px', height: '20px' }} />),
        },
        {
            title: "History",
            url: "/history",
            icon: (<History style={{ width: '22px', height: '20px' }} />),
        },
        {
            title: "Collection",
            url: "/collection",
            icon: (<Folder style={{ width: '22px', height: '20px' }} />),
        },
    ]

    function onToggleSidebar() {
        toggleSidebar()
    }
    return (
        <Sidebar open={open} side={`${isMobile ? 'right' : 'left'}`} className={'bg-[#121826]'}>
            <SidebarHeader>
                {
                    isMobile
                        ? <button className="text-white p-[8px] rounded-lg bg-[#212936] mb-4 w-max"
                            onClick={onToggleSidebar}>
                            <X />
                        </button>
                        : <Link href={'/'}><Logo /></Link>
                }
            </SidebarHeader>
            <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className='flex flex-col gap-[16px]'>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className={'p-[8px hover:bg-[#7C71FF] active:bg-[#7C71FF] rounded-lg transition-colors'}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="text-white flex flex-row items-center gap-[12px]">
                                            {item.icon}
                                            <span className="color-[#E4E4E7] text-[14px] tracking-[-0.49px]">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}