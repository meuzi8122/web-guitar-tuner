import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { TrashIcon } from "#/components/icons/trash-icon";
import { useCustomTuners } from "#/features/tuner/hooks/use-custom-tuners";

export const Route = createFileRoute("/tuners/")({
	component: TunerListPage,
});

function TunerListPage() {
	const [keyword, setKeyword] = useState("");

	const { customTuners, deleteCustomTuner } = useCustomTuners({ keyword });

	const navigate = useNavigate();

	const handleRowClick = (id: string) => {
		navigate({
			to: "/tuners/$id",
			params: { id },
		});
	};

	return (
		<div className="container mx-auto p-4 flex flex-col space-y-3">
			<h1 className="text-xl font-bold">Myチューナー</h1>
			<input
				type="text"
				placeholder="ラベルで絞り込む"
				className="input"
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th>ラベル</th>
							<th>楽器</th>
							<th>チューニング</th>
						</tr>
					</thead>
					<tbody>
						{customTuners.map((tuner) => (
							<tr
								key={tuner.id}
								className="hover:bg-base-300 hover:cursor-pointer"
								onClick={() => {
									handleRowClick(tuner.id);
								}}
							>
								<td>{tuner.name}</td>
								<td>6弦ギター</td>
								<td>{tuner.tunings.map((tuning) => tuning.note).join("-")}</td>
								<td>
									<button
										type="button"
										className="btn btn-ghost"
										onClick={(event) => {
											event.stopPropagation();
											deleteCustomTuner({ id: tuner.id });
										}}
									>
										<TrashIcon />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
