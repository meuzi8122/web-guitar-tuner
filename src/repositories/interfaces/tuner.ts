import type { Tuner } from "#/domains/entities/tuner";

export interface TunerRepository {
	create(params: { tuner: Tuner }): Promise<void>;
	createMany(params: { tuners: Tuner[] }): Promise<void>;
	update(params: { tuner: Tuner }): Promise<void>;
	delete(params: { id: string; ownerId: string }): Promise<void>;
}
