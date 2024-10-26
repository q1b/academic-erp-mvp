import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfessorListFromFaculty } from "@/database/actions/professor";

type Params = Promise<{ id: string }>


export default async function Page({ params }: { params: Params }) {
    const professorList = await getProfessorListFromFaculty((await params).id);
    return (
        <div className="px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-2 gap-12">
                {professorList.map(professor => (
                    <div className="flex flex-col gap-y-1 items-center" key={professor.id}>
                        <Avatar className="size-28 mb-4">
                            <AvatarFallback />
                            {professor.user.picture && <AvatarImage src={professor.user.picture} alt={`${professor.user.name} Photo`} />}
                        </Avatar>
                        <h3 className="text-xl mb-1 leading-none tracking-tight font-medium text-center">{professor.user.name}</h3>
                        <span className="text-sm mb-1 text-muted-foreground">{professor.user.email}</span>
                        <Badge>{professor.designation || "professor"}</Badge>
                    </div>
                ))}
            </div>
        </div>
    )
}