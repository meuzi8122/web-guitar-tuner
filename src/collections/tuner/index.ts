import { createCollection } from "@tanstack/db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { QueryClient } from "@tanstack/react-query";
import type { Tuner } from "#/domains/entities/tuner";
import { createTunerFn } from "./create-tuner";
import { deleteTunerFn } from "./delete-tuner";
import { findTunersFn } from "./find-tuners";
import { updateTunerFn } from "./update-tuner";

const queryClient = new QueryClient();

export const tunerCollection = createCollection(
	queryCollectionOptions<Tuner>({
		id: "tuners",
		queryClient,
		queryKey: ["tuners"],
		getKey: (tuner) => tuner.id,
		queryFn: async () => {
			return await findTunersFn();
		},
		onInsert: async ({ transaction }) => {
			await createTunerFn({ data: transaction.mutations[0].modified });
		},
		onUpdate: async ({ transaction }) => {
			await updateTunerFn({ data: transaction.mutations[0].modified });
		},
		onDelete: async ({ transaction }) => {
			const tuner = transaction.mutations[0].original;
			await deleteTunerFn({ data: { id: tuner.id } });
		},
	}),
);
