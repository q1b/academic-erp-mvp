import { NavLinks } from "./nav-links";
import { UserNav } from "@/components/user-nav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <header className="px-3 py-2 w-full flex items-center gap-x-4">
            <a href="/academic-division/fet" className="font-medium">Faculty of Engineering & Technology</a>
            <NavLinks />
            <div className="grow"></div>
            <UserNav/>
        </header>
        <main className="w-full flex items-center flex-col max-w-screen-xl">{children}</main>
    </>
}