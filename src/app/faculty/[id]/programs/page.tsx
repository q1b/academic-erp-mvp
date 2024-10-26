import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Programs() {
	const programs = [
		{
			id: 'btcseai',
			name: 'B. Tech. (Computer Science & Engineering) with Specialization Artificial Intelligence & Machine Learning Integrated with IBM',
		},
		{
			id: 'btcseds',
			name: 'B.Tech. (Computer Science & Engineering) with Specialization Data Science Integrated with IBM.',
		},
		{
			id: 'btcsecs',
			name: 'B.Tech. (Computer Science & Engineering) with Specialization Cyber Security & Cyber Defence Integrated with TCS & Cyber Dojo',
		},
		{
			id: 'bjsp',
			name: 'B.Tech. (Computer Science & Engineering ) with Specialization JAVA Full Stack Integrated with L&T',
		},
		{
			id: 'bece',
			name: 'B. Tech. (Electronics & Communication Engineering) with Specialization VLSI Chip Design Integrated with INTEL & IESA',
		}
	];
	return <div className="mt-4 px-6">
		<DataTable columns={columns} data={programs} />
	</div>
}
