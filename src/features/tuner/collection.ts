import { createCollection, localStorageCollectionOptions } from "@tanstack/db";
import z from "zod";

const tunerSchema = z.object({
	id: z.string(),
	ownerId: z.string(),
	name: z.string().min(1),
	tunings: z.array(
		z.object({
			position: z.string().min(1),
			note: z.string().min(1),
		}),
	),
});

export const tunerCollection = createCollection(
	localStorageCollectionOptions({
		storageKey: "tuners",
		schema: tunerSchema,
		getKey: (tuner) => tuner.id,
	}),
);
