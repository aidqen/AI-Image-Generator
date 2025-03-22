'use client'

import { Provider } from "react-redux"
import { store } from "@/store/store"
import { SidebarProvider } from "./ui/sidebar"

export function Providers({ children }) {
    return (
        <Provider store={store}>
            <SidebarProvider>
                {children}
            </SidebarProvider>
        </Provider>
    )
}
