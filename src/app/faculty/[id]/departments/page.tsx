import { columns } from "./columns";
import { DataTable } from "./data-table";
import departments from "@/database/seeds/data/department/department.json"

export default function Programs() {

	return <div className="mt-4 px-6">
		<DataTable columns={columns} data={departments} />
	</div>
}
