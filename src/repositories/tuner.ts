import { type DbClient, dbClient } from "#/infrastructures/db";
import type { TunerRepository } from "./interfaces/tuner";

export function createTunerRepository(db: DbClient): TunerRepository {
	return {
		async createTuner({ tuner }): Promise<void> {
			await db.execute({
				query: `INSERT INTO tuner (id, name, owner_id, tunings) VALUES (?, ?, ?, ?)`,
				values: [
					tuner.id,
					tuner.name,
					tuner.ownerId,
					JSON.stringify(tuner.tunings),
				],
			});
		},
		async updateTuner({ tuner }): Promise<void> {
			await db.execute({
				query: `UPDATE tuner SET name = ?, tunings = ? WHERE id = ? AND owner_id = ?`,
				values: [
					tuner.name,
					JSON.stringify(tuner.tunings),
					tuner.id,
					tuner.ownerId,
				],
			});
		},
		async deleteTuner({ id, ownerId }): Promise<void> {
			await db.execute({
				query: `DELETE FROM tuner WHERE id = ? AND owner_id = ?`,
				values: [id, ownerId],
			});
		},
	};
}

export const tunerRepository = createTunerRepository(dbClient);
