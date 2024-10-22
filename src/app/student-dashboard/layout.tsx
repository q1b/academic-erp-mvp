import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { CalendarIcon, ChevronDown, HomeIcon, ListTodoIcon } from "lucide-react";
import { NavUser } from "@/components/user-nav";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Home</BreadcrumbPage>
                    </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const classrooms = [
    {
      subject: 'Pattern Recognition & Anomaly Detection',
      program: 'B.Tech 7th (AIML)',
      teacher: 'Ms Aradhana Kar'
    },
    {
      subject: 'Deep Learning',
      program: 'B.Tech 7th (AIML)',
      teacher: 'Dr. Chinmaya Kumar Nayak'
    },
    {
      subject: 'Compiler Design',
      program: 'B.Tech 7th (AIML/DS/CSCD)',
      teacher: 'Ms Aradhana Kar'
    },
    {
      subject: 'Natural Language Processing & Machine Learning',
      program: 'B.Tech 7th (AIML)',
      teacher: 'Dr. Deepak Sahoo'
    },
    {
      subject: 'Applications of Machine Learning',
      program: 'B.Tech 7th (AIML)',
      teacher: 'Dr. Anil Kumar'
    }
  ]
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarContent className="gap-0">
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <HomeIcon />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <CalendarIcon />
                    <span>Calendar</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <ListTodoIcon />
                    <span>Todo</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            {classrooms.map((classroom) => (
              <a
                href="#"
                key={classroom.subject}
                className="flex flex-col items-start p-2 text-sm leading-tight hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <span className="font-medium">{classroom.subject}</span>
                <span className="text-xs mt-1">{classroom.program}</span>
                <div className="flex text-xs mt-0.5 w-full items-center gap-2">
                  <span>{classroom.teacher}</span>{" "}
                </div>
                {/* <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs"></span> */}
              </a>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: 'Sukhpreet Singh',
          email: 'sukhpreet.sbtcseai@srisriuniversity.edu.in',
          avatar: 'https://avatars.dicebear.com/api/avataaars/john-doe.svg',
        }} />
      </SidebarFooter>
    </Sidebar>
  )
}
