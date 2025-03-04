import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, signIn, signOut } from "@/lib/auth";
import { GraduationCapIcon, Info, LogOutIcon, Pencil, ShieldCheck, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { UserForm } from "@/atoms/user/ui";
import { seedDatabase } from "@/database/seeds";

function GoogleLogo() {
  return (
    <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ 'color': 'currentcolor' }}><path d="M8.15991 6.54543V9.64362H12.4654C12.2763 10.64 11.709 11.4837 10.8581 12.0509L13.4544 14.0655C14.9671 12.6692 15.8399 10.6182 15.8399 8.18188C15.8399 7.61461 15.789 7.06911 15.6944 6.54552L8.15991 6.54543Z" fill="#4285F4"></path>
      <path d="M3.6764 9.52268L3.09083 9.97093L1.01807 11.5855C2.33443 14.1963 5.03241 16 8.15966 16C10.3196 16 12.1305 15.2873 13.4542 14.0655L10.8578 12.0509C10.1451 12.5309 9.23598 12.8219 8.15966 12.8219C6.07967 12.8219 4.31245 11.4182 3.67967 9.5273L3.6764 9.52268Z" fill="#34A853"></path>
      <path d="M1.01803 4.41455C0.472607 5.49087 0.159912 6.70543 0.159912 7.99995C0.159912 9.29447 0.472607 10.509 1.01803 11.5854C1.01803 11.5926 3.6799 9.51991 3.6799 9.51991C3.5199 9.03991 3.42532 8.53085 3.42532 7.99987C3.42532 7.46889 3.5199 6.95983 3.6799 6.47983L1.01803 4.41455Z" fill="#FBBC05"></path>
      <path d="M8.15982 3.18545C9.33802 3.18545 10.3853 3.59271 11.2216 4.37818L13.5125 2.0873C12.1234 0.792777 10.3199 0 8.15982 0C5.03257 0 2.33443 1.79636 1.01807 4.41455L3.67985 6.48001C4.31254 4.58908 6.07983 3.18545 8.15982 3.18545Z" fill="#EA4335"></path></svg>
  )
}

async function User() {
  const user = await getCurrentUser();
  return (
    <form>
      {/* <pre>{JSON.stringify(user,null,2)}</pre> */}
      {!user ? (
        <Button formAction={async () => {
          "use server"
          await signIn()
        }}
          variant="outline">
          <GoogleLogo />
          Login with SSU Gmail
        </Button>
      ) : (
        <Card className="relative">
          <div className="absolute right-2 top-2">
            <UserForm name={user.name} picture={user.picture} />
          </div>
          <CardHeader>
            <Avatar className="size-24 mb-4">
              {user?.picture && <AvatarImage src={user?.picture} alt={user.name} />}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle>Hello, {user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start">
            <div className="flex items-start gap-x-1">
              <Button variant="ghost" size="sm" asChild>
                <Link href="faculty">
                  <ShieldCheck /> Admin
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="teacher-dashboard">
                  <User2Icon /> Teacher
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="student-dashboard">
                  <GraduationCapIcon /> Student
                </Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm" formAction={async () => {
              "use server"
              await signOut()
            }}
              variant="destructive">
              <LogOutIcon /> Sign Out
            </Button>
          </CardFooter>
        </Card>
      )
      }
    </form>
  )
}

type SearchParams = Promise<{ info: string }>

export default async function Home(props: {
  searchParams: SearchParams
}) {
  const { info } = await props.searchParams;
  return (
    <main className="min-h-screen flex flex-col items-center pt-20">
      <Image className="mb-10" width={192} height={192} src="/logo/srisriuniversity.png" alt="PWA" />
      <Suspense>
        <User />
      </Suspense>
      {info &&
        <>
          <div className="my-4"></div>
          <Alert>
            <Info className="w-4 h-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>{info}</AlertDescription>
          </Alert>
        </>}
    </main>
  );
}
