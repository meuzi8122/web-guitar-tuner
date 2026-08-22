import { eq, like, useLiveQuery } from "@tanstack/react-db";
import type { Tuner } from "#/domains/entities/tuner";
import { tunerCollection } from "../collection";

export function useCustomTuners(params?: { id?: string; keyword?: string }) {
	const { data } = useLiveQuery((q) => {
		if (params?.id) {
			return q
				.from({ tuner: tunerCollection })
				.where((row) => eq(row.tuner.id, params.id));
		}
		if (params?.keyword) {
			return q
				.from({ tuner: tunerCollection })
				.where((row) => like(row.tuner.name, `%${params.keyword}%`));
		}
		return q.from({ tuner: tunerCollection });
	});

	const createCustomTuner = (params: { tuner: Tuner }) => {
		tunerCollection.insert(params.tuner);
	};

	const updateCustomTuner = (params: { tuner: Tuner }) => {
		tunerCollection.update(params.tuner.id, (tuner) => {
			tuner.name = params.tuner.name;
			tuner.tunings = params.tuner.tunings;
		});
	};

	const deleteCustomTuner = (params: { id: string }) => {
		tunerCollection.delete(params.id);
	};

	return {
		customTuners: data,
		createCustomTuner,
		updateCustomTuner,
		deleteCustomTuner,
	};
}
