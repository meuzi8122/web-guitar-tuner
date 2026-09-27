import { type DbClient, dbClient } from "#/infrastructures/db";
import type { TunerRepository } from "./interfaces/tuner";

export function createTunerRepository(db: DbClient): TunerRepository {
	return {
		async create({ tuner }): Promise<void> {
			await db.execute({
				query: `INSERT INTO tuner (id, name, owner_id, instrument, tunings) VALUES (?, ?, ?, ?, ?)`,
				values: [
					tuner.id,
					tuner.name,
					tuner.ownerId,
					tuner.instrument ?? null,
					JSON.stringify(tuner.tunings),
				],
			});
		},
		async createMany({ tuners }): Promise<void> {
			if (tuners.length === 0) {
				return;
			}
			const placeholders = tuners.map(() => `(?, ?, ?, ?, ?)`).join(", ");
			await db.execute({
				query: `INSERT INTO tuner (id, name, owner_id, instrument, tunings) VALUES ${placeholders}`,
				values: tuners.flatMap((tuner) => [
					tuner.id,
					tuner.name,
					tuner.ownerId,
					tuner.instrument ?? null,
					JSON.stringify(tuner.tunings),
				]),
			});
		},
		async update({ tuner }): Promise<void> {
			await db.execute({
				query: `UPDATE tuner SET name = ?, instrument = ?, tunings = ? WHERE id = ? AND owner_id = ?`,
				values: [
					tuner.name,
					tuner.instrument ?? null,
					JSON.stringify(tuner.tunings),
					tuner.id,
					tuner.ownerId,
				],
			});
		},
		async delete({ id, ownerId }): Promise<void> {
			await db.execute({
				query: `DELETE FROM tuner WHERE id = ? AND owner_id = ?`,
				values: [id, ownerId],
			});
		},
	};
}

export const tunerRepository = createTunerRepository(dbClient);
