export default function Programs() {
	const programs = [
		{
			name: 'B. Tech. (Computer Science & Engineering) with Specialization Artificial Intelligence & Machine Learning Integrated with IBM',
			code: 'btcseai',
		},
		{
			name: 'B.Tech. (Computer Science & Engineering) with Specialization Data Science Integrated with IBM.',
			code: 'btcseds',
		},
		{
			name: 'B.Tech. (Computer Science & Engineering) with Specialization Cyber Security & Cyber Defence Integrated with TCS & Cyber Dojo',
			code: 'btcsecs',
		},
		{
			name: 'B.Tech. (Computer Science & Engineering ) with Specialization JAVA Full Stack Integrated with L&T',
			code: 'bjsp',
		},
		{
			name: 'B. Tech. (Electronics & Communication Engineering) with Specialization VLSI Chip Design Integrated with INTEL & IESA',
			code: 'bece',
		}
	];
	return <div className="grid grid-cols-3 gap-6 mt-20">
		{programs.map(program => <a key={program.code} href={`./programs/${program.code}`}>
			{program.name}
		</a>)}
	</div>
}
