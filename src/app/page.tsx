import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Sri Sri University | ERP System</h1>
      <div className="mt-4">
        <Link href="/academic-division/fet">Engineering and Technology</Link>
      </div>
    </main>
  );
}
