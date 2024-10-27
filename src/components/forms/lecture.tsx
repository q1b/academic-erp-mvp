import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import Form from 'next/form';
import programs from "@/database/seeds/data/department/program.json"
import courses from "@/database/seeds/data/department/course.json"

export function NewLectureForm() {
    return (
        <Form action=''>
            <div className="grid gap-4">
                {/* <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right"> Faculty of </Label>
                    <Select>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a Academic Division" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="b.tech">Engineering & Technology</SelectItem>
                        </SelectContent>
                    </Select>
                </div> */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right"> Batch </Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="20XX" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned" className="min-w-8">
                            <SelectItem value="2020">2020</SelectItem>
                            <SelectItem value="2021">2021</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right"> Department </Label>
                    <Select>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a Department" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                            <SelectItem value="b.tech">B.tech Computer Science</SelectItem>
                            <SelectItem value="bba">2021</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                        </SelectContent>
                    </Select>
                </div> */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right"> Program </Label>
                    <Select>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a Program" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                            {programs.map((program) => (
                                <SelectItem key={program['short-name']} value={program["short-name"]}>{program["short-name"]}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right"> Course </Label>
                    <Select>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a Course" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                            {courses.map((course) => (
                                <SelectItem key={course['name']} value={course["name"]}>{course["name"]}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </Form>
    )
}