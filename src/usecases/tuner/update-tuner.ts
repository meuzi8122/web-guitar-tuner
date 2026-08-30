import type { Tuner } from "#/domains/entities/tuner";
import type { TunerRepository } from "#/repositories/interfaces/tuner";

export async function updateTuner(
	params: { tuner: Tuner },
	deps: { tunerRepository: TunerRepository },
) {
	const { tuner } = params;
	const { tunerRepository } = deps;

	await tunerRepository.updateTuner({ tuner });
}
