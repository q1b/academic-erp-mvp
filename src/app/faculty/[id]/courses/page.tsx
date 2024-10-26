import { columns } from "./columns";
import { DataTable } from "./data-table";
import courses from "@/database/seeds/data/department/course.json"

export default function Programs() {

	return <div>
		<DataTable columns={columns} data={courses} />
	</div>
}
