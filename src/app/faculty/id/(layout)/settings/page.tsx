export default function Settings() {
	return <form className="w-full max-w-xl flex flex-col gap-y-12 mt-20">
		<div>
			<label htmlFor="display-name" className="block text-sm font-medium leading-6 text-gray-900"
			>Display Name</label
			>
			<div className="mt-2">
				<input
					type="text"
					name="display-name"
					id="display-name"
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					placeholder="Faculty of ..."
				/>
			</div>
		</div>

		<div>
			<label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">About</label>
			<div className="mt-2">
				<textarea
					id="about"
					name="about"
					rows={3}
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				></textarea>
			</div>
			<p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences</p>
		</div>
	</form>
}