import { columns } from "./columns";
import { DataTable } from "./data-table";
import departments from "@/database/seeds/data/department/department.json"

export default function Programs() {

	return <div>
		<DataTable columns={columns} data={departments} />
	</div>
}
