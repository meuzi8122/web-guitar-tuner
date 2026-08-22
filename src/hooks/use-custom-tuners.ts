import { like, useLiveQuery } from "@tanstack/react-db";
import { tunerCollection } from "#/collections/tuner";
import type { Tuner } from "#/domains/entities/tuner";

export function useCustomTuners(params?: { keyword: string }) {
	const { data } = useLiveQuery((q) =>
		params?.keyword
			? q
					.from({ tuner: tunerCollection })
					.where((row) => like(row.tuner.name, `%${params.keyword}%`))
			: q.from({ tuner: tunerCollection }),
	);

	const createCustomTuner = (params: { tuner: Omit<Tuner, "id"> }) => {
		tunerCollection.insert({
			id: crypto.randomUUID(),
			name: params.tuner.name,
			tunings: params.tuner.tunings,
		});
	};

	const deleteCustomTuner = (params: { id: string }) => {
		tunerCollection.delete(params.id);
	};

	return { customTuners: data, createCustomTuner, deleteCustomTuner };
}
