import type { Tuner } from "#/domains/entities/tuner";

export interface TunerRepository {
	createTuner(params: { tuner: Tuner }): Promise<void>;
	updateTuner(params: { tuner: Tuner }): Promise<void>;
	deleteTuner(params: { id: string; ownerId: string }): Promise<void>;
}
