import { createTuner } from "@chordbook/tuner";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DEFAULT_TUNERS } from "#/domains/entities/tuner";
import { useCustomTuners } from "#/hooks/use-custom-tuners";
import { FREQUENCIES, useTuning } from "#/hooks/use-tuning";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const { createCustomTuner } = useCustomTuners();

	const { currentTunings, initTuner, selectTuning, updateNote, updateDiff } =
		useTuning(DEFAULT_TUNERS[0].tunings);
	const selectedTuning = currentTunings.find((tuning) => tuning.selected);

	const [name, setName] = useState("");

	useEffect(() => {
		const tuner = createTuner({
			onNote(note) {
				if (selectedTuning) updateDiff({ frequency: note.frequency });
			},
		});

		tuner.start();
		return () => {
			tuner.stop();
		};
	}, [selectedTuning, updateDiff]);

	const getStatus = (diff: number | null) => {
		if (diff === null) return "-";
		if (diff === 0) return "good!";
		return `${diff.toFixed(4)}Hz`;
	};

	const handleCreateCustomTunerButtonClick = () => {
		createCustomTuner({
			tuner: {
				name,
				tunings: currentTunings.map(({ position, note }) => ({
					position,
					note,
				})),
			},
		});
	};

	return (
		<div className="container mx-auto flex flex-col space-y-3 items-center p-4">
			<div className="w-full overflow-x-auto">
				<div className="stats border border-base-300 shadow">
					{currentTunings.map((tuning) => {
						const fontColor = tuning.selected ? "text-primary" : "";
						return (
							<button
								type="button"
								key={tuning.position}
								className="stat place-items-center cursor-pointer min-w-40"
								onClick={() => selectTuning({ position: tuning.position })}
							>
								<span className={`stat-title ${fontColor}`}>
									{tuning.position}
								</span>
								<span className={`stat-value ${fontColor}`}>{tuning.note}</span>
								<span className={`stat-desc ${fontColor}`}>
									{getStatus(tuning.diff)}
								</span>
							</button>
						);
					})}
				</div>
			</div>
			<div className="rounded-box border border-base-300 bg-base-100 shadow-md p-4 w-full flex flex-col space-y-3 overflow-x-auto">
				<h2 className="mb-2 font-bold">チューニング設定</h2>
				<div className="flex flex-col space-y-4 xl:flex-row xl:space-x-4 xl:space-y-0">
					<fieldset className="fieldset xl:flex-[2]">
						<legend className="fieldset-legend">ラベル</legend>
						<input
							type="text"
							placeholder="曲名など、何のチューニングか分かるように"
							className="input w-full"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</fieldset>
					<fieldset className="fieldset xl:flex-1">
						<legend className="fieldset-legend">楽器</legend>
						<select className="select w-full">
							<option>6弦ギター</option>
						</select>
					</fieldset>
					<fieldset className="fieldset xl:flex-1">
						<legend className="fieldset-legend">
							選択した弦の音程を変更
							{selectedTuning ? `（${selectedTuning?.position}を選択中）` : ""}
						</legend>
						<select
							className="select w-full"
							value={selectedTuning?.note}
							onChange={(e) => updateNote({ note: e.target.value })}
							disabled={!selectedTuning}
						>
							{Object.keys(FREQUENCIES).map((note) => (
								<option key={note} value={note}>
									{note}
								</option>
							))}
						</select>
					</fieldset>
					<fieldset className="fieldset xl:flex-1">
						<legend className="fieldset-legend">音程を一括変更</legend>
						{/* ここのselectのvalueは未指定にする */}
						<select
							className="select w-full"
							onChange={(e) =>
								initTuner(
									DEFAULT_TUNERS.find((tuner) => tuner.id === e.target.value)
										?.tunings || [],
								)
							}
						>
							{DEFAULT_TUNERS.map((tuner) => (
								<option key={tuner.id} value={tuner.id}>
									{tuner.name}
								</option>
							))}
						</select>
					</fieldset>
				</div>
				<div className="flex justify-end">
					<button
						type="button"
						className="btn btn-primary"
						onClick={handleCreateCustomTunerButtonClick}
						disabled={name.trim() === ""}
					>
						設定を保存
					</button>
				</div>
			</div>
		</div>
	);
}
