import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FacultyPage() {
    return <main className="mt-20">
        <h3 className="text-2xl font-bold">List of Faculty</h3>
        <div className="mt-10">
            <Button asChild size="sm">
                <Link href="/faculty/fet">Faculty of Engineering & Technology</Link>
            </Button>
        </div>
    </main>
}