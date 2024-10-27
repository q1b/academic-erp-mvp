import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import courses from "@/database/seeds/data/department/course.json"
import { PlusCircleIcon, PlusIcon } from "lucide-react";

export default function Programs() {

	return <div>
		<div className="sm:flex sm:items-center mb-8 px-0.5">
			<div className="sm:flex-auto">
				<h1 className="text-base font-semibold leading-6 text-gray-900">Courses</h1>
				<p className="mt-2 text-sm text-gray-700">A list of all the courses within this faculty including their name, code.</p>
			</div>
			<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
				<Button>Add Course <PlusIcon/> </Button>
			</div>
		</div>
		<DataTable columns={columns} data={courses} />
	</div>
}
