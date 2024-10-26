export default function Faculties() {
	return <div className="mt-20">
		<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 w-full">
			<li
				className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center"
			>
				<div className="flex flex-1 flex-col p-8">
					<img
						className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
						src="https://srisriuniversity.edu.in/wp-content/uploads/2021/08/Prof.Dr_.-Rabi-N-Satpathy.jpg"
						alt=""
					/>
					<h3 className="mt-6 text-sm font-medium text-gray-900">Prof.(Dr.) Rabi N Satpathy</h3>
					<dl className="mt-1 flex flex-grow flex-col justify-between">
						<dt className="sr-only">Role</dt>
						<dd className="mt-3">
							<span
								className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
							>Dean</span
							>
						</dd>
					</dl>
				</div>
			</li>
		</ul>
	</div>

}
