'use client'

import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                Logo
            </SidebarHeader>
        </Sidebar>
    );
}