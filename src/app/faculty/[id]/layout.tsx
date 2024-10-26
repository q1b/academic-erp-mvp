import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getFaculty } from "@/database/actions/faculty";
import { SidebarNavMenu } from "./nav-menu";

type Params = Promise<{ id: string }>

export default async function FacultyLayout(props: {
    children: React.ReactNode
    params: Params
  }) {
    const { id:facultyId } = await props.params;
    const faculty = await getFaculty(facultyId);
    return (
        <SidebarProvider>
            <Sidebar variant="inset">
                <SidebarHeader>
                    {faculty?.name}
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarNavMenu/>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <header className="h-16 flex shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="ml-1"/>
                    </div>
                </header>
                {props.children}
            </SidebarInset>
        </SidebarProvider>
    )
}