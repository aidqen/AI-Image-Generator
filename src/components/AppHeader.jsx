'use client'

import { Menu } from "lucide-react";
import { Logo } from "./svgs/Logo";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "./ui/sidebar";
import { toggleSidebar } from "@/store/actions/system.actions";

export function AppHeader() {
    const isMobile = useIsMobile();

    if (!isMobile) return null;

    function onToggleSidebar() {
        toggleSidebar()
    }

    return (
        <header className="flex flex-row items-center justify-between w-full h-[72px] px-4 border-b-1 border-[#212936]">
            <Logo />
            <button className="p-[8px] bg-[#7C71FF] rounded-lg" onClick={onToggleSidebar}>
                <Menu className="text-white"/>
            </button>
        </header>
    )
}