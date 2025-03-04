import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, HomeIcon, InboxIcon, Plus } from "lucide-react";
import { NavUser } from "@/components/user-nav";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NewLectureForm } from "@/components/forms/lecture";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Button variant="secondary" size="sm">Homepage</Button>
            <Button variant="ghost" size="sm">Attendance</Button>
            <Button variant="ghost" size="sm">Assignments</Button>
            <Button variant="ghost" size="sm">Grades</Button>
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
                    <InboxIcon />
                    <span>Inbox</span>
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="pl-2 pt-3.5">Lectures</SidebarGroupLabel>
          <Dialog>
            <DialogTrigger asChild>
              <SidebarGroupAction title="Add Lecture" className="top-3">
                <Plus /> <span className="sr-only">Add Lectures</span>
              </SidebarGroupAction>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Lecture</DialogTitle>
                <DialogDescription>
                  Create a new lecture by filling the form below.
                </DialogDescription>
              </DialogHeader>
              <NewLectureForm />
              <DialogFooter>
                <Button type="submit">Create Lecture</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <SidebarSeparator className="bg-sidebar" />
          <SidebarGroupContent>
            {classrooms.map((classroom) => (
              <a
                href="#"
                key={classroom.subject}
                className="flex rounded-md flex-col items-start p-2 text-sm leading-tight hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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
