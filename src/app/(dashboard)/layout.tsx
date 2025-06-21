import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props{
    children:React.ReactNode;
}

const Layout =({children}:Props)=>{
    return(
        <SidebarProvider>
            <DashboardSidebar/>
            <SidebarInset className="flex flex-col h-screen">
                <DashboardNavbar/>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Layout;