import { createTuner } from "@chordbook/tuner";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { DEFAULT_TUNERS } from "#/domains/entities/tuner";
import { FREQUENCIES, useTuning } from "#/hooks/use-tuning";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const { currentTunings, initTuner, selectTuning, updateNote, updateDiff } =
		useTuning(DEFAULT_TUNERS[0].tunings);
	const selectedTuning = currentTunings.find((tuning) => tuning.selected);

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
		return `${diff}Hz`;
	};

	return (
		<div className="container mx-auto flex flex-col items-center p-4">
			<div className="stats shadow">
				{currentTunings.map((tuning) => {
					const fontColor = tuning.selected ? "text-primary" : "";
					return (
						<button
							type="button"
							key={tuning.position}
							className="stat place-items-center cursor-pointer min-w-50"
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
			<div className="flex space-x-2">
				<fieldset className="fieldset">
					<legend className="fieldset-legend">選択中の音程を変更</legend>
					<select
						className="select min-w-50"
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
				<fieldset className="fieldset">
					<legend className="fieldset-legend">一括変更</legend>
					{/* ここのselectのvalueは未指定にする */}
					<select
						className="select min-w-50"
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
		</div>
	);
}
