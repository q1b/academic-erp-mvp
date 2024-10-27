import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Settings() {
	return <form className="w-full max-w-xl flex flex-col gap-y-12">
		<div>
			<Label htmlFor="display-name">Display Name</Label>
			<Input
				type="text"
				name="display-name"
				id="display-name"
				className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				placeholder="Faculty of ..."
			/>
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