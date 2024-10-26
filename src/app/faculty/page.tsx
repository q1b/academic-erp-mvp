import { Button } from "@/components/ui/button";
import { getFacultyList } from "@/database/actions/faculty";
import Link from "next/link";
import { Suspense } from "react";

async function FacultyList() {
    const facultyList = await getFacultyList();
    return (
        <div className="mt-10">
            {facultyList.map(faculty => (
                <Button key={faculty.id} asChild size="sm">
                    <Link href={`/faculty/${faculty.id}`}>{faculty.name}</Link>
                </Button>
            ))}
        </div>
    )
}

export default function FacultyPage() {
    return <main className="mt-20">
        <h3 className="text-2xl font-bold">List of Faculty</h3>
        <Suspense fallback={<>Loading List of Faculties...</>}>
            <FacultyList />
        </Suspense>
    </main>
}