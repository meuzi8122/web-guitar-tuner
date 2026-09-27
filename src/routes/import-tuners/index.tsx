import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCustomTuners } from "#/features/tuner/hooks/use-custom-tuners";

export const Route = createFileRoute("/import-tuners/")({
	component: ImportTunerPage,
});

function ImportTunerPage() {
	const navigate = Route.useNavigate();

	const [file, setFile] = useState<File | null>(null);
	const { importCustomTuners } = useCustomTuners();

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (file) setFile(file);
	};

	const handleSubmit = async () => {
		if (file) {
			await importCustomTuners({ file });
			alert("チューナーをインポートしました。");
			navigate({ to: "/tuners" });
		}
	};

	return (
		<div className="container mx-auto flex flex-col space-y-3 items-center p-6">
			<h1>TAB譜からチューナーをインポート</h1>
			<fieldset className="fieldset">
				<input
					type="file"
					className="file-input"
					accept=".gp,.gpx,.gp4,.gp5"
					onChange={handleFileChange}
				/>
			</fieldset>
			<button
				type="button"
				onClick={handleSubmit}
				className="btn btn-primary"
				disabled={!file}
			>
				インポート
			</button>
		</div>
	);
}
