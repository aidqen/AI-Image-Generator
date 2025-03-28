import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Logo } from "./svgs/Logo"
import { toggleSidebar } from "@/store/actions/system.actions"
import Link from "next/link"
import { useSelector } from "react-redux"
import { UserMenu } from "./UserMenu"

export function DesktopSidebar({ items }) {
    const open = useSelector((state) => state.systemModule.isSidebarOpen)
    function onToggleSidebar() {
        toggleSidebar()
    }

    return (
        <Sidebar open={open} side="left" className={'bg-[#121826]'}>
            <SidebarHeader className="flex justify-between items-center px-4">
                <Link href={'/'}><Logo /></Link>
                <UserMenu />
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