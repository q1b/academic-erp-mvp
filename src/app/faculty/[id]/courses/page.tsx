import { columns } from "./columns";
import { DataTable } from "./data-table";
import courses from "@/database/seeds/data/department/course.json"

export default function Programs() {

	return <div className="mt-4 px-6">
		<DataTable columns={columns} data={courses} />
	</div>
}
