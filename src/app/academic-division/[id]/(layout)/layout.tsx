import { NavLinks } from "./nav-links";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <header className="px-3 py-4 w-full flex items-center gap-x-4 border-b-2">
            <h1 className="font-medium">Faculty of Engineering & Technology</h1>
            <NavLinks />
            <div></div>
        </header>
        <main className="w-full flex items-center flex-col max-w-screen-xl">{children}</main>
    </>
}